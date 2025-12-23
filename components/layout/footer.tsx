import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const socialLinks = [
  { name: "GitHub", href: "https://github.com/tuusuario", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/tuusuario", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/tuusuario", icon: Twitter },
  { name: "Email", href: "mailto:tu@email.com", icon: Mail },
]

const footerLinks = [
  { name: "Inicio", href: "/" },
  { name: "Sobre mí", href: "#about" },
  { name: "Proyectos", href: "#projects" },
  { name: "Contacto", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              TuNombre
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Desarrollador Full Stack apasionado por crear experiencias web excepcionales.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Enlaces rápidos</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Sígueme</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{link.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} TuNombre. Todos los derechos reservados.</p>
          <p>
            Hecho con ❤️ usando{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-primary transition-colors"
            >
              Next.js
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
