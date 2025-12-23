'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatedCard } from '@/components/shared/animated-card'
import type { Project } from '@/lib/data/projects'

interface ProjectCardProps {
  project: Project
  index: number
  onViewDetails: (project: Project) => void
}

export function ProjectCard({ project, index, onViewDetails }: ProjectCardProps) {
  const statusColors = {
    completed: 'bg-green-500/10 text-green-500 border-green-500/20',
    'in-progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    maintenance: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
  }

  const statusLabels = {
    completed: 'Completado',
    'in-progress': 'En Desarrollo',
    maintenance: 'Mantenimiento'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <AnimatedCard 
        hoverEffect="lift"
        className="group h-full overflow-hidden border-border/50 hover:border-primary/30 transition-all"
      >
        {/* Imagen del proyecto */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          
          {/* Placeholder image - reemplazar con Image real cuando tengas las imágenes */}
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="text-center">
              <div className="mb-2 text-6xl">🚀</div>
              <p className="text-sm text-muted-foreground">Imagen del proyecto</p>
            </div>
          </div>

          {/* Badges sobre la imagen */}
          <div className="absolute left-4 top-4 flex gap-2">
            {project.featured && (
              <Badge variant="default" className="glass-strong animate-glow">
                ⭐ Destacado
              </Badge>
            )}
            <Badge className={`${statusColors[project.status]} glass`}>
              {statusLabels[project.status]}
            </Badge>
          </div>

          {/* Botones de acción en hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            {project.links.github && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  variant="secondary"
                  className="glass-strong"
                  asChild
                >
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Código
                  </a>
                </Button>
              </motion.div>
            )}
            {project.links.demo && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  variant="secondary"
                  className="glass-strong"
                  asChild
                >
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </a>
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        <CardHeader>
          <div className="mb-2 flex items-start justify-between">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <span className="text-sm text-muted-foreground">{project.year}</span>
          </div>
          <CardDescription className="line-clamp-2">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Tecnologías */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Badge variant="outline" className="text-xs glass hover:glass-strong cursor-default">
                  {tech}
                </Badge>
              </motion.div>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs glass">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <motion.div
            className="w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              className="w-full group/btn hover:bg-primary/10"
              onClick={() => onViewDetails(project)}
            >
              Ver detalles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </motion.div>
        </CardFooter>
      </AnimatedCard>
    </motion.div>
  )
}
