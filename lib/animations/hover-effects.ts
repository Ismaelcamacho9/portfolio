// Efectos hover personalizados para Framer Motion

export const hoverScale = {
  scale: 1.05,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  },
}

export const hoverGlow = {
  boxShadow: '0 0 20px rgba(var(--primary), 0.5)',
  transition: {
    duration: 0.3,
  },
}

export const hoverLift = {
  y: -5,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  },
}

export const hoverRotate = {
  rotate: [0, -5, 5, -5, 0],
  transition: {
    duration: 0.5,
  },
}

export const hoverPulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 0.6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

// Efecto de brillo que se mueve
export const hoverShine = {
  backgroundPosition: '200% center',
  transition: {
    duration: 0.8,
  },
}

// Combinación de escala + sombra + rotación leve
export const hoverFloat = {
  y: -10,
  scale: 1.02,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  rotate: 2,
  transition: {
    type: 'spring',
    stiffness: 200,
    damping: 15,
  },
}

// Efecto de desenfoque al hover
export const hoverBlur = {
  filter: 'blur(2px)',
  opacity: 0.8,
  transition: {
    duration: 0.3,
  },
}

// Para botones - efecto de presionado
export const tapEffect = {
  scale: 0.95,
  transition: {
    duration: 0.1,
  },
}
