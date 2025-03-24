"use client"

import { motion } from "framer-motion"

interface Experience {
  id: string
  period: string
  title: string
  company: string
  description: string
  location: string
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-medium mb-12">Experience</h2>

      <div className="space-y-24">
        {experiences.map((experience) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-12 gap-8"
          >
            <div className="col-span-3">
              <div className="text-neutral-400">{experience.period}</div>
            </div>
            <div className="col-span-9">
              <h3 className="text-2xl font-medium mb-2">{experience.title}</h3>
              <p className="text-xl text-neutral-400 mb-4">
                {experience.company} • {experience.location}
              </p>
              <p className="text-neutral-300">{experience.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

