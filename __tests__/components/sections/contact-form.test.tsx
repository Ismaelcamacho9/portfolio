/**
 * Tests para el componente ContactForm
 * 
 * Aquí testeamos:
 * - Que el componente se renderice correctamente
 * - Interacciones del usuario (escribir, hacer clic)
 * - Validación de formularios
 * - Envío de datos a la API
 * - Mensajes de éxito/error
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/sections/contact-form'

// Mock de fetch global
global.fetch = jest.fn()

// Mock de las funciones de rate limiting
jest.mock('@/lib/utils/rate-limit', () => ({
  canSubmitForm: jest.fn(() => ({ allowed: true })),
  setLastSubmitTime: jest.fn(),
}))

describe('ContactForm Component', () => {
  // Limpiar mocks antes de cada test
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    // Resetear el mock de fetch
    ;(global.fetch as jest.Mock).mockClear()
  })

  describe('Renderizado inicial', () => {
    it('debe renderizar todos los campos del formulario', () => {
      render(<ContactForm />)
      
      // screen.getByLabelText busca elementos por su label
      expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/asunto/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument()
    })

    it('debe renderizar el botón de enviar', () => {
      render(<ContactForm />)
      
      // screen.getByRole busca por rol de accesibilidad
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })
      expect(submitButton).toBeInTheDocument()
    })

    it('debe tener todos los campos vacíos inicialmente', () => {
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/nombre/i) as HTMLInputElement
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      const subjectInput = screen.getByLabelText(/asunto/i) as HTMLInputElement
      const messageInput = screen.getByLabelText(/mensaje/i) as HTMLTextAreaElement
      
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(subjectInput.value).toBe('')
      expect(messageInput.value).toBe('')
    })

    it('el botón NO debe estar deshabilitado inicialmente', () => {
      render(<ContactForm />)
      
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })
      expect(submitButton).not.toBeDisabled()
    })
  })

  describe('Interacción del usuario', () => {
    it('debe permitir escribir en todos los campos', async () => {
      // userEvent simula interacciones reales de usuario
      const user = userEvent.setup()
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const subjectInput = screen.getByLabelText(/asunto/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      
      // Simular escritura
      await user.type(nameInput, 'Juan Pérez')
      await user.type(emailInput, 'juan@example.com')
      await user.type(subjectInput, 'Consulta sobre proyecto')
      await user.type(messageInput, 'Me interesa hablar sobre un proyecto web')
      
      // Verificar que los valores se guardaron
      expect(nameInput).toHaveValue('Juan Pérez')
      expect(emailInput).toHaveValue('juan@example.com')
      expect(subjectInput).toHaveValue('Consulta sobre proyecto')
      expect(messageInput).toHaveValue('Me interesa hablar sobre un proyecto web')
    })
  })

  describe('Validación de campos', () => {
    it('debe mostrar errores cuando se envía el formulario vacío', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })
      await user.click(submitButton)
      
      // waitFor espera hasta que aparezcan los mensajes de error
      await waitFor(() => {
        expect(screen.getByText(/el nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument()
        expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument()
        expect(screen.getByText(/el asunto debe tener al menos 3 caracteres/i)).toBeInTheDocument()
        expect(screen.getByText(/el mensaje debe tener al menos 10 caracteres/i)).toBeInTheDocument()
      })
    })

    it('debe mostrar error cuando el mensaje es muy corto', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      const messageInput = screen.getByLabelText(/mensaje/i)
      await user.type(messageInput, 'Corto') // Solo 5 caracteres
      
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/el mensaje debe tener al menos 10 caracteres/i)).toBeInTheDocument()
      })
    })
  })

  describe('Envío del formulario', () => {
    it('debe enviar el formulario con datos válidos', async () => {
      const user = userEvent.setup()
      
      // Mock de respuesta exitosa del API
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Mensaje enviado correctamente' }),
      })
      
      render(<ContactForm />)
      
      // Llenar el formulario
      await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez')
      await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
      await user.type(screen.getByLabelText(/asunto/i), 'Consulta')
      await user.type(screen.getByLabelText(/mensaje/i), 'Este es un mensaje de prueba válido')
      
      // Enviar
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })
      await user.click(submitButton)
      
      // Verificar que se llamó a fetch
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Juan Pérez',
            email: 'juan@example.com',
            subject: 'Consulta',
            message: 'Este es un mensaje de prueba válido',
          }),
        })
      })
    })

    it('debe mostrar mensaje de éxito cuando el envío es exitoso', async () => {
      const user = userEvent.setup()
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Mensaje enviado correctamente' }),
      })
      
      render(<ContactForm />)
      
      // Llenar formulario
      await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez')
      await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
      await user.type(screen.getByLabelText(/asunto/i), 'Consulta')
      await user.type(screen.getByLabelText(/mensaje/i), 'Mensaje de prueba válido')
      
      // Enviar
      await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))
      
      // Verificar mensaje de éxito
      await waitFor(() => {
        expect(screen.getByText(/mensaje enviado correctamente/i)).toBeInTheDocument()
      })
    })

    it('debe limpiar el formulario después de envío exitoso', async () => {
      const user = userEvent.setup()
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Mensaje enviado correctamente' }),
      })
      
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/nombre/i) as HTMLInputElement
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      
      await user.type(nameInput, 'Juan Pérez')
      await user.type(emailInput, 'juan@example.com')
      await user.type(screen.getByLabelText(/asunto/i), 'Consulta')
      await user.type(screen.getByLabelText(/mensaje/i), 'Mensaje válido')
      
      await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))
      
      // Esperar a que se limpien los campos
      await waitFor(() => {
        expect(nameInput.value).toBe('')
        expect(emailInput.value).toBe('')
      })
    })

    it('debe mostrar mensaje de error cuando falla el envío', async () => {
      const user = userEvent.setup()
      
      // Mock de error del servidor
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Error al enviar el mensaje' }),
      })
      
      render(<ContactForm />)
      
      await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez')
      await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
      await user.type(screen.getByLabelText(/asunto/i), 'Consulta')
      await user.type(screen.getByLabelText(/mensaje/i), 'Mensaje válido')
      
      await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))
      
      await waitFor(() => {
        expect(screen.getByText(/error al enviar el mensaje/i)).toBeInTheDocument()
      })
    })

    it('debe deshabilitar el botón mientras se está enviando', async () => {
      const user = userEvent.setup()
      
      // Mock que tarda en responder
      ;(global.fetch as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ message: 'OK' }),
        }), 100))
      )
      
      render(<ContactForm />)
      
      await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez')
      await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
      await user.type(screen.getByLabelText(/asunto/i), 'Consulta')
      await user.type(screen.getByLabelText(/mensaje/i), 'Mensaje válido')
      
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })
      await user.click(submitButton)
      
      // El botón debe estar deshabilitado mientras carga
      expect(submitButton).toBeDisabled()
      expect(screen.getByText(/enviando/i)).toBeInTheDocument()
    })
  })

  describe('Rate Limiting', () => {
    it('debe mostrar mensaje cuando se intenta enviar demasiado rápido', async () => {
      const user = userEvent.setup()
      
      // Mock de rate limiting que rechaza
      const { canSubmitForm } = require('@/lib/utils/rate-limit')
      ;(canSubmitForm as jest.Mock).mockReturnValue({
        allowed: false,
        remainingMinutes: 3,
      })
      
      render(<ContactForm />)
      
      await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez')
      await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
      await user.type(screen.getByLabelText(/asunto/i), 'Consulta')
      await user.type(screen.getByLabelText(/mensaje/i), 'Mensaje válido')
      
      await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))
      
      await waitFor(() => {
        expect(screen.getByText(/por favor espera.*minuto/i)).toBeInTheDocument()
      })
    })
  })
})
