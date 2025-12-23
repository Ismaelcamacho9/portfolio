export function getPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tu Nombre',
    url: 'https://tu-dominio.com',
    image: 'https://tu-dominio.com/profile.jpg',
    sameAs: [
      'https://github.com/tu-usuario',
      'https://linkedin.com/in/tu-usuario',
      'https://twitter.com/tu-usuario',
    ],
    jobTitle: 'Desarrollador Full Stack',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance / Tu Empresa',
    },
    description: 'Desarrollador web especializado en Next.js, React y TypeScript',
  }
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mi Portafolio',
    url: 'https://tu-dominio.com',
    description: 'Portafolio profesional de desarrollo web',
    author: {
      '@type': 'Person',
      name: 'Tu Nombre',
    },
    inLanguage: 'es-ES',
  }
}

export function getProfilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Mi Portafolio | Desarrollador Full Stack',
    url: 'https://tu-dominio.com',
    mainEntity: getPersonJsonLd(),
  }
}
