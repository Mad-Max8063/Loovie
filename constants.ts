
import { UserProfile, IntentMode } from './types';

export const GENRES = [
  'Acción', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficción', 
  'Romance', 'Documental', 'Suspenso', 'Animación', 'Cine Independiente'
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'u2',
    displayName: 'Elena',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&auto=format&fit=crop',
    age: 26,
    bio: 'Re copada con las de A24 y los thrillers psicológicos. Busco a alguien para discutir teorías con un cortado después de la función. ¿Te prendés?',
    favoriteGenres: ['Suspenso', 'Cine Independiente', 'Drama'],
    availability: ['Fines de semana', 'Viernes noche'],
    intentMode: IntentMode.DEEP_TALK
  },
  {
    id: 'u3',
    displayName: 'Marcos',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=600&auto=format&fit=crop',
    age: 31,
    bio: 'Fanático de Marvel y la ciencia ficción. Nunca me pierdo un estreno en IMAX. ¿Sale pochoclo y birra después? Dale que va.',
    favoriteGenres: ['Acción', 'Ciencia Ficción'],
    availability: ['Días de semana'],
    intentMode: IntentMode.SOCIAL
  },
  {
    id: 'u4',
    displayName: 'Sofía',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&h=600&auto=format&fit=crop',
    age: 24,
    bio: 'Amo los clásicos de Hollywood y las comedias románticas. Busco un/a compañero/a para llorar y reírnos como boludos en el cine. ¡Vamos!',
    favoriteGenres: ['Romance', 'Comedia'],
    availability: ['Cualquier momento'],
    intentMode: IntentMode.FRIENDSHIP
  },
  {
    id: 'u5',
    displayName: 'Damián',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=600&auto=format&fit=crop',
    age: 29,
    bio: 'Adicto a las maratones de terror. Mientras más gritos, mejor. ¿Te copa ver la de hoy a la noche? Ponete el buzo que arrancamos.',
    favoriteGenres: ['Terror', 'Suspenso'],
    availability: ['Noches tarde'],
    intentMode: IntentMode.SOCIAL
  }
];

export const CURRENT_USER: UserProfile = {
  id: 'u1',
  displayName: 'Alex',
  photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=600&auto=format&fit=crop',
  age: 27,
  bio: 'Nerd de la fotografía cinematográfica. Me copa analizar planos y luces. ¿Nos tiramos una de cine nacional argentino?',
  favoriteGenres: ['Ciencia Ficción', 'Cine Independiente'],
  availability: ['Fines de semana'],
  intentMode: IntentMode.DEEP_TALK
};
