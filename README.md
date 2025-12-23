# 🚀 Portafolio Web Moderno - Next.js 14+

Portafolio profesional desarrollado con Next.js, TypeScript, Tailwind CSS y Framer Motion. Totalmente optimizado para performance, SEO y accesibilidad.

## ✨ Características

- ⚡ **Next.js 14+** con App Router y Server Components
- 🎨 **Tailwind CSS** para estilos modernos y responsive
- 🎭 **Framer Motion** para animaciones fluidas
- 🌓 **Tema Dark/Light** con persistencia
- ♿ **Accesibilidad WCAG AA** completa
- 🔍 **SEO Optimizado** con metadata, Open Graph y JSON-LD
- 📱 **PWA-Ready** con manifest configurado
- ⚡ **Performance** optimizado con lazy loading y code splitting
- 🧪 **Testing** con Jest y React Testing Library
- 📧 **Formulario de Contacto** funcional con Nodemailer

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16.1.1
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui + Radix UI
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Validación**: Zod + React Hook Form
- **Email**: Nodemailer
- **Testing**: Jest + React Testing Library

## 📋 Inicio Rápido

### Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir http://localhost:3000
```

### Build de Producción

```bash
# Build
npm run build

# Preview
npm run start
```

### Testing

```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

## 📁 Estructura del Proyecto

```
portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal con metadata
│   ├── page.tsx           # Página home
│   ├── contact/           # Página de contacto
│   ├── api/contact/       # API route para emails
│   ├── sitemap.ts         # Sitemap dinámico
│   └── robots.ts          # Robots.txt
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Secciones de la página
│   ├── shared/            # Componentes reutilizables
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── animations/        # Configuración de animaciones
│   ├── data/              # Datos de proyectos, timeline
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utilidades y helpers
│   └── validations/       # Schemas de validación
├── doc/                   # Documentación completa
└── public/                # Assets estáticos
```

## 🎨 Secciones del Portfolio

1. **Hero** - Presentación impactante con animaciones
2. **Stats** - Estadísticas clave con iconos animados
3. **About** - Biografía y valores profesionales
4. **Skills** - Tecnologías organizadas por categorías
5. **Projects** - Galería de proyectos con filtros
6. **Timeline** - Experiencia y educación
7. **Contact** - Formulario funcional con validación

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Producción
vercel --prod
```

### Otras Plataformas

- **Netlify**: Conecta tu repositorio
- **Railway**: `railway up`
- **Docker**: Build la imagen con el Dockerfile incluido

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env.local`:

```env
# Email Configuration (Opcional)
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password
EMAIL_TO=tu-email@gmail.com
EMAIL_FROM=no-reply@tu-dominio.com
```

### Personalización

Ver documentación completa en:
- 📝 [`doc/PERSONALIZACION.md`](./doc/PERSONALIZACION.md) - Guía de personalización
- ✅ [`doc/CHECKLIST_DEPLOY.md`](./doc/CHECKLIST_DEPLOY.md) - Checklist pre-deploy

**Pasos básicos**:
1. Actualiza tu información en `app/layout.tsx`
2. Modifica datos personales en `lib/utils/json-ld.ts`
3. Crea las imágenes necesarias (og-image, favicons)
4. Actualiza dominio en `sitemap.ts` y `robots.ts`

## 📊 Performance

### Métricas Objetivo

- ⚡ Performance: > 90
- ♿ Accessibility: > 95
- ✅ Best Practices: > 95
- 🔍 SEO: 100

### Optimizaciones Implementadas

- ✅ Lazy loading de componentes
- ✅ Code splitting automático
- ✅ Optimización de imágenes (AVIF/WebP)
- ✅ Font optimization con display swap
- ✅ Security headers configurados
- ✅ Cache headers para assets
- ✅ Package imports optimizados

### Lighthouse Audit

```bash
# Opción 1: Chrome DevTools
# F12 > Lighthouse > Analyze

# Opción 2: CLI
npm run lighthouse
```

## 📚 Documentación

- 📋 [`doc/TAREAS_DESARROLLO.md`](./doc/TAREAS_DESARROLLO.md) - Plan completo de desarrollo
- 🚀 [`doc/FASE_11_PERFORMANCE_SEO.md`](./doc/FASE_11_PERFORMANCE_SEO.md) - Guía de performance
- ♿ [`doc/ACCESIBILIDAD.md`](./doc/ACCESIBILIDAD.md) - Características de accesibilidad
- 📧 [`doc/CONFIGURACION_EMAIL.md`](./doc/CONFIGURACION_EMAIL.md) - Setup de email
- ✨ [`doc/FASE_9_RESUMEN.md`](./doc/FASE_9_RESUMEN.md) - Animaciones y efectos
- 📝 [`doc/PERSONALIZACION.md`](./doc/PERSONALIZACION.md) - Personalización completa

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests con coverage
npm run test:coverage

# Ver reporte de coverage
open coverage/lcov-report/index.html
```

### Tests Incluidos

- ✅ Componentes de UI
- ✅ Formulario de contacto
- ✅ Validaciones
- ✅ Rate limiting
- ✅ Utilidades y helpers

## 🤝 Contribución

Este es un proyecto de portafolio personal, pero puedes usarlo como plantilla:

1. Fork el repositorio
2. Personaliza según tus necesidades
3. Da crédito si lo usas como base

## 📄 Licencia

MIT License - Libre para uso personal y comercial

## 🎯 Próximos Pasos

Después de clonar:

1. ✅ Ejecutar `npm install`
2. ✅ Crear `.env.local` si usarás email
3. ✅ Personalizar información (ver `doc/PERSONALIZACION.md`)
4. ✅ Crear imágenes (og-image, favicons)
5. ✅ Actualizar proyectos en `lib/data/projects.ts`
6. ✅ Modificar timeline en `lib/data/timeline.ts`
7. ✅ Ejecutar `npm run build` para verificar
8. ✅ Deploy a Vercel/Netlify

## 🌟 Características Destacadas

### Accesibilidad
- ♿ Navegación por teclado completa
- 🔍 Skip links
- 📖 ARIA labels y roles
- 🎨 Contraste WCAG AA
- 🎭 Respeto a `prefers-reduced-motion`
- 🔊 Announcements para lectores de pantalla

### SEO
- 🏷️ Metadata completa
- 🌐 Open Graph tags
- 🐦 Twitter Cards
- 🗺️ Sitemap dinámico
- 🤖 Robots.txt configurado
- 📊 JSON-LD structured data
- 🔗 Canonical URLs

### Performance
- ⚡ Lazy loading inteligente
- 📦 Code splitting
- 🖼️ Image optimization
- 🔤 Font optimization
- 🗜️ Compresión habilitada
- 📱 PWA-ready

## 📞 Contacto

- 🌐 Website: [tu-dominio.com](https://tu-dominio.com)
- 📧 Email: tu-email@dominio.com
- 💼 LinkedIn: [linkedin.com/in/tu-usuario](https://linkedin.com/in/tu-usuario)
- 🐱 GitHub: [github.com/tu-usuario](https://github.com/tu-usuario)

---

**Desarrollado con ❤️ usando Next.js**

⭐ Si te ha sido útil, considera darle una estrella al repo!
