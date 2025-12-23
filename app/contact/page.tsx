import { ContactSection } from '@/components/sections/contact-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto conmigo. Estoy disponible para proyectos freelance, colaboraciones y oportunidades laborales.',
  openGraph: {
    title: 'Contacto | Mi Portafolio',
    description: 'Ponte en contacto conmigo para proyectos y colaboraciones.',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactSection />
    </main>
  )
}
