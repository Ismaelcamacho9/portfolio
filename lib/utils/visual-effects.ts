// Utilidades de CSS para efectos visuales modernos

// Glassmorphism - efecto de vidrio
export const glassEffect = `
  backdrop-blur-md bg-white/10 dark:bg-black/10
  border border-white/20 dark:border-white/10
  shadow-xl
`

// Glassmorphism fuerte
export const glassEffectStrong = `
  backdrop-blur-lg bg-white/20 dark:bg-black/20
  border border-white/30 dark:border-white/20
  shadow-2xl
`

// Gradiente animado de fondo
export const animatedGradient = `
  bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
  bg-[length:200%_200%]
  animate-gradient
`

// Efecto neón
export const neonEffect = `
  shadow-[0_0_10px_rgba(139,92,246,0.5),0_0_20px_rgba(139,92,246,0.3)]
`

// Borde con gradiente
export const gradientBorder = `
  relative
  before:absolute before:inset-0 before:-z-10
  before:rounded-lg before:p-[2px]
  before:bg-gradient-to-r before:from-purple-500 before:to-pink-500
  bg-background
`

// Texto con gradiente
export const gradientText = `
  bg-gradient-to-r from-purple-400 to-pink-600
  bg-clip-text text-transparent
`

// Sombra de color
export const coloredShadow = (color: string) => `
  shadow-lg shadow-${color}-500/50
`

// Efecto de brillo en movimiento (para botones)
export const shineEffect = `
  relative overflow-hidden
  before:absolute before:inset-0
  before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
  before:translate-x-[-200%]
  hover:before:translate-x-[200%]
  before:transition-transform before:duration-700
`

// Patrón de puntos de fondo
export const dotPattern = `
  bg-[radial-gradient(circle,rgba(139,92,246,0.1)_1px,transparent_1px)]
  bg-[size:24px_24px]
`

// Patrón de grid
export const gridPattern = `
  bg-[linear-gradient(to_right,rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.1)_1px,transparent_1px)]
  bg-[size:24px_24px]
`

// Efecto de desenfoque en los bordes
export const edgeBlur = `
  mask-image-[linear-gradient(to_bottom,black_80%,transparent_100%)]
`
