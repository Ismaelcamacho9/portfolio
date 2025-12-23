'use client'

import { useEffect } from 'react'

/**
 * Skip Link - Permite a usuarios de teclado/lectores de pantalla
 * saltar la navegación y ir directamente al contenido principal
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 
                 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground 
                 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Saltar al contenido principal
    </a>
  )
}

/**
 * Hook para gestión de foco en modales
 */
export function useFocusTrap(ref: React.RefObject<HTMLElement>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !ref.current) return

    const element = ref.current
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    // Focus en el primer elemento al abrir
    firstElement?.focus()

    element.addEventListener('keydown', handleTabKey as EventListener)
    return () => element.removeEventListener('keydown', handleTabKey as EventListener)
  }, [ref, isActive])
}

/**
 * Hook para anuncios a lectores de pantalla
 */
export function useAnnouncement() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  return { announce }
}
