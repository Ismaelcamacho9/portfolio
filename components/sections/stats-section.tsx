"use client"

import { motion } from "framer-motion"
import { Code2, Briefcase, Users, Award } from "lucide-react"
import { AnimatedCard } from "@/components/shared/animated-card"
import { staggerContainer, staggerItem } from "@/lib/animations/variants"

const stats = [
  {
    icon: Briefcase,
    value: "3+",
    label: "Años de experiencia",
  },
  {
    icon: Code2,
    value: "50+",
    label: "Proyectos completados",
  },
  {
    icon: Users,
    value: "30+",
    label: "Clientes satisfechos",
  },
  {
    icon: Award,
    value: "15+",
    label: "Certificaciones",
  },
]

export function StatsSection() {
  return (
    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <motion.div 
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={staggerItem}
              >
                <AnimatedCard
                  hoverEffect="lift"
                  className="group relative overflow-hidden border-border/50 hover:border-primary/50 p-6 text-center glass"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <motion.div 
                    className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <div className="text-3xl font-bold tracking-tight gradient-text">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </AnimatedCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
