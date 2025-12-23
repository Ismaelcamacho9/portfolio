"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Code2, Sparkles, Download } from "lucide-react"
import { Typewriter } from "@/components/shared/typewriter"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function HeroSection() {
  return (
    <>
      {/* Efectos de fondo - fuera del container */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:mix-blend-normal"></div>
        <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-purple-300/20 dark:bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 dark:mix-blend-normal"></div>
        <div className="absolute bottom-[20%] left-[20%] w-96 h-96 bg-pink-300/20 dark:bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 dark:mix-blend-normal"></div>
      </div>

      <section className="relative container py-24 md:py-32 lg:py-40">

      <motion.div
        className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Badge superior */}
        <motion.div variants={fadeInUp}>
          <Badge variant="secondary" className="gap-2 px-4 py-2">
            <Sparkles className="h-3 w-3" />
            Disponible para nuevos proyectos
          </Badge>
        </motion.div>

        {/* Avatar / Foto de perfil */}
        <motion.div
          variants={fadeInUp}
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative h-32 w-32 sm:h-40 sm:w-40">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-600 opacity-75 blur-md"></div>
            <Avatar className="relative h-full w-full border-4 border-background">
              <AvatarImage src="/images/profile.jpg" alt="Tu Nombre" />
              <AvatarFallback className="text-4xl">TN</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>

        {/* Título principal */}
        <motion.div variants={fadeInUp} className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Hola, soy{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Tu Nombre
            </span>
          </h1>
        </motion.div>

        {/* Subtítulo con efecto typewriter */}
        <motion.div
          variants={fadeInUp}
          className="text-lg text-muted-foreground sm:text-xl md:text-2xl font-medium min-h-[2rem] px-4"
        >
          <Typewriter
            words={[
              "Desarrollador Full Stack",
              "Especialista en React & Next.js",
              "Creador de experiencias web",
              "Amante del código limpio",
            ]}
          />
        </motion.div>

        {/* Descripción */}
        <motion.p
          variants={fadeInUp}
          className="max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl px-4"
        >
          Apasionado por crear experiencias web modernas y funcionales. Transformo ideas en
          productos digitales excepcionales con código limpio y diseño impecable.
        </motion.p>

        {/* Botones CTA */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button size="lg" className="gap-2 group relative overflow-hidden w-full sm:w-auto">
              <span className="relative z-10">Ver Proyectos</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button size="lg" variant="outline" className="gap-2 glass hover:glass-strong w-full sm:w-auto">
              <Code2 className="h-4 w-4" />
              Contactar
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button size="lg" variant="outline" className="gap-2 glass hover:glass-strong w-full sm:w-auto">
              <Download className="h-4 w-4" />
              Descargar CV
            </Button>
          </motion.div>
        </motion.div>

        {/* Badges de tecnologías */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-2 pt-4 px-4"
        >
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"].map(
            (tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  variant="outline" 
                  className="hover:bg-primary/10 transition-all cursor-default glass hover:glass-strong"
                >
                  {tech}
                </Badge>
              </motion.div>
            )
          )}
        </motion.div>
      </motion.div>
    </section>
    </>
  )
}
