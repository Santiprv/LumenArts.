
### 🆕 Funcionalidades Principales:

- 🎠 **Carrusel Automático**: 4 slides con mensajes clave que cambian cada 5 segundos
- 🧭 **Header de Navegación**: Menú sticky con scroll suave a todas las secciones
- 🔗 **Navegación Completa**: Todos los links y botones funcionan correctamente
- ✨ **Animaciones Cinematográficas**: Efectos de parallax, fade-in, float y glow
- 🎨 **Diseño Minimalista**: Paleta de colores negro, gris, rojo y blanco
- 🌟 **Efectos Visuales Avanzados**:
  - Partículas interactivas en el fondo
  - Cursor personalizado animado
  - Barra de progreso de scroll
  - Contadores animados
  - Botón scroll-to-top
- 📱 **Totalmente Responsive**: Optimizado para todos los dispositivos
- 🎯 **Experiencia Inmersiva**: Diseñado para capturar la atención en ferias

### Secciones Incluidas:

1. **Hero** - Carrusel automático con 4 slides + logo animado
2. **Estadísticas** - Contadores animados (10K+ usuarios, 2K+ cortos)
3. **Características** - 4 features principales con hover effects
4. **Showcase** - Galería de cortometrajes destacados
5. **Comunidad** - Beneficios y cards flotantes animadas
6. **Eventos** - Competencias y premios
7. **Testimonios** - Reviews de usuarios reales
8. **CTA Final** - Call to action impactante
9. **Footer** - Links funcionales y redes sociales

### 📚 Documentación:

- [INICIO_RAPIDO.md](./INICIO_RAPIDO.md) - Guía de inicio rápido
- [NUEVAS_FUNCIONALIDADES.md](./NUEVAS_FUNCIONALIDADES.md) - Detalles de funcionalidades
- [LANDING_PAGE.md](./LANDING_PAGE.md) - Descripción técnica completa
- [TIPS_PRESENTACION_FERIA.md](./TIPS_PRESENTACION_FERIA.md) - Guión de presentación
- [CHECKLIST_FERIA.md](./CHECKLIST_FERIA.md) - Checklist completo

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Canvas API (para efectos de partículas)
- Intersection Observer API (para animaciones on scroll)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b3179519-10a6-466c-84b4-26ee2bf845bf) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Dark theme (cinematic) enabled by default

This project ships with a cinematic dark theme enabled by default. The `index.html` adds the `dark` class to the `<html>` element so the app opens in dark mode. If you'd like to toggle the theme in the browser you can run:

```js
// set light mode
localStorage.setItem('theme','light'); document.documentElement.classList.remove('dark');

// set dark mode
localStorage.setItem('theme','dark'); document.documentElement.classList.add('dark');

// remove preference to respect system setting
localStorage.removeItem('theme');
```

Reload the page after changing localStorage.
