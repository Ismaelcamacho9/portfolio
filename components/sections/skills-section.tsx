"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedCard } from "@/components/shared/animated-card"
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations/variants"

const skillsData = {
  frontend: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "Tailwind CSS", level: 92 },
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 93 },
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Express", level: 82 },
    { name: "PostgreSQL", level: 80 },
    { name: "MongoDB", level: 78 },
    { name: "REST APIs", level: 90 },
    { name: "GraphQL", level: 75 },
  ],
  tools: [
    { name: "Git & GitHub", level: 90 },
    { name: "Docker", level: 75 },
    { name: "VS Code", level: 95 },
    { name: "Figma", level: 80 },
    { name: "Vercel", level: 88 },
    { name: "AWS", level: 70 },
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
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={staggerItem}
                    >
                      <AnimatedCard 
                        hoverEffect="lift"
                        className="border-border/50 hover:border-primary/50 transition-colors group"
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium group-hover:text-primary transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-sm text-muted-foreground font-mono">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_100%] animate-gradient"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ 
                                duration: 1, 
                                delay: index * 0.05,
                                ease: "easeOut"
                              }}
                            />
                          </div>
                        </CardContent>
                      </AnimatedCard>
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
