export interface TimelineItem {
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

export const timelineData: TimelineItem[] = [
  {
    id: 'work-1',
    type: 'work',
    title: 'Desarrollador Full Stack Senior',
    organization: 'Tech Solutions Inc.',
    location: 'Madrid, España',
    period: 'Enero 2023 - Presente',
    description: 'Liderando el desarrollo de aplicaciones web modernas con React y Node.js. Implementación de arquitecturas escalables y mejores prácticas de desarrollo.',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    current: true
  },
  {
    id: 'work-2',
    type: 'work',
    title: 'Desarrollador Frontend',
    organization: 'Digital Creative Agency',
    location: 'Barcelona, España',
    period: 'Junio 2021 - Diciembre 2022',
    description: 'Desarrollo de interfaces de usuario responsivas y accesibles. Colaboración con equipos de diseño para implementar experiencias de usuario excepcionales.',
    skills: ['React', 'Vue.js', 'Tailwind CSS', 'JavaScript', 'Git']
  },
  {
    id: 'edu-1',
    type: 'education',
    title: 'Máster en Desarrollo Web y Aplicaciones',
    organization: 'Universidad Tecnológica',
    location: 'Madrid, España',
    period: 'Septiembre 2020 - Junio 2021',
    description: 'Especialización en desarrollo web full stack, arquitecturas modernas y metodologías ágiles. Proyecto final: Plataforma e-learning con React y Node.js.',
    skills: ['Full Stack Development', 'Metodologías Ágiles', 'DevOps']
  },
  {
    id: 'work-3',
    type: 'work',
    title: 'Desarrollador Web Junior',
    organization: 'StartupX',
    location: 'Remote',
    period: 'Enero 2020 - Mayo 2021',
    description: 'Desarrollo y mantenimiento de aplicaciones web. Aprendizaje de tecnologías modernas y trabajo en equipo distribuido.',
    skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL']
  },
  {
    id: 'edu-2',
    type: 'education',
    title: 'Grado en Ingeniería Informática',
    organization: 'Universidad Politécnica',
    location: 'Valencia, España',
    period: 'Septiembre 2016 - Junio 2020',
    description: 'Formación sólida en fundamentos de programación, algoritmos, estructuras de datos y desarrollo de software. Participación en proyectos colaborativos y hackatones.',
    skills: ['Programación', 'Algoritmos', 'Bases de Datos', 'Ingeniería de Software']
  }
]

export function getWorkExperience(): TimelineItem[] {
  return timelineData.filter(item => item.type === 'work')
}

export function getEducation(): TimelineItem[] {
  return timelineData.filter(item => item.type === 'education')
}
