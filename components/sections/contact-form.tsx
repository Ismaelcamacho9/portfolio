'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { canSubmitForm, setLastSubmitTime } from '@/lib/utils/rate-limit'

type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'rate-limited'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [remainingTime, setRemainingTime] = useState<number>(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    // Verificar rate limit antes de enviar
    const { allowed, remainingMinutes } = canSubmitForm()
    if (!allowed) {
      setStatus('rate-limited')
      setRemainingTime(remainingMinutes || 0)
      
      // Auto-resetear después de mostrar el mensaje
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
      
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el mensaje')
      }
      
      // Guardar timestamp del envío exitoso
      setLastSubmitTime(Date.now())
      
      setStatus('success')
      reset()

      // Resetear el estado de éxito después de 5 segundos
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.')
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(onSubmit)(e)
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6" aria-label="Formulario de contacto">
      {/* Nombre */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Nombre <span className="text-destructive" aria-label="requerido">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Tu nombre completo"
          {...register('name')}
          disabled={status === 'loading'}
          className={errors.name ? 'border-destructive' : ''}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-required="true"
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-destructive" aria-label="requerido">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          {...register('email')}
          disabled={status === 'loading'}
          className={errors.email ? 'border-destructive' : ''}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-required="true"
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Asunto */}
      <div className="space-y-2">
        <Label htmlFor="subject">
          Asunto <span className="text-destructive" aria-label="requerido">*</span>
        </Label>
        <Input
          id="subject"
          placeholder="¿Sobre qué quieres hablar?"
          {...register('subject')}
          disabled={status === 'loading'}
          className={errors.subject ? 'border-destructive' : ''}
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          aria-required="true"
        />
        {errors.subject && (
          <p id="subject-error" className="text-sm text-destructive" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Mensaje */}
      <div className="space-y-2">
        <Label htmlFor="message">
          Mensaje <span className="text-destructive" aria-label="requerido">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Escribe tu mensaje aquí..."
          rows={6}
          {...register('message')}
          disabled={status === 'loading'}
          className={errors.message ? 'border-destructive' : ''}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-required="true"
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Mensajes de estado */}
      {status === 'success' && (
        <div 
          className="flex items-center gap-2 rounded-lg bg-green-500/10 p-4 text-green-500"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          <p className="text-sm font-medium">
            ¡Mensaje enviado correctamente! Te responderé pronto.
          </p>
        </div>
      )}

      {status === 'rate-limited' && (
        <div 
          className="flex items-center gap-2 rounded-lg bg-amber-500/10 p-4 text-amber-600 dark:text-amber-500"
          role="alert"
          aria-live="assertive"
        >
          <Clock className="h-5 w-5" aria-hidden="true" />
          <p className="text-sm font-medium">
            Por favor espera {remainingTime} {remainingTime === 1 ? 'minuto' : 'minutos'} antes de enviar otro mensaje.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div 
          className="flex items-center gap-2 rounded-lg bg-destructive/10 p-4 text-destructive"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Botón de envío */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === 'loading' || status === 'rate-limited'}
        aria-label={status === 'loading' ? 'Enviando mensaje...' : 'Enviar mensaje de contacto'}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" aria-hidden="true" />
            Enviar Mensaje
          </>
        )}
      </Button>
    </form>
  )
}
