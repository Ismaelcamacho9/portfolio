'use client'

import { X, Github, ExternalLink, Globe, CheckCircle2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { Project } from '@/lib/data/projects'

interface ProjectModalProps {
  project: Project | null
  open: boolean
  onClose: () => void
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  if (!project) return null

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl md:text-3xl">
                {project.title}
              </DialogTitle>
              <DialogDescription className="mt-2 text-base">
                {project.description}
              </DialogDescription>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className={statusColors[project.status]}>
                {statusLabels[project.status]}
              </Badge>
              {project.featured && (
                <Badge variant="default">⭐ Destacado</Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Imagen del proyecto */}
        <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mb-2 text-8xl">🚀</div>
              <p className="text-sm text-muted-foreground">Imagen del proyecto</p>
            </div>
          </div>
        </div>

        {/* Descripción extendida */}
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Acerca del Proyecto</h3>
            <p className="leading-relaxed text-muted-foreground">
              {project.longDescription}
            </p>
          </div>

          <Separator />

          {/* Tecnologías */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Tecnologías Utilizadas</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Características principales */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Características Principales</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Enlaces */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Enlaces</h3>
            <div className="flex flex-wrap gap-3">
              {project.links.github && (
                <Button variant="outline" asChild>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Ver Código
                  </a>
                </Button>
              )}
              {project.links.demo && (
                <Button variant="outline" asChild>
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ver Demo
                  </a>
                </Button>
              )}
              {project.links.website && (
                <Button variant="outline" asChild>
                  <a
                    href={project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Visitar Sitio
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Año */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Año:</span>
            <Badge variant="outline">{project.year}</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
