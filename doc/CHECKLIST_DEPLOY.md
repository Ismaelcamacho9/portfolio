# ✅ Checklist Rápido - Antes del Deploy

## 🎨 Imágenes Requeridas

Crea estas imágenes antes de hacer deploy:

### 1. Open Graph Image
- **Archivo**: `public/og-image.png`
- **Tamaño**: 1200x630px
- **Contenido**: Tu nombre, título, branding
- **Herramientas**: Canva, Figma, Photoshop
- **Ejemplo**: Fondo con gradiente + tu nombre + "Full Stack Developer"

### 2. Favicons e Iconos
- **`public/favicon.ico`** - 32x32px o 16x16px
- **`public/icon-192.png`** - 192x192px (PWA)
- **`public/icon-512.png`** - 512x512px (PWA)
- **`public/apple-icon.png`** - 180x180px (iOS)

**Generador recomendado**: https://realfavicongenerator.net/

---

## 📝 Personalización Necesaria

### 1. Actualiza tu Dominio

En estos archivos, reemplaza `https://tu-dominio.com`:

- [ ] `app/layout.tsx` (línea ~12)
- [ ] `lib/utils/json-ld.ts` (líneas ~6, ~18, ~26)
- [ ] `app/sitemap.ts` (línea ~3)
- [ ] `app/robots.ts` (línea ~3)

### 2. Actualiza tu Información Personal

En `app/layout.tsx`:
- [ ] Reemplaza "Tu Nombre" con tu nombre real
- [ ] Actualiza `@tu_usuario` con tu Twitter/X

En `lib/utils/json-ld.ts`:
- [ ] Nombre completo
- [ ] URLs de redes sociales (GitHub, LinkedIn, Twitter)
- [ ] Título del trabajo ("Desarrollador Full Stack", etc.)

---

## 🚀 Comandos para Verificar

```bash
# 1. Build de producción
npm run build

# 2. Preview local
npm run start
# Abre http://localhost:3000

# 3. Lighthouse audit (después de tener imágenes)
# Opción A: DevTools
# - Abre Chrome DevTools (F12)
# - Tab "Lighthouse"
# - Run audit

# Opción B: CLI (instalar primero: npm i -g lighthouse)
lighthouse http://localhost:3000 --view

# 4. Verificar errores
npm run lint
```

---

## 🌐 Deploy a Vercel (Recomendado)

### Setup
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel
# Sigue las instrucciones

# 4. Deploy a producción
vercel --prod
```

### Configuración Post-Deploy

1. **Custom Domain** (Vercel Dashboard)
   - Settings > Domains
   - Añade tu dominio

2. **Variables de Entorno**
   - Settings > Environment Variables
   - Añade las variables de `.env.local` si las tienes

3. **Analytics** (Opcional - Gratis)
   ```bash
   npm install @vercel/analytics
   ```
   Añadir en `app/layout.tsx`:
   ```typescript
   import { Analytics } from '@vercel/analytics/react'
   // En el return: <Analytics />
   ```

---

## 📊 Post-Deploy Checklist

### Google Search Console
1. Ve a https://search.google.com/search-console
2. Añade tu dominio
3. Verifica propiedad
4. Envía sitemap: `https://tu-dominio.com/sitemap.xml`
5. Copia código de verificación → `app/layout.tsx` (metadata.verification.google)

### Bing Webmaster Tools
1. Ve a https://www.bing.com/webmasters
2. Similar a Google Search Console

### Testing Final
- [ ] Todas las páginas cargan correctamente
- [ ] Formulario de contacto funciona
- [ ] Links de redes sociales correctos
- [ ] Responsive en móvil/tablet/desktop
- [ ] Lighthouse score > 90 en todas las categorías
- [ ] Meta tags visible al compartir en redes sociales

---

## 🎯 Métricas Objetivo

| Categoría | Objetivo | Actual |
|-----------|----------|--------|
| Performance | > 90 | ⏳ |
| Accessibility | > 95 | ⏳ |
| Best Practices | > 95 | ⏳ |
| SEO | 100 | ⏳ |

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## 🐛 Troubleshooting

### Build Falla
```bash
# Limpiar cache
rm -rf .next
npm run build
```

### Errores de TypeScript
```bash
# Verificar tipos
npx tsc --noEmit
```

### Imágenes no se ven
- Verifica que estén en la carpeta `public/`
- Los paths deben empezar con `/` (ej: `/og-image.png`)

### Formulario no envía emails
- Revisa las variables de entorno en Vercel
- Verifica configuración de Nodemailer en `.env.local`

---

## 📚 Recursos Útiles

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Lighthouse**: https://developer.chrome.com/docs/lighthouse
- **Web Vitals**: https://web.dev/vitals/
- **Schema.org**: https://schema.org/
- **Open Graph**: https://ogp.me/

---

**✨ ¡Tu portfolio está casi listo para producción!**

Completa el checklist y estarás online en minutos 🚀
