'use client'

import { motion, HTMLMotionProps, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'none'
}

const hoverVariants: Variants = {
  lift: {
    y: -5,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  },
  scale: {
    scale: 1.03,
  },
  glow: {
    boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
  },
}

const tapEffect = { scale: 0.98 }

export function AnimatedCard({
  children,
  className,
  hoverEffect = 'lift',
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      variants={hoverVariants}
      whileHover={hoverEffect !== 'none' ? hoverEffect : undefined}
      whileTap={tapEffect}
      {...props}
    >
      {children}
    </motion.div>
  )
}
