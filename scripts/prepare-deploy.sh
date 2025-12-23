#!/bin/bash

# Script de preparación para deploy - Fase 11

echo "🚀 Preparando proyecto para deploy..."

# 1. Verificar que existan las imágenes necesarias
echo ""
echo "📸 Verificando imágenes requeridas..."

missing_images=0

if [ ! -f "public/og-image.png" ]; then
  echo "❌ Falta: public/og-image.png (1200x630px)"
  missing_images=$((missing_images + 1))
fi

if [ ! -f "public/icon-192.png" ]; then
  echo "❌ Falta: public/icon-192.png (192x192px)"
  missing_images=$((missing_images + 1))
fi

if [ ! -f "public/icon-512.png" ]; then
  echo "❌ Falta: public/icon-512.png (512x512px)"
  missing_images=$((missing_images + 1))
fi

if [ ! -f "public/apple-icon.png" ]; then
  echo "❌ Falta: public/apple-icon.png (180x180px)"
  missing_images=$((missing_images + 1))
fi

if [ ! -f "public/favicon.ico" ]; then
  echo "❌ Falta: public/favicon.ico"
  missing_images=$((missing_images + 1))
fi

if [ $missing_images -eq 0 ]; then
  echo "✅ Todas las imágenes están presentes"
else
  echo ""
  echo "⚠️  Faltan $missing_images imágenes"
  echo "💡 Crea las imágenes antes de hacer deploy"
  echo "📚 Ver doc/FASE_11_PERFORMANCE_SEO.md para más detalles"
fi

# 2. Verificar personalización
echo ""
echo "🔍 Verificando personalización..."

if grep -q "tu-dominio.com" app/layout.tsx 2>/dev/null; then
  echo "⚠️  Actualiza el dominio en app/layout.tsx"
fi

if grep -q "Tu Nombre" app/layout.tsx 2>/dev/null; then
  echo "⚠️  Actualiza tu nombre en app/layout.tsx"
fi

if grep -q "tu-dominio.com" lib/utils/json-ld.ts 2>/dev/null; then
  echo "⚠️  Actualiza el dominio en lib/utils/json-ld.ts"
fi

# 3. Ejecutar build
echo ""
echo "🔨 Ejecutando build de producción..."

if npm run build; then
  echo "✅ Build exitoso!"
  
  # 4. Análisis de bundle
  echo ""
  echo "📊 Análisis de bundle:"
  echo "Ver .next/analyze/ para detalles"
  
else
  echo "❌ Error en el build"
  exit 1
fi

# 5. Instrucciones finales
echo ""
echo "✅ Preparación completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Crear las imágenes faltantes (ver doc/FASE_11_PERFORMANCE_SEO.md)"
echo "2. Personalizar dominios y nombres"
echo "3. Ejecutar: npm run start (para preview local)"
echo "4. Ejecutar Lighthouse en http://localhost:3000"
echo "5. Deploy a Vercel/Netlify"
echo "6. Configurar Google Search Console"
echo ""
