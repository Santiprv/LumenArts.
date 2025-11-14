# Instrucciones de Desarrollo - Landing Page LumenArts

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── AnimatedCounter.tsx      # Contador animado para estadísticas
│   ├── CustomCursor.tsx         # Cursor personalizado
│   ├── ParticlesBackground.tsx  # Fondo de partículas animadas
│   ├── ScrollProgress.tsx       # Barra de progreso de scroll
│   ├── ScrollToTop.tsx          # Botón para volver arriba
│   └── TypingEffect.tsx         # Efecto de escritura
├── hooks/
│   └── useScrollReveal.ts       # Hook para animaciones on scroll
├── pages/
│   └── LandingPage.tsx          # Página principal
├── App.tsx                      # Configuración de rutas
└── index.css                    # Estilos globales y animaciones
```

## 🎨 Personalización

### Colores

Los colores se definen en `src/index.css` usando variables CSS:

```css
--background: 0 0% 8%;      /* Negro suave */
--primary: 0 84% 60%;       /* Rojo principal */
--card: 0 0% 12%;           /* Gris muy oscuro */
```

### Animaciones

Las animaciones están definidas en `src/index.css`:

- `animate-fade-in`: Entrada suave
- `animate-float-cinema`: Flotación cinematográfica
- `animate-gradient-shift`: Gradiente en movimiento
- `hover-lift`: Elevación al hover
- Y muchas más...

### Componentes Reutilizables

#### AnimatedCounter
```tsx
<AnimatedCounter end={10000} suffix="+" duration={2000} />
```

#### ParticlesBackground
```tsx
<ParticlesBackground />
```

#### ScrollProgress
```tsx
<ScrollProgress />
```

## 🎯 Optimización para Presentaciones

### Recomendaciones:

1. **Pantalla Grande**: La landing está optimizada para pantallas de 1920x1080 o superiores
2. **Navegador**: Chrome o Edge para mejor rendimiento
3. **Hardware**: GPU dedicada recomendada para animaciones fluidas
4. **Internet**: Conexión estable para cargar imágenes

### Modo Presentación:

Para presentaciones en vivo, considera:

- Desactivar notificaciones del sistema
- Usar modo pantalla completa (F11)
- Cerrar otras aplicaciones
- Tener una conexión de respaldo

## 🔧 Modificaciones Comunes

### Cambiar Estadísticas

En `src/pages/LandingPage.tsx`, busca el array `stats`:

```tsx
const stats = [
  { value: 10000, suffix: "+", label: "Usuarios Activos", icon: <Users /> },
  // Modifica los valores aquí
];
```

### Agregar Nueva Sección

1. Crea el componente en `src/components/`
2. Importa en `LandingPage.tsx`
3. Agrega entre las secciones existentes
4. Usa las clases de animación disponibles

### Modificar Textos

Todos los textos están en `src/pages/LandingPage.tsx`. Busca y reemplaza según necesites.

## 🐛 Solución de Problemas

### Las animaciones no se ven fluidas
- Verifica que no haya otros procesos pesados corriendo
- Reduce el número de partículas en `ParticlesBackground.tsx`
- Desactiva el cursor personalizado si es necesario

### El cursor personalizado no funciona
- Verifica que la clase `cursor-none` esté en el div principal
- Comprueba que CustomCursor esté importado correctamente

### Las imágenes no cargan
- Verifica la conexión a internet
- Reemplaza las URLs de Unsplash con imágenes locales si es necesario

## 📊 Performance

### Métricas Objetivo:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

### Optimizaciones Implementadas:
- Lazy loading de componentes
- Animaciones con `transform` y `opacity`
- `will-change` en elementos animados
- Intersection Observer para animaciones on scroll
- Canvas optimizado para partículas

## 🎬 Tips para la Presentación

1. **Scroll Lento**: Haz scroll lentamente para que se aprecien las animaciones
2. **Hover Effects**: Pasa el mouse sobre los elementos para mostrar interacciones
3. **Secciones Clave**: Enfócate en Hero, Stats, Features y CTA final
4. **Storytelling**: Cuenta la historia mientras navegas
5. **Demo en Vivo**: Muestra la responsividad cambiando el tamaño de ventana

## 📝 Checklist Pre-Presentación

- [ ] Servidor de desarrollo corriendo sin errores
- [ ] Todas las imágenes cargando correctamente
- [ ] Animaciones funcionando suavemente
- [ ] Cursor personalizado activo
- [ ] Scroll progress visible
- [ ] Botón scroll-to-top funcionando
- [ ] Responsive funcionando en diferentes tamaños
- [ ] Sin errores en consola del navegador

## 🚀 Despliegue

Para desplegar la landing page:

```bash
# Compilar
npm run build

# Los archivos estarán en /dist
# Sube el contenido de /dist a tu hosting
```

Hosting recomendados:
- Vercel (recomendado)
- Netlify
- GitHub Pages
- Cloudflare Pages

## 📞 Soporte

Si encuentras problemas, verifica:
1. Versión de Node.js (>= 18)
2. Dependencias instaladas correctamente
3. Puerto 5173 disponible
4. Consola del navegador para errores

---

**¡Buena suerte con tu presentación! 🎬✨**
