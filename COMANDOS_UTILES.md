# 🛠️ Comandos Útiles - LumenArts Landing Page

## 🚀 Comandos Básicos

### Instalación
```bash
# Instalar todas las dependencias
npm install

# Instalar una dependencia específica
npm install <package-name>

# Instalar dependencia de desarrollo
npm install -D <package-name>
```

### Desarrollo
```bash
# Iniciar servidor de desarrollo (puerto 5173)
npm run dev

# Iniciar en puerto específico
npm run dev -- --port 3000

# Iniciar y abrir en navegador automáticamente
npm run dev -- --open
```

### Build
```bash
# Compilar para producción
npm run build

# Vista previa de build de producción
npm run preview

# Limpiar y rebuild
rm -rf dist && npm run build
```

### Linting y Formato
```bash
# Ejecutar ESLint
npm run lint

# Ejecutar TypeScript check
npx tsc --noEmit

# Formatear código con Prettier (si está instalado)
npx prettier --write "src/**/*.{ts,tsx,css}"
```

## 🔍 Debugging

### Verificar Errores
```bash
# Ver errores de TypeScript
npx tsc --noEmit

# Ver warnings de build
npm run build 2>&1 | grep -i warning

# Analizar bundle size
npm run build && npx vite-bundle-visualizer
```

### Performance
```bash
# Analizar performance del build
npm run build -- --mode production --sourcemap

# Ver tamaño de archivos
du -sh dist/*

# Lighthouse CI (si está instalado)
npx lighthouse http://localhost:5173 --view
```

## 🎨 Personalización Rápida

### Cambiar Colores
```bash
# Editar variables CSS
code src/index.css
# Buscar: :root y modificar valores HSL
```

### Modificar Textos
```bash
# Abrir landing page
code src/pages/LandingPage.tsx
# Buscar y reemplazar textos
```

### Agregar Imágenes
```bash
# Copiar imágenes a public
cp /path/to/image.jpg public/assets/

# Referenciar en código
# <img src="/assets/image.jpg" alt="..." />
```

## 📦 Gestión de Dependencias

### Ver Dependencias
```bash
# Listar todas las dependencias
npm list

# Ver dependencias desactualizadas
npm outdated

# Ver árbol de dependencias
npm list --depth=0
```

### Actualizar
```bash
# Actualizar todas las dependencias
npm update

# Actualizar dependencia específica
npm update <package-name>

# Actualizar a última versión (breaking changes)
npm install <package-name>@latest
```

### Limpiar
```bash
# Limpiar caché de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json && npm install
```

## 🌐 Despliegue

### Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Netlify
```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy a producción
netlify deploy --prod
```

### GitHub Pages
```bash
# Instalar gh-pages
npm install -D gh-pages

# Agregar script a package.json
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

## 🔧 Troubleshooting

### Puerto en Uso
```bash
# Windows: Matar proceso en puerto 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac: Matar proceso en puerto 5173
lsof -ti:5173 | xargs kill -9
```

### Errores de Módulos
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Limpiar caché de Vite
rm -rf node_modules/.vite
```

### Errores de TypeScript
```bash
# Regenerar tipos
npx tsc --noEmit

# Verificar configuración
cat tsconfig.json
```

## 📊 Análisis

### Bundle Size
```bash
# Analizar tamaño del bundle
npm run build
ls -lh dist/assets/

# Visualizar bundle
npx vite-bundle-visualizer
```

### Performance
```bash
# Lighthouse
npx lighthouse http://localhost:5173 --view

# Web Vitals
npm install -D web-vitals
```

## 🎬 Comandos para Presentación

### Preparación
```bash
# 1. Actualizar dependencias
npm update

# 2. Limpiar y rebuild
rm -rf dist node_modules/.vite
npm run build

# 3. Iniciar servidor
npm run dev

# 4. Abrir en navegador
# Navegar a http://localhost:5173
```

### Durante la Feria
```bash
# Reiniciar servidor si hay problemas
# Ctrl+C para detener
npm run dev

# Ver logs en tiempo real
npm run dev | tee dev.log
```

### Post-Feria
```bash
# Backup de configuración
cp -r src src_backup_$(date +%Y%m%d)

# Commit cambios
git add .
git commit -m "Post-feria updates"
git push
```

## 🔐 Seguridad

### Auditoría
```bash
# Auditar vulnerabilidades
npm audit

# Arreglar vulnerabilidades automáticamente
npm audit fix

# Arreglar incluyendo breaking changes
npm audit fix --force
```

### Variables de Entorno
```bash
# Crear archivo .env.local
echo "VITE_API_URL=https://api.example.com" > .env.local

# Nunca commitear .env.local
echo ".env.local" >> .gitignore
```

## 📝 Git

### Commits
```bash
# Commit rápido
git add .
git commit -m "Update landing page"
git push

# Commit con descripción
git commit -m "feat: Add new animation" -m "Added particle background effect"
```

### Branches
```bash
# Crear branch para experimentos
git checkout -b feature/new-animation

# Volver a main
git checkout main

# Merge branch
git merge feature/new-animation
```

### Revertir Cambios
```bash
# Descartar cambios no commiteados
git checkout -- .

# Revertir último commit
git revert HEAD

# Reset a commit específico
git reset --hard <commit-hash>
```

## 🎯 Shortcuts del Editor

### VS Code
```bash
# Abrir proyecto
code .

# Abrir archivo específico
code src/pages/LandingPage.tsx

# Buscar en archivos
# Ctrl+Shift+F (Windows/Linux)
# Cmd+Shift+F (Mac)

# Formatear documento
# Shift+Alt+F (Windows/Linux)
# Shift+Option+F (Mac)
```

## 📱 Testing Responsive

### Chrome DevTools
```bash
# Abrir DevTools
# F12 o Ctrl+Shift+I

# Toggle device toolbar
# Ctrl+Shift+M

# Responsive mode
# Click en "Responsive" en la barra superior
```

### Diferentes Dispositivos
```bash
# iPhone 12 Pro
# 390 x 844

# iPad Pro
# 1024 x 1366

# Desktop HD
# 1920 x 1080

# Desktop 4K
# 3840 x 2160
```

## 🚀 Optimización

### Imágenes
```bash
# Optimizar imágenes con sharp (si está instalado)
npx sharp-cli -i input.jpg -o output.jpg -q 80

# Convertir a WebP
npx sharp-cli -i input.jpg -o output.webp
```

### CSS
```bash
# Purgar CSS no usado (si usas PurgeCSS)
npx purgecss --css dist/assets/*.css --content dist/**/*.html --output dist/assets/
```

## 📚 Documentación

### Generar Docs
```bash
# TypeDoc (si está instalado)
npx typedoc --out docs src

# JSDoc
npx jsdoc -c jsdoc.json
```

---

## 🎬 Comando Todo-en-Uno para Presentación

```bash
# Ejecutar antes de la feria
npm install && npm run build && npm run dev
```

## ⚡ Atajos Rápidos

```bash
# Alias útiles (agregar a .bashrc o .zshrc)
alias dev="npm run dev"
alias build="npm run build"
alias preview="npm run preview"
alias clean="rm -rf node_modules dist .vite && npm install"
```

---

**¡Guarda este archivo para referencia rápida! 🚀**
