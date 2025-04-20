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
      <motion.h2 
        className="text-2xl font-medium mb-16 inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Experience
        <motion.div 
          className="h-px bg-gradient-to-r from-white/10 to-transparent mt-2"
          initial={{ width: 0 }} 
          animate={{ width: "100%" }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.h2>

      <div className="space-y-20">
        {experiences.map((experience, idx) => (
          <motion.div
            key={experience.id}
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
                {experience.period}
              </motion.div>
            </div>
            <div className="md:col-span-9">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-medium text-white transition-colors">
                    {experience.title}
                  </h3>
                  <p className="text-lg text-neutral-400">
                    {experience.company} <span className="text-neutral-500">•</span> {experience.location}
                  </p>
                </div>
                
                <motion.p 
                  className="text-neutral-300 leading-relaxed"
                  initial={{ opacity: 0.8 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {experience.description}
                </motion.p>
                
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

