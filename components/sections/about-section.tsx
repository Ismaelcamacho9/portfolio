"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Target, Zap, Users } from "lucide-react"
import { AnimatedCard } from "@/components/shared/animated-card"
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations/variants"

const values = [
  {
    icon: Heart,
    title: "Pasión",
    description: "Amo lo que hago y me esfuerzo por crear productos excepcionales.",
  },
  {
    icon: Target,
    title: "Enfoque",
    description: "Me concentro en soluciones efectivas que resuelvan problemas reales.",
  },
  {
    icon: Zap,
    title: "Innovación",
    description: "Siempre busco las últimas tecnologías y mejores prácticas.",
  },
  {
    icon: Users,
    title: "Colaboración",
    description: "Creo en el trabajo en equipo y la comunicación abierta.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="container py-24 md:py-32 relative overflow-hidden">
      {/* Patrón de fondo decorativo */}
      <div className="absolute inset-0 -z-10 dot-pattern opacity-30" />
      
      <div className="mx-auto max-w-6xl">
        {/* Título de sección */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Sobre mí
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Conoce más sobre mi{" "}
            <span className="gradient-text">
              trayectoria
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Desarrollador apasionado con experiencia en crear soluciones web modernas y escalables
          </p>
        </motion.div>

        {/* Contenido principal */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center mb-16 px-4 sm:px-0">
          {/* Imagen/Ilustración */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-purple-600/20 p-8 glass">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-8xl mb-4">👨‍💻</div>
                  <p className="text-muted-foreground">Tu imagen profesional aquí</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Biografía */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-lg text-foreground leading-relaxed">
                Soy un desarrollador Full Stack con más de 3 años de experiencia creando
                aplicaciones web modernas y escalables. Mi pasión por la tecnología comenzó desde
                temprana edad y se ha convertido en una carrera profesional dedicada a resolver
                problemas complejos con código elegante.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Me especializo en el ecosistema de JavaScript/TypeScript, con un enfoque particular
                en React, Next.js y Node.js. Me encanta trabajar en proyectos que desafían mis
                habilidades y me permiten aprender nuevas tecnologías.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cuando no estoy programando, disfruto compartir conocimientos con la comunidad,
                contribuir a proyectos de código abierto y mantenerme actualizado con las últimas
                tendencias del desarrollo web.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Valores */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Mis valores</h3>
          <motion.div 
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                >
                  <AnimatedCard 
                    hoverEffect="lift"
                    className="h-full border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <CardContent className="pt-6 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h4 className="font-semibold mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </AnimatedCard>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
