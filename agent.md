# GitHub Copilot - Instrucciones del Proyecto

## 📋 Contexto del Proyecto

Este es un **portafolio web moderno** para un desarrollador web, construido con tecnologías de vanguardia.

### Stack Tecnológico
- **Framework**: Next.js 14+ con App Router
- **Lenguaje**: TypeScript (estricto)
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Validación**: Zod + React Hook Form
- **Tipografía**: Geist o Inter (Google Fonts)

---

## 🎯 Objetivos del Proyecto

1. **Diseño Moderno**: Interfaz visualmente impactante con gradientes, glassmorphism y micro-animaciones
2. **Performance**: Lighthouse score > 90 en todas las métricas
3. **Responsive**: Mobile-first, perfecto en todos los dispositivos
4. **Accesibilidad**: WCAG 2.1 AA compliant
5. **SEO**: Optimizado para motores de búsqueda
6. **UX**: Navegación fluida con animaciones suaves

---

## 🏗️ Arquitectura y Estructura

### Estructura de Carpetas
```
portfolio/
├── app/                      # App Router de Next.js
│   ├── (sections)/          # Rutas agrupadas
│   ├── layout.tsx           # Layout raíz
│   ├── page.tsx             # Página principal
│   └── globals.css          # Estilos globales
├── components/
│   ├── ui/                  # Componentes shadcn/ui
│   ├── sections/            # Secciones del portfolio
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── projects.tsx
│   │   ├── experience.tsx
│   │   └── contact.tsx
│   ├── layout/              # Componentes de layout
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── navigation.tsx
│   └── shared/              # Componentes compartidos
├── lib/
│   ├── utils.ts             # Utilidades (cn, etc.)
│   ├── data/                # Datos del portfolio
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── experience.ts
│   └── constants.ts         # Constantes globales
├── public/
│   ├── images/              # Imágenes optimizadas
│   └── projects/            # Screenshots de proyectos
└── styles/                  # Estilos adicionales
```

---

## 💻 Guías de Código

### TypeScript
- **Tipado estricto**: `strict: true` en tsconfig
- **Interfaces sobre types** para objetos y componentes
- **Evitar `any`**: Usa `unknown` o tipos específicos
- **Props de componentes**: Siempre tipar con interfaces
```typescript
interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
}

export function Hero({ title, subtitle, ctaText = "Ver más" }: HeroProps) {
  // ...
}
```

### React y Next.js
- **Server Components por defecto**: Usa `'use client'` solo cuando sea necesario
- **Async Server Components**: Para fetch de datos
- **Nomenclatura**: PascalCase para componentes, camelCase para funciones/variables
- **Exports nombrados**: Preferir sobre default exports
- **Hooks**: Agrupar al inicio del componente
```typescript
'use client';

import { useState, useEffect } from 'react';

export function InteractiveComponent() {
  const [state, setState] = useState(false);
  
  useEffect(() => {
    // efecto
  }, []);
  
  return <div>...</div>;
}
```

### Tailwind CSS
- **Clases utilitarias**: Preferir sobre CSS personalizado
- **Responsive**: Mobile-first (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- **Dark mode**: Usar clase `dark:` para variantes
- **Función cn()**: Usar siempre para clases condicionales
```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>
```

### shadcn/ui
- **Instalación individual**: `npx shadcn-ui@latest add [component]`
- **Personalización**: Modificar en `components/ui/` según diseño
- **Variants**: Usar el sistema de variantes de class-variance-authority
- **Composición**: Componer componentes complejos con primitivos

### Animaciones con Framer Motion
- **Animaciones sutiles**: Preferir micro-interacciones sobre animaciones pesadas
- **Performance**: Animar solo `transform` y `opacity`
- **Variantes**: Definir variantes para animaciones complejas
- **Scroll animations**: Usar `useInView` para animaciones al hacer scroll
```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

---

## 🎨 Guías de Diseño

### Sistema de Colores
- **Tema oscuro por defecto**: Backgrounds `#0a0a0a`, `#1a1a1a`
- **Acentos vibrantes**: Gradientes cyan-purple, orange-pink
- **Contraste**: Mínimo 4.5:1 para texto
- **Variables CSS**: Definir en `globals.css` usando HSL

### Tipografía
- **Headings**: Font weight 700-900, line-height ajustado
- **Body**: Font weight 400-500, line-height 1.6-1.8
- **Jerarquía clara**: Usar escala de tamaños consistente
```css
h1: text-5xl md:text-7xl font-bold
h2: text-4xl md:text-5xl font-bold
h3: text-2xl md:text-3xl font-semibold
p: text-base md:text-lg
```

### Espaciado
- **Consistencia**: Usar múltiplos de 4 (4, 8, 12, 16, 24, 32, 48, 64)
- **Secciones**: Padding vertical de `py-16 md:py-24 lg:py-32`
- **Contenedores**: Max-width de `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Efectos Visuales
- **Glassmorphism**: `backdrop-blur-lg bg-white/10`
- **Gradientes**: Usar en backgrounds, borders, texto
- **Sombras**: Sutiles, usar `shadow-xl` con cuidado
- **Bordes**: Radius generoso `rounded-2xl`, `rounded-3xl`

---

## 🔧 Mejores Prácticas Específicas

### Componentes
1. **Un componente, una responsabilidad**
2. **Componentes pequeños y reutilizables**
3. **Props claras y bien documentadas**
4. **Memoización cuando sea necesario**: `memo`, `useMemo`, `useCallback`
5. **Error boundaries** para componentes críticos

### Datos del Portfolio
- **Centralizar datos**: Todo en `lib/data/`
- **Tipos estrictos**: Definir interfaces para proyectos, skills, etc.
- **Fácil actualización**: Estructura clara para añadir proyectos
```typescript
// lib/data/projects.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  featured: boolean;
}

