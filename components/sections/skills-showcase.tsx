'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { AnimatedSection } from '@/components/shared/animated-section'
import { staggerContainer, staggerItem } from '@/lib/animations/variants'

const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma'],
  tools: ['Git', 'Docker', 'VS Code', 'Figma', 'Vercel'],
}

export function SkillsShowcase() {
  return (
    <section className="container py-24">
      {/* Título con animación */}
      <AnimatedSection animation="fadeInUp" className="text-center mb-16">
        <Badge variant="outline" className="mb-4">
          Skills
        </Badge>
        <h2 className="text-4xl font-bold mb-4">
          Tecnologías{' '}
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Modernas
          </span>
        </h2>
      </AnimatedSection>

      {/* Grid de categorías con stagger animation */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >
        {Object.entries(skills).map(([category, items]) => (
          <motion.div key={category} variants={staggerItem}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 capitalize">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
