
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
    bio: 'Fanática de A24 y los thrillers psicológicos. Busco alguien para debatir teorías después de la función con un café.',
    favoriteGenres: ['Suspenso', 'Cine Independiente', 'Drama'],
    availability: ['Fines de semana', 'Viernes noche'],
    intentMode: IntentMode.DEEP_TALK
  },
  {
    id: 'u3',
    displayName: 'Marcos',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=600&auto=format&fit=crop',
    age: 31,
    bio: 'Fan de Marvel y la ciencia ficción. Nunca me pierdo un estreno en IMAX. ¿Sale pochoclar un rato?',
    favoriteGenres: ['Acción', 'Ciencia Ficción'],
    availability: ['Días de semana'],
    intentMode: IntentMode.SOCIAL
  },
  {
    id: 'u4',
    displayName: 'Sofía',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&h=600&auto=format&fit=crop',
    age: 24,
    bio: 'Amo los clásicos y las comedias románticas. Busco compañero para llorar y reír en el cine.',
    favoriteGenres: ['Romance', 'Comedia'],
    availability: ['Cualquier momento'],
    intentMode: IntentMode.FRIENDSHIP
  },
  {
    id: 'u5',
    displayName: 'Damián',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=600&auto=format&fit=crop',
    age: 29,
    bio: 'Fan de las maratones de terror. Mientras más gritos, mejor. ¿Te animás a ver la de hoy?',
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
  bio: 'Nerd de la fotografía. Me encanta analizar planos y luces. ¿Vemos algo de cine nacional?',
  favoriteGenres: ['Ciencia Ficción', 'Cine Independiente'],
  availability: ['Fines de semana'],
  intentMode: IntentMode.DEEP_TALK
};
