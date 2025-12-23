import dynamic from 'next/dynamic'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"
import { timelineData } from "@/lib/data/timeline"

// Lazy load de componentes below the fold
const AboutSection = dynamic(() => import("@/components/sections/about-section").then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="container py-24"><div className="h-96 animate-pulse bg-muted/50 rounded-lg" /></div>
})

const SkillsSection = dynamic(() => import("@/components/sections/skills-section").then(mod => ({ default: mod.SkillsSection })), {
  loading: () => <div className="container py-24"><div className="h-96 animate-pulse bg-muted/50 rounded-lg" /></div>
})

const TimelineSection = dynamic(() => import("@/components/sections/timeline-section").then(mod => ({ default: mod.TimelineSection })), {
  loading: () => <div className="h-96 animate-pulse bg-muted/50 rounded-lg" />
})

const ProjectsSection = dynamic(() => import("@/components/sections/projects-section").then(mod => ({ default: mod.ProjectsSection })), {
  loading: () => <div className="container py-24"><div className="h-96 animate-pulse bg-muted/50 rounded-lg" /></div>
})

const ContactSection = dynamic(() => import("@/components/sections/contact-section").then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="container py-24"><div className="h-96 animate-pulse bg-muted/50 rounded-lg" /></div>
})

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main id="main-content" className="flex-1" role="main">
        {/* Hero Section con animaciones */}
        <HeroSection />

        {/* Stats Section */}
        <StatsSection />

        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />

        <section id="experience" className="container py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                Experiencia & Educación
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Mi trayectoria profesional y académica
              </p>
            </div>
            <TimelineSection items={timelineData} />
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  )
}
