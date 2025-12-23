'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Linkedin, Github, Twitter, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ContactForm } from './contact-form'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'tu@email.com',
    href: 'mailto:tu@email.com',
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Madrid, España',
    href: null,
  },
  {
    icon: Calendar,
    label: 'Disponibilidad',
    value: 'Disponible para proyectos',
    href: null,
  },
]

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/tuusuario',
    color: 'hover:text-[#333] dark:hover:text-white',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/tuusuario',
    color: 'hover:text-[#0A66C2]',
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: 'https://twitter.com/tuusuario',
    color: 'hover:text-[#1DA1F2]',
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="container py-16 md:py-24 bg-muted/50 rounded-2xl md:rounded-3xl mt-8 md:mt-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 text-center px-4"
        >
          <Badge variant="outline" className="mb-4">
            Contacto
          </Badge>
          <h2 className="text-2xl font-bold md:text-4xl lg:text-5xl">
            ¿Trabajamos juntos?
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Estoy abierto a nuevas oportunidades y colaboraciones
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-5 px-4 sm:px-0">
          {/* Información de contacto y redes sociales */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 sm:space-y-6 lg:col-span-2"
          >
            {/* Info Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm font-semibold hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Redes Sociales */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Redes Sociales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-lg border bg-background transition-all hover:scale-110 ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nota adicional */}
            <div className="rounded-lg border bg-card p-4 sm:p-6">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">💡 Nota:</span> Suelo
                responder en menos de 24 horas. Si prefieres, también puedes
                contactarme directamente por email o redes sociales.
              </p>
            </div>
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Envíame un Mensaje</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Completa el formulario y me pondré en contacto contigo pronto
                </p>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
