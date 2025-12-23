// Configuración de rate limiting
export const RATE_LIMIT_MINUTES = 5 // Tiempo mínimo entre envíos en minutos
export const STORAGE_KEY = 'contact_form_last_submit'
export const COOKIE_NAME = 'contact_last_submit'

// Funciones de rate limiting
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export function setCookie(name: string, value: string, minutes: number) {
  if (typeof document === 'undefined') return
  const expires = new Date()
  expires.setTime(expires.getTime() + minutes * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`
}

export function getLastSubmitTime(): number | null {
  // Intentar obtener de cookie primero
  const cookieTime = getCookie(COOKIE_NAME)
  if (cookieTime) return parseInt(cookieTime, 10)
  
  // Fallback a localStorage
  if (typeof window === 'undefined') return null
  const storageTime = localStorage.getItem(STORAGE_KEY)
  return storageTime ? parseInt(storageTime, 10) : null
}

export function setLastSubmitTime(timestamp: number) {
  // Guardar en cookie
  setCookie(COOKIE_NAME, timestamp.toString(), RATE_LIMIT_MINUTES)
  
  // Guardar en localStorage como backup
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, timestamp.toString())
  }
}

export function canSubmitForm(): { allowed: boolean; remainingMinutes?: number } {
  const lastSubmit = getLastSubmitTime()
  if (!lastSubmit) return { allowed: true }
  
  const now = Date.now()
  const timeSinceLastSubmit = now - lastSubmit
  const minutesSinceLastSubmit = timeSinceLastSubmit / (1000 * 60)
  
  if (minutesSinceLastSubmit < RATE_LIMIT_MINUTES) {
    const remainingMinutes = Math.ceil(RATE_LIMIT_MINUTES - minutesSinceLastSubmit)
    return { allowed: false, remainingMinutes }
  }
  
  return { allowed: true }
}
