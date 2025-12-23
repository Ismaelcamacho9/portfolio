# Guía de Accesibilidad del Portfolio

## Características Implementadas

### 1. Navegación por Teclado

#### Skip Link
- **Ubicación**: Primer elemento del documento (layout.tsx)
- **Función**: Permite a usuarios de teclado y lectores de pantalla saltar directamente al contenido principal
- **Activación**: Presiona `Tab` al cargar la página
- **Clase CSS**: `.sr-only` (solo visible para lectores de pantalla, visible al recibir foco)

#### Focus Visible
- Todos los elementos interactivos tienen indicadores de foco claros
- Outline con color del tema y offset para mejor visibilidad
- Estados de foco personalizados en botones y enlaces

### 2. ARIA (Accessible Rich Internet Applications)

#### Roles ARIA
- `role="main"` en el contenido principal
- `role="navigation"` en el header
- `role="contentinfo"` en el footer
- `role="status"` para anuncios dinámicos

#### ARIA Labels
- Botones sin texto visible tienen `aria-label`
- Formularios tienen labels asociados correctamente
- Modales tienen `aria-labelledby` y `aria-describedby`

### 3. Estructura Semántica

#### Jerarquía de Encabezados
```
H1 - Título principal (Hero Section)
  H2 - Títulos de sección (About, Projects, etc.)
    H3 - Subtítulos dentro de secciones
      H4 - Títulos de tarjetas de proyectos
```

#### Landmarks HTML5
- `<header>` - Navegación principal
- `<main>` - Contenido principal
- `<section>` - Secciones del portfolio
- `<footer>` - Información de contacto y derechos

### 4. Gestión de Foco

#### useFocusTrap Hook
```tsx
import { useFocusTrap } from '@/lib/utils/accessibility'

const modalRef = useRef<HTMLDivElement>(null)
useFocusTrap(modalRef, isOpen)
```

**Funcionalidad**:
- Mantiene el foco dentro del modal cuando está abierto
- Cicla entre elementos focusables (primer → último → primer)
- Respeta Shift+Tab para navegación inversa

### 5. Anuncios para Lectores de Pantalla

#### useAnnouncement Hook
```tsx
import { useAnnouncement } from '@/lib/utils/accessibility'

const { announce } = useAnnouncement()

// Uso
announce('Formulario enviado correctamente', 'polite')
announce('Error al enviar', 'assertive')
```

**Prioridades**:
- `polite`: No interrumpe al usuario (éxitos, info)
- `assertive`: Interrumpe para anuncios urgentes (errores)

### 6. Contraste de Color

#### Ratios de Contraste
- Texto normal: Mínimo 4.5:1
- Texto grande (18pt+): Mínimo 3:1
- Elementos UI: Mínimo 3:1

#### Modo Oscuro
- Paleta de colores ajustada para mantener contraste
- Variables CSS separadas para light/dark themes
- Transición suave entre modos

### 7. Formularios Accesibles

#### Contact Form
```tsx
<label htmlFor="email" className="...">
  Email
</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={errors.email ? "true" : "false"}
  aria-describedby="email-error"
/>
{errors.email && (
  <span id="email-error" role="alert">
    {errors.email.message}
  </span>
)}
```

**Características**:
- Labels explícitos con `htmlFor`
- Atributos ARIA para validación
- Mensajes de error con `role="alert"`
- Descripción de campos con `aria-describedby`

### 8. Animaciones Respetando Preferencias

#### Reduce Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Añadir esto a `globals.css` para respetar la preferencia del sistema operativo.

### 9. Imágenes Alternativas

#### Textos Alternativos
```tsx
<Image
  src="/project-image.jpg"
  alt="Captura de pantalla mostrando la interfaz de usuario del proyecto E-commerce"
  width={600}
  height={400}
/>
```

**Buenas Prácticas**:
- Describir el contenido, no "imagen de..."
- Para imágenes decorativas: `alt=""`
- Evitar redundancia con texto circundante

### 10. Testing de Accesibilidad

#### Herramientas Recomendadas

1. **Lighthouse** (Chrome DevTools)
   - Auditoría automática
   - Puntuación de 0-100
   - Recomendaciones específicas

2. **axe DevTools**
   - Extensión de navegador
   - Detección de problemas WCAG
   - Guías de solución

3. **WAVE**
   - Evaluación visual
   - Identifica errores y advertencias
   - Muestra estructura de página

4. **Teclado**
   - Navega con `Tab` / `Shift+Tab`
   - Activa con `Enter` / `Space`
   - Verifica visibilidad del foco

5. **Lectores de Pantalla**
   - NVDA (Windows - gratis)
   - JAWS (Windows - pago)
   - VoiceOver (macOS/iOS - integrado)
   - TalkBack (Android - integrado)

## Checklist de Accesibilidad

### Navegación
- [ ] Skip link funcional
- [ ] Navegación por teclado completa
- [ ] Focus visible en todos los elementos interactivos
- [ ] Orden lógico de tabulación

### Contenido
- [ ] Jerarquía de encabezados correcta
- [ ] Textos alternativos en imágenes
- [ ] Contraste de color adecuado (4.5:1 mínimo)
- [ ] Tamaño de fuente legible (16px mínimo)

### Interactividad
- [ ] Formularios con labels asociados
- [ ] Mensajes de error descriptivos
- [ ] Foco atrapado en modales
- [ ] Estados hover, focus y active visibles

### ARIA
- [ ] Roles semánticos apropiados
- [ ] Labels en elementos sin texto
- [ ] Estados dinámicos anunciados
- [ ] Propiedades aria-* correctas

### Compatibilidad
- [ ] Funciona sin JavaScript
- [ ] Funciona con ampliación de texto (200%)
- [ ] Respeta prefers-reduced-motion
- [ ] Compatible con lectores de pantalla

## Recursos Adicionales

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [WebAIM](https://webaim.org/)
- [Inclusive Components](https://inclusive-components.design/)

## Nivel de Conformidad Objetivo

**WCAG 2.1 Level AA** - Nivel estándar recomendado que cubre:
- Contraste de color adecuado
- Tamaño de objetivo táctil (44x44px mínimo)
- Navegación consistente
- Identificación de errores
- Labels e instrucciones
- Operabilidad por teclado