export const projects: Project[] = [
  // ...
];
```

### Performance
- **Next.js Image**: Usar siempre para imágenes
- **Lazy loading**: Componentes pesados con `dynamic()`
- **Code splitting**: Separar por rutas
- **Fonts**: Optimizar con `next/font`
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

### SEO y Metadata
- **Metadata por página**: Usar `generateMetadata` o export `metadata`
- **Alt text**: Siempre en imágenes
- **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tu Nombre | Desarrollador Web',
  description: 'Portfolio profesional de desarrollo web',
  openGraph: {
    title: 'Tu Nombre | Desarrollador Web',
    description: 'Portfolio profesional',
    images: ['/og-image.jpg'],
  },
};
```

### Accesibilidad
- **Navegación por teclado**: Todos los elementos interactivos
- **ARIA labels**: Cuando el contexto visual no es suficiente
- **Focus visible**: Estados de focus claros
- **Contraste**: Verificar con herramientas
- **Skip links**: Para navegación rápida

---

## 🚫 Anti-patrones a Evitar

1. ❌ **CSS en línea**: Usar Tailwind o CSS modules
2. ❌ **Cualquier en TypeScript**: Tipar correctamente
3. ❌ **Componentes gigantes**: Dividir en componentes más pequeños
4. ❌ **Lógica en JSX**: Extraer a funciones/hooks
5. ❌ **Imágenes sin optimizar**: Usar Next.js Image
6. ❌ **Animaciones excesivas**: Ser sutil y profesional
7. ❌ **Magic numbers**: Usar constantes nombradas
8. ❌ **Props drilling**: Usar Context o composición
9. ❌ **Fetch en useEffect**: Usar Server Components o SWR/React Query
10. ❌ **Ignorar errores**: Manejar todos los casos edge

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
```
sm: 640px   // Móviles grandes
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Desktops
2xl: 1536px // Pantallas grandes
```

### Enfoque Mobile-First
```typescript
// ✅ Correcto
<div className="text-base md:text-lg lg:text-xl">

// ❌ Incorrecto
<div className="text-xl lg:text-base">
```

---

## 🧪 Testing (si se implementa)

- **Componentes**: Jest + React Testing Library
- **E2E**: Playwright o Cypress
- **Accesibilidad**: axe-core
- **Performance**: Lighthouse CI

---

## 📦 Convenciones de Commits

Usar conventional commits:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `style:` Cambios de estilo/diseño
- `refactor:` Refactorización de código
- `perf:` Mejoras de performance
- `docs:` Documentación
- `chore:` Tareas de mantenimiento

Ejemplo: `feat: add hero section with animations`

---

## 🎯 Prioridades por Fase

Consultar `TAREAS_DESARROLLO.md` para el roadmap completo.

**MVP (Fases 1-5)**:
1. Setup y configuración
2. Componentes base
3. Hero section
4. About section
5. Projects section

**Mejoras (Fases 6-10)**:
- Experiencia/Timeline
- Contacto
- Animaciones avanzadas
- Responsive perfecto

**Optimización (Fases 11-12)**:
- Performance
- SEO
- Deploy

---

## 💡 Sugerencias para Copilot

Cuando generes código para este proyecto:

1. **Siempre usa TypeScript** con tipado estricto
2. **Componentes funcionales** con hooks
3. **Tailwind CSS** para todos los estilos
4. **Importaciones absolutas** usando `@/`
5. **Comentarios claros** en lógica compleja
6. **Responsive por defecto** (mobile-first)
7. **Dark mode considerado** en todos los componentes
8. **Accesibilidad incluida** (ARIA, semantic HTML)
9. **Performance optimizada** (Image, lazy loading)
10. **Consistencia** con el código existente

---

## 🔗 Referencias Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Aceternity UI](https://ui.aceternity.com/) - Inspiración de componentes

---

**Última actualización**: 23 de diciembre de 2025

Este documento debe evolucionar con el proyecto. Mantenerlo actualizado con decisiones de arquitectura y patrones adoptados.
