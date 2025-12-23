import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .max(50, { message: 'El nombre no puede exceder 50 caracteres' }),
  email: z
    .string()
    .min(1, { message: 'El email es requerido' })
    .email({ message: 'Email inválido' }),
  subject: z
    .string()
    .min(3, { message: 'El asunto debe tener al menos 3 caracteres' })
    .max(100, { message: 'El asunto no puede exceder 100 caracteres' }),
  message: z
    .string()
    .min(10, { message: 'El mensaje debe tener al menos 10 caracteres' })
    .max(1000, { message: 'El mensaje no puede exceder 1000 caracteres' }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
