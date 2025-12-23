import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { contactFormSchema } from '@/lib/validations/contact'

// Rate limiting en servidor
const RATE_LIMIT_MS = 5 * 60 * 1000 // 5 minutos en milisegundos
const submissionTimes = new Map<string, number>()

// Limpiar entradas antiguas cada 10 minutos
setInterval(() => {
  const now = Date.now()
  for (const [ip, timestamp] of submissionTimes.entries()) {
    if (now - timestamp > RATE_LIMIT_MS) {
      submissionTimes.delete(ip)
    }
  }
}, 10 * 60 * 1000)

function getClientIP(request: NextRequest): string {
  // Intentar obtener IP real del cliente
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    // Verificar rate limit por IP
    const clientIP = getClientIP(request)
    const lastSubmission = submissionTimes.get(clientIP)
    
    if (lastSubmission) {
      const timeSinceLastSubmit = Date.now() - lastSubmission
      if (timeSinceLastSubmit < RATE_LIMIT_MS) {
        const remainingMinutes = Math.ceil((RATE_LIMIT_MS - timeSinceLastSubmit) / (1000 * 60))
        return NextResponse.json(
          { error: `Por favor espera ${remainingMinutes} ${remainingMinutes === 1 ? 'minuto' : 'minutos'} antes de enviar otro mensaje.` },
          { status: 429 }
        )
      }
    }

    const body = await request.json()

    // Validar los datos con Zod
    const validatedData = contactFormSchema.parse(body)

    const { name, email, subject, message } = validatedData

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Puedes cambiar a 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER, // Tu email
        pass: process.env.EMAIL_PASSWORD, // Tu contraseña de aplicación
      },
    })

    // Configurar el email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER, // Email donde recibirás los mensajes
      replyTo: email, // El email del usuario que envía el formulario
      subject: `[Portfolio] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .info-row {
                margin-bottom: 15px;
              }
              .label {
                font-weight: bold;
                color: #667eea;
                display: inline-block;
                width: 100px;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
                border-left: 4px solid #667eea;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">📬 Nuevo Mensaje del Portfolio</h1>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">De:</span>
                <span>${name}</span>
              </div>
              <div class="info-row">
                <span class="label">Email:</span>
                <span><a href="mailto:${email}">${email}</a></span>
              </div>
              <div class="info-row">
                <span class="label">Asunto:</span>
                <span>${subject}</span>
              </div>
              
              <div class="message-box">
                <h3 style="margin-top: 0; color: #667eea;">Mensaje:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              
              <div class="footer">
                <p>Este mensaje fue enviado desde tu formulario de contacto del portfolio.</p>
                <p>Puedes responder directamente a ${email}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }

    // Enviar el email
    await transporter.sendMail(mailOptions)

    // Registrar el timestamp del envío exitoso
    submissionTimes.set(clientIP, Date.now())

    return NextResponse.json(
      { message: 'Mensaje enviado correctamente' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing request:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
