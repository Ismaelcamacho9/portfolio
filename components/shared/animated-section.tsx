'use client'

import { motion, Variants } from 'framer-motion'
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation'
import * as variants from '@/lib/animations/variants'

interface AnimatedSectionProps {
  children: React.ReactNode
  animation?: keyof typeof variants
  className?: string
  delay?: number
  once?: boolean
}

export function AnimatedSection({
  children,
  animation = 'fadeInUp',
  className = '',
  delay = 0,
  once = true,
}: AnimatedSectionProps) {
  const { ref, controls } = useScrollAnimation({ once })

  // Obtener la variante de animación
  const selectedVariant = variants[animation] as Variants

  // Agregar delay personalizado si se proporciona
  const customVariant: Variants = {
    ...selectedVariant,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...(selectedVariant.visible as any)?.transition,
        delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={customVariant}
      className={className}
    >
      {children}
    </motion.div>
  )
}
