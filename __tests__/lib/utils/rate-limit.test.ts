/**
 * Tests para funciones de rate limiting
 * 
 * Estos tests son más complejos porque involucran:
 * - Cookies del navegador
 * - localStorage
 * - Fechas y tiempo
 */

import {
  getCookie,
  setCookie,
  getLastSubmitTime,
  setLastSubmitTime,
  canSubmitForm,
  RATE_LIMIT_MINUTES,
  STORAGE_KEY,
  COOKIE_NAME,
} from '@/lib/utils/rate-limit'

describe('Rate Limiting Functions', () => {
  // beforeEach se ejecuta ANTES de cada test
  // Limpiamos cookies y localStorage para empezar limpio
  beforeEach(() => {
    // Limpiar todas las cookies
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim()
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    })
    
    // Limpiar localStorage
    localStorage.clear()
    
    // Limpiar todos los mocks de Jest
    jest.clearAllMocks()
  })

  describe('getCookie', () => {
    it('debe retornar null si no existe la cookie', () => {
      const result = getCookie('cookie_inexistente')
      expect(result).toBeNull()
    })

    it('debe retornar el valor de una cookie existente', () => {
      // Crear una cookie manualmente
      document.cookie = 'test_cookie=valor123;path=/'
      
      const result = getCookie('test_cookie')
      expect(result).toBe('valor123')
    })

    it('debe retornar la cookie correcta cuando hay múltiples cookies', () => {
      document.cookie = 'cookie1=valor1;path=/'
      document.cookie = 'cookie2=valor2;path=/'
      document.cookie = 'cookie3=valor3;path=/'
      
      expect(getCookie('cookie2')).toBe('valor2')
    })
  })

  describe('setCookie', () => {
    it('debe crear una cookie con el nombre y valor correctos', () => {
      setCookie('mi_cookie', 'mi_valor', 5)
      
      const result = getCookie('mi_cookie')
      expect(result).toBe('mi_valor')
    })

    it('debe crear cookie con fecha de expiración futura', () => {
      const minutes = 10
      setCookie('temporal', 'valor', minutes)
      
      // La cookie debe existir inmediatamente
      expect(getCookie('temporal')).toBe('valor')
    })
  })

  describe('getLastSubmitTime', () => {
    it('debe retornar null si no hay timestamp guardado', () => {
      const result = getLastSubmitTime()
      expect(result).toBeNull()
    })

    it('debe retornar timestamp de la cookie si existe', () => {
      const timestamp = Date.now()
      document.cookie = `${COOKIE_NAME}=${timestamp};path=/`
      
      const result = getLastSubmitTime()
      expect(result).toBe(timestamp)
    })

    it('debe retornar timestamp de localStorage si no hay cookie', () => {
      const timestamp = Date.now()
      localStorage.setItem(STORAGE_KEY, timestamp.toString())
      
      const result = getLastSubmitTime()
      expect(result).toBe(timestamp)
    })

    it('debe priorizar cookie sobre localStorage', () => {
      const cookieTime = Date.now()
      const storageTime = Date.now() - 10000
      
      document.cookie = `${COOKIE_NAME}=${cookieTime};path=/`
      localStorage.setItem(STORAGE_KEY, storageTime.toString())
      
      const result = getLastSubmitTime()
      expect(result).toBe(cookieTime)
    })
  })

  describe('setLastSubmitTime', () => {
    it('debe guardar timestamp en cookie', () => {
      const timestamp = Date.now()
      setLastSubmitTime(timestamp)
      
      const cookieValue = getCookie(COOKIE_NAME)
      expect(cookieValue).toBe(timestamp.toString())
    })

    it('debe guardar timestamp en localStorage', () => {
      const timestamp = Date.now()
      setLastSubmitTime(timestamp)
      
      const storageValue = localStorage.getItem(STORAGE_KEY)
      expect(storageValue).toBe(timestamp.toString())
    })

    it('debe guardar en ambos lugares (cookie y localStorage)', () => {
      const timestamp = Date.now()
      setLastSubmitTime(timestamp)
      
      expect(getCookie(COOKIE_NAME)).toBe(timestamp.toString())
      expect(localStorage.getItem(STORAGE_KEY)).toBe(timestamp.toString())
    })
  })

  describe('canSubmitForm', () => {
    it('debe permitir envío si no hay timestamp previo', () => {
      const result = canSubmitForm()
      
      expect(result.allowed).toBe(true)
      expect(result.remainingMinutes).toBeUndefined()
    })

    it('debe permitir envío si pasaron más de 5 minutos', () => {
      // Simular que enviamos hace 6 minutos
      const sixMinutesAgo = Date.now() - (6 * 60 * 1000)
      setLastSubmitTime(sixMinutesAgo)
      
      const result = canSubmitForm()
      
      expect(result.allowed).toBe(true)
      expect(result.remainingMinutes).toBeUndefined()
    })

    it('debe rechazar envío si pasaron menos de 5 minutos', () => {
      // Simular que enviamos hace 2 minutos
      const twoMinutesAgo = Date.now() - (2 * 60 * 1000)
      setLastSubmitTime(twoMinutesAgo)
      
      const result = canSubmitForm()
      
      expect(result.allowed).toBe(false)
      expect(result.remainingMinutes).toBeDefined()
      expect(result.remainingMinutes).toBeGreaterThan(0)
      expect(result.remainingMinutes).toBeLessThanOrEqual(RATE_LIMIT_MINUTES)
    })

    it('debe calcular correctamente los minutos restantes', () => {
      // Simular que enviamos hace 1 minuto
      const oneMinuteAgo = Date.now() - (1 * 60 * 1000)
      setLastSubmitTime(oneMinuteAgo)
      
      const result = canSubmitForm()
      
      expect(result.allowed).toBe(false)
      // Deberían quedar aproximadamente 4 minutos (5 - 1)
      expect(result.remainingMinutes).toBe(4)
    })

    it('debe rechazar envío si acaba de enviar (hace 10 segundos)', () => {
      // Simular que enviamos hace 10 segundos
      const tenSecondsAgo = Date.now() - (10 * 1000)
      setLastSubmitTime(tenSecondsAgo)
      
      const result = canSubmitForm()
      
      expect(result.allowed).toBe(false)
      expect(result.remainingMinutes).toBe(5) // Quedan 5 minutos completos
    })

    it('debe permitir envío exactamente después de 5 minutos', () => {
      // Simular que enviamos hace exactamente 5 minutos
      const fiveMinutesAgo = Date.now() - (5 * 60 * 1000)
      setLastSubmitTime(fiveMinutesAgo)
      
      const result = canSubmitForm()
      
      expect(result.allowed).toBe(true)
    })
  })
})
