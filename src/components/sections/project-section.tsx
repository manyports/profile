"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  year: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section>
      <motion.h2 
        className="text-2xl font-medium mb-16 inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Projects
        <motion.div 
          className="h-px bg-gradient-to-r from-white/10 to-transparent mt-2"
          initial={{ width: 0 }} 
          animate={{ width: "100%" }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.h2>

      <div className="space-y-20">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.6, 
              ease: [0.22, 1, 0.36, 1],
              delay: idx * 0.1 
            }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
          >
            <div className="md:col-span-3 self-start sticky top-20">
              <motion.div 
                initial={{ opacity: 0.5 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-neutral-400 text-sm font-medium"
              >
                {project.year}
              </motion.div>
            </div>
            <div className="md:col-span-9">
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-medium text-white transition-colors">
                  {project.title}
                </h3>
                
                <motion.p 
                  className="text-neutral-300 leading-relaxed"
                  initial={{ opacity: 0.8 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {project.description}
                </motion.p>

                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.span 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.2 + (index * 0.05),
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="text-xs px-3 py-1 bg-white/5 rounded-full text-neutral-300 border border-white/5"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex gap-5 pt-2">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neutral-400 hover:text-white transition-all group"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">Source</span>
                    </motion.a>
                  )}
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neutral-400 hover:text-white transition-all group"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">View Project</span>
                    </motion.a>
                  )}
                </div>
                
                <motion.div 
                  className="h-px w-full bg-neutral-800 my-6" 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

