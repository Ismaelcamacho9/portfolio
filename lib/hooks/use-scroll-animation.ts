'use client'

import { useEffect, useRef } from 'react'
import { useInView, useAnimation } from 'framer-motion'

interface UseScrollAnimationOptions {
  threshold?: number
  once?: boolean
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, once = true } = options
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!once) {
      controls.start('hidden')
    }
  }, [isInView, controls, once])

  return { ref, controls, isInView }
}
