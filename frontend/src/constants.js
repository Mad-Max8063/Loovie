export const IntentMode = {
  SOCIAL: 'Social',
  FRIENDSHIP: 'Amistad',
  DEEP_TALK: 'Charla Cinéfila'
};

export const GENRES = [
  'Acción', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficción', 
  'Romance', 'Documental', 'Suspenso', 'Animación', 'Cine Independiente'
];

export const MOCK_USERS = [
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

export const CURRENT_USER = {
  id: 'u1',
  displayName: 'Alex',
  photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=600&auto=format&fit=crop',
  age: 27,
  bio: 'Nerd de la fotografía. Me encanta analizar planos y luces. ¿Vemos algo de cine nacional?',
  favoriteGenres: ['Ciencia Ficción', 'Cine Independiente'],
  availability: ['Fines de semana'],
  intentMode: IntentMode.DEEP_TALK
};

export const translations = {
  'es-AR': {
    nav_explore: 'Cartelera',
    nav_matches: 'Citas',
    nav_profile: 'Mi Perfil',
    explore_no_users_title: 'Se acabó el carrete',
    explore_no_users_desc: 'Por ahora no hay más cinéfilos en tu zona. ¡Probá cambiando los filtros o volvé más tarde!',
    explore_refresh: 'Actualizar Cartelera',
    explore_distance: 'Cerca de Caballito, a 2 km',
    explore_available: 'Disponible',
    explore_action: '¡ACCIÓN!',
    explore_cut: '¡CORTE!',
    matches_search: 'Buscar citas...',
    matches_new: 'Nuevas Conexiones',
    matches_messages: 'Conversaciones',
    matches_empty_new: 'Nada nuevo en cartelera',
    chat_online: 'En Línea',
    chat_matched_on: 'Hicieron match el',
    chat_placeholder: 'Escribí un mensaje...',
    chat_icebreaker_btn: 'MAGIA CINEFILA (AI)',
    chat_icebreaker_loading: 'PENSANDO...',
    profile_level: 'Cinéfilo Nivel Gold',
    profile_reputation: 'Reputación',
    profile_waiting: 'En Espera',
    profile_genres: 'Géneros Favoritos',
    profile_edit: 'EDITAR',
    profile_upcoming: 'Próximas funciones sugeridas',
    profile_loading_recs: 'Proyectando...',
    profile_wishlist: 'Guardar en Mi Wishlist',
    profile_language: 'Idioma',
    profile_settings: 'Ajustes de Cuenta',
    profile_change: 'CAMBIAR',
    profile_share: 'COMPARTIR APP (DEMO)',
    security_verified: 'Identidad Verificada',
    security_verify_btn: 'Validar Identidad',
    landing_title: 'CINE',
    landing_subtitle: 'MATCH',
    landing_tagline: 'Nunca vuelvas a ver una película en soledad.',
    landing_btn: 'ENTRAR A LA FUNCIÓN',
  },
  'en-US': {
    nav_explore: 'Billboard',
    nav_matches: 'Matches',
    nav_profile: 'My Profile',
    explore_no_users_title: 'End of the Reel',
    explore_no_users_desc: 'No more cinephiles in your area for now. Try changing filters or check back later!',
    explore_refresh: 'Refresh Billboard',
    explore_distance: 'Near Broadway, 2 miles away',
    explore_available: 'Available',
    explore_action: 'ACTION!',
    explore_cut: 'CUT!',
    matches_search: 'Search matches...',
    matches_new: 'New Connections',
    matches_messages: 'Conversations',
    matches_empty_new: 'Nothing new on billboard',
    chat_online: 'Online',
    chat_matched_on: 'Matched on',
    chat_placeholder: 'Write a message...',
    chat_icebreaker_btn: 'CINEMA MAGIC (AI)',
    chat_icebreaker_loading: 'THINKING...',
    profile_level: 'Gold Level Cinephile',
    profile_reputation: 'Reputation',
    profile_waiting: 'Waiting List',
    profile_genres: 'Favorite Genres',
    profile_edit: 'EDIT',
    profile_upcoming: 'Suggested upcoming shows',
    profile_loading_recs: 'Projecting...',
    profile_wishlist: 'Save to Wishlist',
    profile_language: 'Language',
    profile_settings: 'Account Settings',
    profile_change: 'CHANGE',
    profile_share: 'SHARE APP (DEMO)',
    security_verified: 'Identity Verified',
    security_verify_btn: 'Verify Identity',
    landing_title: 'CINE',
    landing_subtitle: 'MATCH',
    landing_tagline: 'Never watch a movie alone again.',
    landing_btn: 'START THE SHOW',
  }
};
