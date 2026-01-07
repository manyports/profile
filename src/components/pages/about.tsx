"use client"

import { motion } from "framer-motion"
import { data } from "@/data"

export function AboutPage() {
  return (
    <div className="min-h-screen px-6 md:px-12 py-32 pb-40">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-20"
        >
          <div className="space-y-8">
            <p className="text-[#999]">About</p>
            
            <div className="space-y-6 text-lg leading-relaxed text-[#444]">
              <p>
                I started coding in high school, building small tools that solved 
                problems I actually had. That curiosity turned into a craft.
              </p>
              <p>
                Now I focus on web development — creating interfaces that are 
                simple, fast, and pleasant to use. I care about the details: 
                the spacing, the transitions, how something feels when you click it.
              </p>
              <p>
                When I'm not coding, I like to play basketball and video games. I also really appreciate nature and the outdoors. I'm a big fan of Lana Del Rey & Serani Poji.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[#999]">Education</p>
            
            <div>
              <p className="font-medium">{data.education.school}</p>
              <p className="text-[#666] mt-1">{data.education.location} · {data.education.period}</p>
              <p className="text-[#666] mt-1">GPA: {data.education.gpa}</p>
            </div>

            <div className="flex gap-8 text-sm">
              <div>
                <p className="text-[#999]">SAT</p>
                <p className="font-medium">{data.education.tests.sat.total}</p>
              </div>
              <div>
                <p className="text-[#999]">IELTS</p>
                <p className="font-medium">{data.education.tests.ielts.total}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[#999]">Experience</p>
            
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start gap-4">
                    <p className="font-medium">{exp.title}</p>
                    <p className="text-sm text-[#999] shrink-0">{exp.period}</p>
                  </div>
                  <p className="text-[#666] text-sm mt-1">{exp.company}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[#999]">Honors</p>
            
            <div className="space-y-4">
              {data.honors.map((honor) => (
                <div key={honor.id} className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-medium">{honor.title}</p>
                    <p className="text-sm text-[#666]">{honor.description}</p>
                  </div>
                  <p className="text-sm text-[#999] shrink-0">{honor.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[#999]">Stack</p>
            
            <p className="text-[#666] leading-relaxed">
              {data.technologies.tools.join(", ")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
