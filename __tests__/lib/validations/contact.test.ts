import { contactFormSchema } from '@/lib/validations/contact'

describe('contactFormSchema', () => {
  // Test 1: Validar datos correctos
  it('debe aceptar datos válidos', () => {
    const validData = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      subject: 'Consulta sobre proyecto',
      message: 'Hola, me gustaría hablar sobre un proyecto web que tengo en mente.',
    }

    // expect() - Verificamos que algo sea verdadero
    // .parse() - Método de Zod que valida y retorna los datos si son válidos
    // Si parse() no lanza error, el test pasa
    expect(() => contactFormSchema.parse(validData)).not.toThrow()
  })

  // Test 2: Nombre muy corto
  it('debe rechazar nombre con menos de 2 caracteres', () => {
    const invalidData = {
      name: 'J', // Solo 1 carácter
      email: 'juan@example.com',
      subject: 'Consulta',
      message: 'Mensaje válido de prueba',
    }

    // .toThrow() - Verifica que se lance un error
    expect(() => contactFormSchema.parse(invalidData)).toThrow()
  })

  // Test 3: Email inválido
  it('debe rechazar email inválido', () => {
    const invalidData = {
      name: 'Juan Pérez',
      email: 'email-invalido', // Sin @
      subject: 'Consulta',
      message: 'Mensaje válido de prueba',
    }

    expect(() => contactFormSchema.parse(invalidData)).toThrow()
  })

  // Test 4: Asunto muy corto
  it('debe rechazar asunto con menos de 3 caracteres', () => {
    const invalidData = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      subject: 'Ok', // Solo 2 caracteres
      message: 'Mensaje válido de prueba',
    }

    expect(() => contactFormSchema.parse(invalidData)).toThrow()
  })

  // Test 5: Mensaje muy corto
  it('debe rechazar mensaje con menos de 10 caracteres', () => {
    const invalidData = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      subject: 'Consulta',
      message: 'Corto', // Solo 5 caracteres
    }

    expect(() => contactFormSchema.parse(invalidData)).toThrow()
  })

  // Test 6: Nombre muy largo
  it('debe rechazar nombre con más de 50 caracteres', () => {
    const invalidData = {
      name: 'A'.repeat(51), // 51 caracteres
      email: 'juan@example.com',
      subject: 'Consulta',
      message: 'Mensaje válido de prueba',
    }

    expect(() => contactFormSchema.parse(invalidData)).toThrow()
  })

  // Test 7: Todos los campos vacíos
  it('debe rechazar cuando faltan campos requeridos', () => {
    const invalidData = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }

    expect(() => contactFormSchema.parse(invalidData)).toThrow()
  })

  // Test 8: Verificar mensaje de error específico
  it('debe retornar el mensaje de error correcto para email inválido', () => {
    const invalidData = {
      name: 'Juan Pérez',
      email: 'invalido',
      subject: 'Consulta',
      message: 'Mensaje válido de prueba',
    }

    try {
      contactFormSchema.parse(invalidData)
      // Si no lanza error, falla el test
      fail('Debería haber lanzado un error')
    } catch (error: any) {
      // error.issues es un array de errores de Zod
      expect(error.issues[0].message).toBe('Email inválido')
    }
  })
})
