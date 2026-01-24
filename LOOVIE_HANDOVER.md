# Loovie: Manual del Estreno 🎬

¡Felicitaciones! Has completado y lanzado tu primera aplicación premium para cinéfilos. Este documento sirve como brújula para que puedas gestionar y escalar **Loovie** en el futuro.

## 🌟 El Producto: Loovie
Loovie no es solo una app de citas; es una plataforma de **intención cinematográfica**. El objetivo es que la gente deje de chatear y empiece a ir al cine.

### Características Core:
- **Billboard Match**: Algoritmo que agrupa usuarios por películas específicas que quieren ver de la cartelera real.
- ### 3. Safety & Trust Protocols
- **Identity Verification**: AI-powered biometric scan (Gemini).
- **Mandatory 1+2 Photo Rule**: Profiles require at least 3 photos (min. 1 real face + 2 of choice) for activation. 
- **Trust Buffer**: New matches made via "Billboard" have a mandatory 48-hour trust-building period. Movie details and meeting coordination are restricted during this timeframe to ensure safe interactions.
- **Standby Mode**: Users can toggle off visibility at any time.

## Support & Feedbackrios y validación de sponsors.
- **Geolocalización**: Cálculo de distancia real (Haversine) para asegurar encuentros locales.
- **Layout Centering**: Sistema de centrado robusto para visualización en escritorio, asegurando una experiencia premium "app-first" en cualquier dispositivo.

---

## 🎟️ Acceso Maestro (Super-User)
He implementado un código secreto para que vos y tus contactos de la industria puedan probar **Loovie** sin límites:

- **Código Maestro**: `LOOVIE_VIP_2026`
- **Efecto**: Desbloquea **Premium Permanente** y **Swipes Infinitos**.
- **Regla de Oro**: El sistema advierte que **el beneficio se anula si se rompen las reglas**. Es un aviso de "buena conducta" obligatorio.
- **Cómo usar**: Ingresalo en la sección de "Código Promocional" (en el Paywall o perfil).

---

## 🛠️ Stack Tecnológico
- **Frontend**: React + Vite + TailwindCSS + Lucide Icons.
- **Estilo**: Diseño "Dark Cinema" con efectos de grano de película y micro-animaciones.
- **Backend/Auth**: Firebase (Authentication + Firestore).
- **IA**: Google Gemini API (para Icebreakers y recomendaciones colaborativas).

## 🚀 Guía de Lanzamiento (Vercel)
Tu app está configurada para **Vercel**. Cada vez que hagas un cambio y lo subas a GitHub, la web se actualizará sola.
1. Conecta tu repo `Mad-Max8063/Loovie` en Vercel.
2. Copia tus variables del `.env` a la configuración de Vercel.
3. El comando de build es `npm run build` y la carpeta de salida es `dist`.

## 🗺️ Mapa de Archivos Clave
- `context/AppContext.tsx`: El corazón de la app. Gestiona el estado de usuario, matches y watchlist.
- `constants.ts`: Contiene la **Cartelera Real** y los usuarios de prueba.
- `translations.ts`: Todo el texto en Castellano (AR) e Inglés (US).
- `views/ExploreView.tsx`: La pantalla principal de "Cartelera" para swipear.
- `views/MatchesView.tsx`: El centro de mensajes y planes de cita.

## 🔮 Hoja de Ruta Sugerida
1. **Automatizar Cartelera**: Conectar una API como TMDB para que las películas se actualicen solas cada semana.
2. **Pagos Reales**: Cambiar el link simbólico de Mercado Pago por el SDK oficial para cobrar membresías.
3. **Notificaciones**: Implementar avisos cuando alguien quiere ver la misma película que vos.
4. **Moderación de VIPs**: El sistema ya avisa de las reglas, el siguiente paso es un panel de admin para revocar el código si alguien se porta mal.

---

**Loovie** está listo para su gran gira mundial. ¡Que disfrutes la función! 🍿✨🍿
