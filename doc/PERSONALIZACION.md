# 🎨 Plantilla de Datos Personales - Para Personalización

Este archivo contiene una plantilla de todos los lugares donde necesitas actualizar tu información personal.

---

## 📝 Variables a Reemplazar

### Información Básica
```
TU_NOMBRE_COMPLETO: Ej. "Juan Pérez"
TU_DOMINIO: Ej. "https://juanperez.dev"
TU_EMAIL: Ej. "contacto@juanperez.dev"
TU_TWITTER: Ej. "@juanperez_dev"
TU_GITHUB: Ej. "juanperez"
TU_LINKEDIN: Ej. "juanperez"
TU_TITULO: Ej. "Desarrollador Full Stack"
TU_EMPRESA: Ej. "Freelance" o "Nombre Empresa"
```

---

## 📂 Archivos a Actualizar

### 1. `app/layout.tsx`

**Línea ~12 - metadataBase**
```typescript
// ANTES
metadataBase: new URL('https://tu-dominio.com'),

// DESPUÉS
metadataBase: new URL('TU_DOMINIO'),
```

**Línea ~29 - authors**
```typescript
// ANTES
authors: [{ name: "Tu Nombre", url: "https://tu-dominio.com" }],
creator: "Tu Nombre",
publisher: "Tu Nombre",

// DESPUÉS
authors: [{ name: "TU_NOMBRE_COMPLETO", url: "TU_DOMINIO" }],
creator: "TU_NOMBRE_COMPLETO",
publisher: "TU_NOMBRE_COMPLETO",
```

**Línea ~57 - twitter**
```typescript
// ANTES
creator: "@tu_usuario",

// DESPUÉS
creator: "TU_TWITTER",
```

---

### 2. `lib/utils/json-ld.ts`

**getPersonJsonLd - Todo el objeto**
```typescript
export function getPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'TU_NOMBRE_COMPLETO',
    url: 'TU_DOMINIO',
    image: 'TU_DOMINIO/profile.jpg', // Opcional
    sameAs: [
      'https://github.com/TU_GITHUB',
      'https://linkedin.com/in/TU_LINKEDIN',
      'https://twitter.com/TU_TWITTER',
    ],
    jobTitle: 'TU_TITULO',
    worksFor: {
      '@type': 'Organization',
      name: 'TU_EMPRESA',
    },
    description: 'Desarrollador web especializado en Next.js, React y TypeScript',
  }
}
```

**getWebsiteJsonLd**
```typescript
export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mi Portafolio', // o 'TU_NOMBRE_COMPLETO - Portafolio'
    url: 'TU_DOMINIO',
    description: 'Portafolio profesional de desarrollo web',
    author: {
      '@type': 'Person',
      name: 'TU_NOMBRE_COMPLETO',
    },
    inLanguage: 'es-ES',
  }
}
```

---

### 3. `app/sitemap.ts`

**Línea ~3**
```typescript
// ANTES
const baseUrl = 'https://tu-dominio.com'

// DESPUÉS
const baseUrl = 'TU_DOMINIO'
```

---

### 4. `app/robots.ts`

**Línea ~3**
```typescript
// ANTES
const baseUrl = 'https://tu-dominio.com'

// DESPUÉS
const baseUrl = 'TU_DOMINIO'
```

---

## 🎯 Ejemplo Completo

Si tu nombre es **Carlos Rodríguez** y tu dominio es **carlosdev.com**:

### app/layout.tsx
```typescript
metadataBase: new URL('https://carlosdev.com'),
title: {
  default: "Carlos Rodríguez | Desarrollador Full Stack",
  template: "%s | Carlos Rodríguez"
},
authors: [{ name: "Carlos Rodríguez", url: "https://carlosdev.com" }],
creator: "Carlos Rodríguez",
publisher: "Carlos Rodríguez",
twitter: {
  creator: "@carlosdev",
  // ...
},
```

### lib/utils/json-ld.ts
```typescript
{
  name: 'Carlos Rodríguez',
  url: 'https://carlosdev.com',
  sameAs: [
    'https://github.com/carlosrodriguez',
    'https://linkedin.com/in/carlos-rodriguez-dev',
    'https://twitter.com/carlosdev',
  ],
  jobTitle: 'Desarrollador Full Stack',
  // ...
}
```

---

## 🔍 Búsqueda y Reemplazo

Puedes usar VS Code para buscar y reemplazar:

1. **Buscar**: `Ctrl + Shift + F` (Windows) o `Cmd + Shift + F` (Mac)
2. **Reemplazar globalmente**:

| Buscar | Reemplazar |
|--------|------------|
| `tu-dominio.com` | `TU_DOMINIO_REAL.com` |
| `Tu Nombre` | `TU_NOMBRE_REAL` |
| `@tu_usuario` | `@TU_TWITTER_REAL` |

---

## ✅ Checklist de Verificación

Después de reemplazar, verifica:

- [ ] `app/layout.tsx` - Todas las menciones de nombre y dominio
- [ ] `lib/utils/json-ld.ts` - Datos personales y URLs sociales
- [ ] `app/sitemap.ts` - baseUrl
- [ ] `app/robots.ts` - baseUrl
- [ ] Build sin errores: `npm run build`
- [ ] Preview: `npm run start` y verifica metadata en DevTools

---

## 🌐 URLs de Redes Sociales

Formato correcto:

```typescript
sameAs: [
  'https://github.com/tu-usuario',              // GitHub
  'https://linkedin.com/in/tu-usuario',         // LinkedIn
  'https://twitter.com/tu-usuario',             // Twitter/X
  'https://instagram.com/tu-usuario',           // Instagram (opcional)
  'https://youtube.com/@tu-canal',              // YouTube (opcional)
]
```

---

## 📧 Configuración de Email (Opcional)

Si usas el formulario de contacto, actualiza `.env.local`:

```env
# Email Configuration
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password
EMAIL_TO=tu-email@gmail.com
EMAIL_FROM=no-reply@tu-dominio.com
```

**Nota**: Para Gmail, necesitas crear una "App Password":
1. Ve a Google Account > Security
2. Busca "App passwords"
3. Genera una para "Mail"

---

## 🎨 Personalización de Colores (Opcional)

En `app/globals.css`, ajusta los colores del tema:

```css
@layer base {
  :root {
    --primary: 262 83% 58%;  /* Púrpura - personaliza el color */
    /* ... otros colores ... */
  }
}
```

Usa https://uicolors.app/create para generar tu paleta.

---

**✨ Una vez completado este checklist, tu portfolio estará 100% personalizado!**
