"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations/variants"
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiHtml5, SiJavascript,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiGraphql,
  SiGit, SiDocker, SiFigma, SiVercel, SiAmazon
} from "react-icons/si"
import { FaServer, FaCode } from "react-icons/fa"

const skillsData = {
  frontend: [
    { name: "React", years: "3+ años", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", years: "2+ años", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "TypeScript", years: "2+ años", icon: SiTypescript, color: "#3178C6" },
    { name: "Tailwind CSS", years: "2+ años", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "HTML/CSS", years: "4+ años", icon: SiHtml5, color: "#E34F26" },
    { name: "JavaScript", years: "4+ años", icon: SiJavascript, color: "#F7DF1E" },
  ],
  backend: [
    { name: "Node.js", years: "3+ años", icon: SiNodedotjs, color: "#339933" },
    { name: "Express", years: "2+ años", icon: SiExpress, color: "#FFFFFF" },
    { name: "PostgreSQL", years: "2+ años", icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", years: "2+ años", icon: SiMongodb, color: "#47A248" },
    { name: "REST APIs", years: "3+ años", icon: FaServer, color: "#009688" },
    { name: "GraphQL", years: "1+ año", icon: SiGraphql, color: "#E10098" },
  ],
  tools: [
    { name: "Git & GitHub", years: "3+ años", icon: SiGit, color: "#F05032" },
    { name: "Docker", years: "1+ año", icon: SiDocker, color: "#2496ED" },
    { name: "VS Code", years: "4+ años", icon: FaCode, color: "#007ACC" },
    { name: "Figma", years: "2+ años", icon: SiFigma, color: "#F24E1E" },
    { name: "Vercel", years: "2+ años", icon: SiVercel, color: "#FFFFFF" },
    { name: "AWS", years: "1+ año", icon: SiAmazon, color: "#FF9900" },
  ],
}

export function SkillsSection() {
  return (
    <section className="container py-24 md:py-32 relative overflow-hidden">
      {/* Patrón de fondo decorativo */}
      <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />
      
      <div className="mx-auto max-w-6xl">
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Habilidades
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Tecnologías y{" "}
            <span className="gradient-text">
              herramientas
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stack tecnológico con el que trabajo día a día
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="tools">Herramientas</TabsTrigger>
            </TabsList>

            {Object.entries(skillsData).map(([category, skills]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <motion.div 
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={staggerItem}
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 group h-full">
                        {/* Fondo con gradiente en hover */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ 
                            background: `radial-gradient(circle at 50% 0%, ${skill.color}15 0%, transparent 70%)` 
                          }}
                        />
                        
                        <CardContent className="pt-8 pb-6 relative">
                          {/* Icono grande */}
                          <div className="flex justify-center mb-4">
                            <div 
                              className="w-16 h-16 flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                              style={{ 
                                backgroundColor: `${skill.color}20`,
                                boxShadow: `0 0 0 1px ${skill.color}30`
                              }}
                            >
                              <skill.icon 
                                className="w-8 h-8 transition-all duration-300" 
                                style={{ color: skill.color }}
                              />
                            </div>
                          </div>
                          
                          {/* Nombre */}
                          <h3 className="text-center font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {skill.name}
                          </h3>
                          
                          {/* Experiencia */}
                          <div className="flex justify-center">
                            <Badge 
                              variant="secondary" 
                              className="text-xs"
                              style={{ 
                                backgroundColor: `${skill.color}15`,
                                color: skill.color,
                                borderColor: `${skill.color}30`
                              }}
                            >
                              {skill.years}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
