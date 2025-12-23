'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { AnimatedSection } from '@/components/shared/animated-section'
import { staggerContainer, staggerItem } from '@/lib/animations/variants'
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiPrisma,
  SiGit, SiDocker, SiFigma, SiVercel
} from 'react-icons/si'
import { FaCode } from 'react-icons/fa'

const skills = {
  frontend: [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Framer Motion', icon: SiFramer, color: '#FF0055' },
  ],
  backend: [
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Express', icon: SiExpress, color: '#FFFFFF' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
  ],
  tools: [
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'VS Code', icon: FaCode, color: '#007ACC' },
    { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    { name: 'Vercel', icon: SiVercel, color: '#FFFFFF' },
  ],
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
                  <Badge 
                    key={skill.name} 
                    variant="secondary"
                    className="gap-1.5 py-1.5 px-3"
                  >
                    <skill.icon 
                      className="w-4 h-4"
                      style={{ color: skill.color }}
                    />
                    {skill.name}
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
