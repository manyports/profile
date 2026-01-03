"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { data } from "@/data"

export function WorkPage() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="min-h-screen pt-32 pb-40 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          className="text-[#999] mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Selected Work
        </motion.h2>

        <div className="space-y-0">
          {data.projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div 
                className={`py-8 border-b border-[#eee] transition-opacity duration-300 ${
                  hovered && hovered !== project.id ? "opacity-20" : "opacity-100"
                }`}
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium mb-2 group-hover:underline underline-offset-4 decoration-1">
                      {project.title}
                    </h3>
                    <p className="text-[#666] text-sm leading-relaxed max-w-md">
                      {project.description}
                    </p>
                  </div>
                  <span className="text-sm text-[#999] tabular-nums shrink-0">
                    {project.year}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}

