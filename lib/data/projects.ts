export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  category: 'web' | 'mobile' | 'fullstack' | 'design' | 'other'
  technologies: string[]
  features: string[]
  links: {
    github?: string
    demo?: string
    website?: string
  }
  status: 'completed' | 'in-progress' | 'maintenance'
  featured?: boolean
  year: number
}

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'Plataforma E-commerce',
    description: 'Tienda online completa con carrito de compras, pasarela de pago y panel de administración.',
    longDescription: 'Plataforma de comercio electrónico moderna construida con Next.js y Stripe. Incluye gestión de inventario, procesamiento de pagos, autenticación de usuarios, panel de administración completo y sistema de notificaciones en tiempo real.',
    image: '/projects/ecommerce.jpg',
    category: 'fullstack',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    features: [
      'Carrito de compras con persistencia',
      'Integración con Stripe para pagos',
      'Panel de administración completo',
      'Gestión de inventario en tiempo real',
      'Sistema de autenticación y autorización',
      'Notificaciones por email'
    ],
    links: {
      github: 'https://github.com/usuario/ecommerce-platform',
      demo: 'https://ecommerce-demo.vercel.app'
    },
    status: 'completed',
    featured: true,
    year: 2024
  },
  {
    id: 'task-manager',
    title: 'Gestor de Tareas Colaborativo',
    description: 'Aplicación de gestión de proyectos con tableros Kanban y colaboración en tiempo real.',
    longDescription: 'Herramienta de gestión de proyectos inspirada en Trello, con funcionalidades avanzadas de colaboración. Incluye tableros Kanban personalizables, asignación de tareas, comentarios en tiempo real y seguimiento de progreso.',
    image: '/projects/task-manager.jpg',
    category: 'web',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Redux'],
    features: [
      'Tableros Kanban drag & drop',
      'Colaboración en tiempo real',
      'Sistema de comentarios y menciones',
      'Asignación de tareas por usuario',
      'Notificaciones push',
      'Filtros y búsqueda avanzada'
    ],
    links: {
      github: 'https://github.com/usuario/task-manager',
      demo: 'https://task-manager-demo.vercel.app'
    },
    status: 'completed',
    featured: true,
    year: 2024
  },
  {
    id: 'weather-app',
    title: 'App del Clima',
    description: 'Aplicación meteorológica con pronósticos detallados y visualizaciones interactivas.',
    longDescription: 'Aplicación del clima moderna que proporciona pronósticos precisos, alertas meteorológicas y visualizaciones de datos atractivas. Incluye geolocalización, búsqueda de ciudades y comparación de múltiples ubicaciones.',
    image: '/projects/weather-app.jpg',
    category: 'web',
    technologies: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
    features: [
      'Pronóstico de 7 días',
      'Datos meteorológicos en tiempo real',
      'Gráficos interactivos de temperatura',
      'Geolocalización automática',
      'Búsqueda de ciudades',
      'Comparación de múltiples ubicaciones'
    ],
    links: {
      github: 'https://github.com/usuario/weather-app',
      demo: 'https://weather-app-demo.vercel.app'
    },
    status: 'completed',
    featured: false,
    year: 2023
  },
  {
    id: 'portfolio-builder',
    title: 'Constructor de Portafolios',
    description: 'Herramienta no-code para crear portafolios profesionales con plantillas personalizables.',
    longDescription: 'Plataforma SaaS que permite a creadores y desarrolladores construir portafolios profesionales sin código. Incluye editor visual drag & drop, múltiples plantillas, dominio personalizado y analíticas.',
    image: '/projects/portfolio-builder.jpg',
    category: 'fullstack',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS', 'Vercel', 'Stripe'],
    features: [
      'Editor visual drag & drop',
      'Múltiples plantillas profesionales',
      'Dominio personalizado',
      'SEO optimizado automáticamente',
      'Analytics integrado',
      'Exportación a código'
    ],
    links: {
      github: 'https://github.com/usuario/portfolio-builder',
      demo: 'https://portfolio-builder.vercel.app'
    },
    status: 'in-progress',
    featured: true,
    year: 2024
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness Tracker',
    description: 'Aplicación móvil para seguimiento de ejercicios y nutrición con planes personalizados.',
    longDescription: 'App completa de fitness que ayuda a los usuarios a alcanzar sus objetivos de salud. Incluye seguimiento de ejercicios, planes de nutrición personalizados, registro de progreso y comunidad social.',
    image: '/projects/fitness-tracker.jpg',
    category: 'mobile',
    technologies: ['React Native', 'Expo', 'Firebase', 'TypeScript', 'Redux Toolkit'],
    features: [
      'Seguimiento de ejercicios y calorías',
      'Planes de entrenamiento personalizados',
      'Base de datos de alimentos',
      'Gráficos de progreso',
      'Recordatorios y notificaciones',
      'Integración con wearables'
    ],
    links: {
      github: 'https://github.com/usuario/fitness-tracker'
    },
    status: 'completed',
    featured: false,
    year: 2023
  },
  {
    id: 'design-system',
    title: 'Sistema de Diseño',
    description: 'Biblioteca de componentes UI reutilizables con documentación interactiva.',
    longDescription: 'Sistema de diseño completo con componentes React accesibles y personalizables. Incluye documentación detallada, ejemplos de código en vivo y herramientas de tematización.',
    image: '/projects/design-system.jpg',
    category: 'design',
    technologies: ['React', 'TypeScript', 'Storybook', 'Styled Components', 'Radix UI'],
    features: [
      'Más de 50 componentes UI',
      'Totalmente accesible (WCAG 2.1)',
      'Tematización flexible',
      'Documentación con Storybook',
      'Testing automatizado',
      'Soporte dark/light mode'
    ],
    links: {
      github: 'https://github.com/usuario/design-system',
      demo: 'https://design-system.vercel.app'
    },
    status: 'maintenance',
    featured: false,
    year: 2023
  }
]

export const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Móvil' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'design', label: 'Diseño' },
  { value: 'other', label: 'Otros' }
] as const

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'all') {
    return projects
  }
  return projects.filter(project => project.category === category)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured)
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}
