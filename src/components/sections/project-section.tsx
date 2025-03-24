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
      <h2 className="text-2xl font-medium mb-12">Projects</h2>

      <div className="space-y-24">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-12 gap-8"
          >
            <div className="col-span-3">
              <div className="text-neutral-400">{project.year}</div>
            </div>
            <div className="col-span-9">
              <h3 className="text-2xl font-medium mb-2">{project.title}</h3>
              <p className="text-neutral-300 mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="text-sm text-neutral-400">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-6">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>Source</span>
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

