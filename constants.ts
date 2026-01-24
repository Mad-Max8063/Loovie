
import { UserProfile, IntentMode, Movie } from './types';

export const BILLBOARD: Movie[] = [
  {
    id: 'm1',
    title: 'Hamnet',
    description: 'La historia detrás de la creación de Hamlet, centrada en la vida de Agnes y el dolor por su hijo perdido. Nominada al Oscar.',
    imageUrl: 'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?q=80&w=400&h=600&auto=format&fit=crop',
    genres: ['Drama', 'Histórico'],
    releaseDate: '2026-01-23',
    isPremiere: true
  },
  {
    id: 'm2',
    title: 'Kiss of the Spider Woman',
    description: 'Adaptación del musical basado en la novela de Manuel Puig. Un encuentro emocional en una celda argentina.',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&h=600&auto=format&fit=crop',
    genres: ['Drama', 'Musical'],
    releaseDate: '2026-01-01',
    isPremiere: false
  },
  {
    id: 'm3',
    title: 'Song Sung Blue',
    description: 'Drama biográfico musical sobre un grupo de tributo a Neil Diamond que encuentra su destino.',
    imageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=400&h=600&auto=format&fit=crop',
    genres: ['Drama', 'Musical'],
    releaseDate: '2026-01-01',
    isPremiere: false
  },
  {
    id: 'm4',
    title: 'Arco',
    description: 'Animación y aventuras épicas. Una travesía visual única de origen francés.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&h=600&auto=format&fit=crop',
    genres: ['Animación', 'Aventura'],
    releaseDate: '2026-01-23',
    isPremiere: true
  },
  {
    id: 'm5',
    title: 'La Virgen de la Tosquera',
    description: 'Cine negro argentino. Basado en el universo de Mariana Enriquez. Un éxito de taquilla local.',
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=400&h=600&auto=format&fit=crop',
    genres: ['Thriller', 'Drama'],
    releaseDate: '2026-01-15',
    isPremiere: false
  }
];

export const GENRES = [
  'Acción', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficción',
  'Romance', 'Documental', 'Suspenso', 'Animación', 'Cine Independiente'
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'u2',
    displayName: 'Elena',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400&h=600&auto=format&fit=crop'
    ],
    age: 26,
    bio: 'Re copada con las de A24 y los thrillers psicológicos. Busco a alguien para discutir teorías con un cortado después de la función. ¿Te prendés?',
    favoriteGenres: ['Suspenso', 'Cine Independiente', 'Drama'],
    availability: ['Fines de semana', 'Viernes noche'],
    intentMode: IntentMode.DEEP_TALK,
    location: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
    city: 'Buenos Aires'
  },
  {
    id: 'u3',
    displayName: 'Marcos',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=600&auto=format&fit=crop'
    ],
    age: 31,
    bio: 'Fanático de Marvel y la ciencia ficción. Nunca me pierdo un estreno en IMAX. ¿Sale pochoclo y birra después? Dale que va.',
    favoriteGenres: ['Acción', 'Ciencia Ficción'],
    availability: ['Días de semana'],
    intentMode: IntentMode.SOCIAL,
    location: { lat: -34.45, lng: -58.55 }, // San Isidro
    city: 'San Isidro'
  },
  {
    id: 'u4',
    displayName: 'Sofía',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&h=600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&h=600&auto=format&fit=crop'
    ],
    age: 24,
    bio: 'Amo los clásicos de Hollywood y las comedias románticas. Busco un/a compañero/a para llorar y reírnos como boludos en el cine. ¡Vamos!',
    favoriteGenres: ['Romance', 'Comedia'],
    availability: ['Cualquier momento'],
    intentMode: IntentMode.FRIENDSHIP,
    location: { lat: -34.61, lng: -58.42 }, // Caballito
    city: 'Caballito'
  },
  {
    id: 'u5',
    displayName: 'Damián',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=600&auto=format&fit=crop'
    ],
    age: 29,
    bio: 'Adicto a las maratones de terror. Mientras más gritos, mejor. ¿Te copa ver la de hoy a la noche? Ponete el buzo que arrancamos.',
    favoriteGenres: ['Terror', 'Suspenso'],
    availability: ['Noches tarde'],
    intentMode: IntentMode.SOCIAL,
    location: { lat: -31.4201, lng: -64.1888 }, // Córdoba
    city: 'Córdoba'
  }
];

export const CURRENT_USER: UserProfile = {
  id: 'u1',
  displayName: 'Alex',
  photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=600&auto=format&fit=crop',
  photos: [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501196354995-1db52d673b2c?q=80&w=400&h=600&auto=format&fit=crop'
  ],
  age: 27,
  bio: 'Nerd de la fotografía cinematográfica. Me copa analizar planos y luces. ¿Nos tiramos una de cine nacional argentino?',
  favoriteGenres: ['Ciencia Ficción', 'Cine Independiente'],
  availability: ['Fines de semana'],
  intentMode: IntentMode.DEEP_TALK,
  location: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
  city: 'Buenos Aires'
};

