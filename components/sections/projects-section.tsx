'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ProjectCard } from './project-card'
import { ProjectModal } from './project-modal'
import { projects, categories, type Project } from '@/lib/data/projects'

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filtrar proyectos
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <section id="projects" className="container py-16 md:py-24 bg-muted/50 rounded-2xl md:rounded-3xl mt-8 md:mt-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center px-4"
        >
          <h2 className="text-2xl font-bold md:text-4xl lg:text-5xl">
            Proyectos Destacados
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Una selección de mis trabajos más recientes y relevantes
          </p>
        </motion.div>

        {/* Filtros y búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 space-y-4 px-4"
        >
          {/* Categorías */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                className="cursor-pointer transition-all hover:scale-105 text-xs sm:text-sm"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Badge>
            ))}
          </div>

          {/* Barra de búsqueda */}
          <div className="mx-auto max-w-md px-4 sm:px-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-sm sm:text-base"
              />
            </div>
          </div>
        </motion.div>

        {/* Contador de resultados */}
        {(searchQuery || selectedCategory !== 'all') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-center text-sm text-muted-foreground"
          >
            {filteredProjects.length} {filteredProjects.length === 1 ? 'proyecto encontrado' : 'proyectos encontrados'}
          </motion.div>
        )}

        {/* Grid de proyectos */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center px-4"
          >
            <div className="mb-4 text-4xl sm:text-6xl">🔍</div>
            <h3 className="mb-2 text-lg sm:text-xl font-semibold">No se encontraron proyectos</h3>
            <p className="text-muted-foreground">
              Intenta con otros términos de búsqueda o categorías
            </p>
          </motion.div>
        )}
      </div>

      {/* Modal de detalles */}
      <ProjectModal
        project={selectedProject}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}
