from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
import os
import uuid
import httpx

load_dotenv()

app = FastAPI(title="CineMatch API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import emergentintegrations for Gemini
from emergentintegrations.llm.chat import LlmChat, UserMessage

EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
TMDB_API_KEY = os.environ.get("TMDB_API_KEY", "")
TMDB_BASE = "https://api.themoviedb.org/3"

# Genre ID -> Spanish name mapping (TMDB uses numeric IDs)
TMDB_GENRE_MAP = {
    28: "Acción", 12: "Aventura", 16: "Animación", 35: "Comedia",
    80: "Crimen", 99: "Documental", 18: "Drama", 10751: "Familia",
    14: "Fantasía", 36: "Histórico", 27: "Terror", 10402: "Musical",
    9648: "Suspenso", 10749: "Romance", 878: "Ciencia Ficción",
    10770: "TV Movie", 53: "Thriller", 10752: "Bélica", 37: "Western"
}

class GenresRequest(BaseModel):
    genres: List[str]
    language: str = "es-AR"

class IcebreakerRequest(BaseModel):
    userGenres: List[str]
    matchGenres: List[str]
    language: str = "es-AR"

class MovieRecommendation(BaseModel):
    title: str
    description: str
    imageUrl: str

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "cinematch"}


class BillboardMovie(BaseModel):
    id: str
    title: str
    description: str
    imageUrl: str
    genres: List[str]
    releaseDate: str
    isPremiere: bool = False


@app.get("/api/billboard", response_model=List[BillboardMovie])
async def get_billboard():
    """Get current movies playing in Argentine theaters from TMDB"""
    if not TMDB_API_KEY:
        raise HTTPException(status_code=500, detail="TMDB API Key not configured")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{TMDB_BASE}/movie/now_playing",
                params={
                    "api_key": TMDB_API_KEY,
                    "language": "es-AR",
                    "region": "AR",
                    "page": 1
                }
            )
            response.raise_for_status()
            data = response.json()

        from datetime import datetime, timedelta
        recent_cutoff = (datetime.now() - timedelta(days=14)).strftime("%Y-%m-%d")

        movies: List[BillboardMovie] = []
        for m in data.get("results", [])[:10]:  # Top 10 movies
            genres = [TMDB_GENRE_MAP.get(gid, "Otro") for gid in m.get("genre_ids", [])]
            poster = f"https://image.tmdb.org/t/p/w500{m['poster_path']}" if m.get("poster_path") else ""
            release = m.get("release_date", "")

            movies.append(BillboardMovie(
                id=str(m["id"]),
                title=m.get("title", "Sin título"),
                description=m.get("overview", ""),
                imageUrl=poster,
                genres=genres,
                releaseDate=release,
                isPremiere=(release >= recent_cutoff)
            ))

        return movies

    except httpx.HTTPError as e:
        print(f"TMDB API error: {e}")
        raise HTTPException(status_code=502, detail="Could not fetch billboard from TMDB")

@app.post("/api/recommendations", response_model=List[MovieRecommendation])
async def get_movie_recommendations(request: GenresRequest):
    """Get AI-powered movie recommendations based on favorite genres"""
    try:
        language_name = "Español rioplatense de Argentina (voseo)" if request.language == "es-AR" else "English"
        
        chat = LlmChat(
            api_key=EMERGENT_KEY,
            session_id=f"recs-{uuid.uuid4()}",
            system_message="You are a movie expert who recommends films for cinema dates. Always respond with valid JSON array."
        ).with_model("gemini", "gemini-3-flash-preview")
        
        prompt = f"""Based on these favorite genres: {', '.join(request.genres)}, suggest 3 current or upcoming movies people would want to see together in theaters. Respond in {language_name}.

Return ONLY a JSON array with this exact format, no other text:
[
  {{"title": "Movie Title", "description": "Brief description", "imageUrl": "keyword for image"}},
  {{"title": "Movie Title 2", "description": "Brief description 2", "imageUrl": "keyword2"}},
  {{"title": "Movie Title 3", "description": "Brief description 3", "imageUrl": "keyword3"}}
]"""
        
        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        
        # Parse JSON response
        import json
        import re
        
        # Clean response - extract JSON array
        cleaned = response.strip()
        json_match = re.search(r'\[[\s\S]*\]', cleaned)
        if json_match:
            cleaned = json_match.group()
        
        movies = json.loads(cleaned)
        return [MovieRecommendation(**m) for m in movies[:3]]
        
    except Exception as e:
        print(f"Recommendation error: {e}")
        # Return fallback recommendations
        return [
            MovieRecommendation(title="Dune: Part Two", description="La épica saga de ciencia ficción continúa", imageUrl="dune"),
            MovieRecommendation(title="Oppenheimer", description="El drama histórico de Christopher Nolan", imageUrl="oppenheimer"),
            MovieRecommendation(title="Poor Things", description="Una comedia oscura y fantástica", imageUrl="fantasy")
        ]

@app.post("/api/icebreaker")
async def get_icebreaker(request: IcebreakerRequest):
    """Generate an AI-powered icebreaker message for matches"""
    try:
        context = "Use Argentine Spanish (voseo, amigable, sin ser cursi)." if request.language == "es-AR" else "Use friendly, natural conversational English."
        
        common_genres = [g for g in request.userGenres if g in request.matchGenres]
        genres_text = ', '.join(common_genres) if common_genres else 'movies'
        
        chat = LlmChat(
            api_key=EMERGENT_KEY,
            session_id=f"ice-{uuid.uuid4()}",
            system_message="You are a friendly chat assistant helping people start conversations about movies."
        ).with_model("gemini", "gemini-3-flash-preview")
        
        prompt = f"""Generate a creative cinema-themed icebreaker for two people who like {genres_text}. One likes {', '.join(request.userGenres)} and the other likes {', '.join(request.matchGenres)}. {context} Keep it short (max 2 sentences). Return ONLY the icebreaker text, nothing else."""
        
        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        
        return {"icebreaker": response.strip()}
        
    except Exception as e:
        print(f"Icebreaker error: {e}")
        fallback = "¡Hola! ¿Sale peli?" if request.language == "es-AR" else "Hey! Ready for a movie?"
        return {"icebreaker": fallback}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
