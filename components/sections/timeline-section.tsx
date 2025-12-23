'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedCard } from '@/components/shared/animated-card'

interface TimelineItem {
  id: string
  type: 'work' | 'education'
  title: string
  organization: string
  location?: string
  period: string
  description: string
  skills?: string[]
  current?: boolean
}

interface TimelineSectionProps {
  items: TimelineItem[]
}

export function TimelineSection({ items }: TimelineSectionProps) {
  return (
    <div className="relative">
      {/* Línea vertical central */}
      <div className="absolute left-12 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent md:left-1/2 md:-translate-x-1/2" />

      <div className="space-y-8 sm:space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {/* Icono en la línea de tiempo */}
            <div className="absolute left-12 -translate-x-1/2 sm:left-8 sm:-translate-x-1/2 md:left-1/2">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg">
                {item.type === 'work' ? (
                  <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary-foreground" />
                ) : (
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary-foreground" />
                )}
              </div>
            </div>

            {/* Contenido - alternando lados en desktop */}
            <div className={`ml-20 sm:ml-24 md:ml-0 md:w-[calc(50%-4rem)] ${
              index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
            }`}>
              <AnimatedCard 
                hoverEffect="lift"
                className="group relative overflow-hidden border-border/50 hover:border-primary/30 glass"
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                
                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">
                        {item.title}
                      </h3>
                      {item.current && (
                        <Badge variant="default" className="shrink-0">
                          Actual
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground/90">
                        {item.organization}
                      </p>
                      {item.location && (
                        <p className="flex items-center gap-1">
                          📍 {item.location}
                        </p>
                      )}
                      <p className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.period}
                      </p>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  {/* Skills/Tecnologías */}
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs glass hover:glass-strong transition-all cursor-default"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </AnimatedCard>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
