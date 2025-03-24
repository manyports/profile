"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { data } from "@/data"
import { Fragment } from "react"

interface CVViewerProps {
  onClose: () => void
}

export default function CVViewer({ onClose }: CVViewerProps) {
  const softwareExperience = data.experience.software
  const studentExperience = data.experience.student
  const projects = data.projects
  const socials = data.socials

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="w-full max-w-5xl bg-white p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-neutral-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-black p-8 h-[80vh] overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-medium mb-2">Yerassyl Bazarbayev</h1>
            <p className="text-neutral-600 mb-6">Software Engineer • Student @ NIS</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {socials.map((social, index) => (
                <Fragment key={social.platform}>
                  <div className="text-sm text-neutral-600">{social.username}</div>
                  {index < socials.length - 1 && <div className="text-sm text-neutral-600">•</div>}
                </Fragment>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4 border-b border-neutral-200 pb-2">Summary</h2>
              <p className="text-neutral-700">
                Experienced software engineer with a strong background in full-stack development and a passion for
                creating intuitive user experiences. Currently studying at Nazarbayev Intellectual School with a focus
                on computer science and mathematics.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4 border-b border-neutral-200 pb-2">Software Experience</h2>
              
              {softwareExperience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <h3 className="text-lg font-medium">{exp.title}</h3>
                  <div className="flex justify-between text-sm text-neutral-600 mb-2">
                    <div>{exp.company}</div>
                    <div>{exp.period}</div>
                  </div>
                  <p className="text-neutral-700">{exp.description}</p>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4 border-b border-neutral-200 pb-2">Education & Student Experience</h2>
              
              {studentExperience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <h3 className="text-lg font-medium">{exp.title}</h3>
                  <div className="flex justify-between text-sm text-neutral-600 mb-2">
                    <div>{exp.company}</div>
                    <div>{exp.period}</div>
                  </div>
                  <p className="text-neutral-700">{exp.description}</p>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4 border-b border-neutral-200 pb-2">Skills</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="text-neutral-700">JavaScript/TypeScript</div>
                <div className="text-neutral-700">React/Next.js</div>
                <div className="text-neutral-700">Node.js</div>
                <div className="text-neutral-700">MongoDB</div>
                <div className="text-neutral-700">Express.js</div>
                <div className="text-neutral-700">Tailwind CSS</div>
                <div className="text-neutral-700">AI Integration</div>
                <div className="text-neutral-700">Git</div>
                <div className="text-neutral-700">UI/UX Design</div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-4 border-b border-neutral-200 pb-2">Projects</h2>

              {projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <h3 className="text-lg font-medium">{project.title}</h3>
                  <p className="text-sm text-neutral-600 mb-1">{project.technologies.join(", ")}</p>
                  <p className="text-neutral-700">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
