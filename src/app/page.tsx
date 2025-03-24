"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ExperienceSection from "@/components/sections/experience-section"
import ProjectsSection from "@/components/sections/project-section"
import ContactSection from "@/components/sections/contact-section"
import CVViewer from "@/components/cv-viewer"
import { data } from "@/data"
import { Home, Briefcase, GraduationCap, FolderGit2, Cloud, CloudDrizzle, Sun, Code, Calendar, Clock, Award, Gauge } from 'lucide-react'

type Section = "software" | "student" | "projects"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<Section | null>(null)
  const [showCV, setShowCV] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weather, setWeather] = useState({ temp: 24, condition: 'Sunny' })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const navigationItems = [
    { icon: Home, label: "Home", onClick: () => setActiveSection(null) },
    { icon: Briefcase, label: "Software Engineer", onClick: () => setActiveSection("software") },
    { icon: GraduationCap, label: "Student @ NIS", onClick: () => setActiveSection("student") },
    { icon: FolderGit2, label: "Projects", onClick: () => setActiveSection("projects") },
  ]

  const HomeScreen = () => (
    <motion.div 
      className="space-y-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Featured Project</h2>
          <FolderGit2 className="text-neutral-400" size={24} />
        </div>
        <div className="bg-neutral-900/30 rounded-xl overflow-hidden">
          <div className="relative overflow-hidden">
            <img
              src="/featured-project.png" 
              alt="Featured project screenshot"
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-medium mb-2">Math12.studio</h3>
            <p className="text-neutral-400 mb-4">An AI-powered web app designed to help students build confidence and excel in math. With a focus on the Kazakhstani syllabus, it combines cutting-edge AI with an interactive approach to make learning more accessible and engaging. The project was presented on nFactorial Incubator 2024 and has 9000+ users.</p>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'Tailwind CSS', 'Express.js', 'ChatGPT API', 'Gemini API', 'MongoDB', 'JWT'].map(tech => (
                <span key={tech} className="text-xs bg-white/5 px-2 py-1 rounded-full">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Skills & Expertise</h2>
          <Code className="text-neutral-400" size={24} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'] },
            { name: 'Backend', skills: ['Node.js', 'Express', 'MongoDB'] },
            { name: 'Design', skills: ['Figma', 'UI/UX', 'Responsive Design'] },
            { name: 'Tools', skills: ['Git', 'Docker'] }
          ].map((category, i) => (
            <div key={i} className="space-y-3">
              <h3 className="text-lg font-medium">{category.name}</h3>
              <ul className="space-y-2">
                {category.skills.map(skill => (
                  <li key={skill} className="text-neutral-400 text-sm">• {skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Current Status</h2>
          <Gauge className="text-neutral-400" size={24} />
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">Now</p>
              <p className="text-neutral-400">Building next-gen web applications</p>
            </div>
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">Learning</p>
              <p className="text-neutral-400">Advanced AI integration with web apps</p>
            </div>
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">Location</p>
              <p className="text-neutral-400">Astana, Kazakhstan; Semey, Kazakhstan</p>
            </div>
            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Latest Activity</h2>
          <Calendar className="text-neutral-400" size={24} />
        </div>
        <div className="space-y-6">
          {[
            { 
              title: "Implemented Dynamic Island UI on my portfolio website",
              desc: "Created a custom navigation component inspired by iOS Dynamic Island",
              date: "Mar 2025"
            },
            { 
              title: "Bought a yera.me domain for my portfolio",
              desc: "I've always wanted to have a personal domain for my portfolio, and now I have it!",
              date: "Mar 2025"
            },
            { 
              title: "Added PHP support to OnePorted",
              desc: "OnePorted is a platform for managing a programming club, and now it supports PHP!",
              date: "Feb 2025"
            }
          ].map((post, i) => (
            <div key={i} className="border-l-2 border-neutral-800 pl-4 space-y-1">
              <h3 className="text-lg font-medium">{post.title}</h3>
              <p className="text-neutral-400">{post.desc}</p>
              <p className="text-sm text-neutral-500">{post.date}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-8 py-16 pb-32">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl md:text-6xl font-medium tracking-tight">Yerassyl Bazarbayev</h1>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setShowCV(true)}
            className="mt-4 sm:mt-0 text-neutral-400 hover:text-white transition-colors"
          >
            View CV
          </motion.button>
        </div>

        <motion.div 
          className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="bg-neutral-900/40 backdrop-blur-2xl rounded-full border border-white/10 shadow-xl shadow-black/20 inline-flex"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4"
              layout
            >
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={item.onClick}
                  className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
                    (activeSection === "software" && item.label === "Software Engineer") ||
                    (activeSection === "student" && item.label === "Student @ NIS") ||
                    (activeSection === "projects" && item.label === "Projects") ||
                    (activeSection === null && item.label === "Home")
                      ? "bg-white/15 text-white scale-110 shadow-sm shadow-white/10"
                      : "text-neutral-300 hover:text-white hover:bg-white/10"
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <item.icon size={24} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeSection && (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-24 mb-20"
            >
              {activeSection === "software" && <ExperienceSection experiences={data.experience.software} />}
              {activeSection === "student" && <ExperienceSection experiences={data.experience.student} />}
              {activeSection === "projects" && <ProjectsSection projects={data.projects} />}
              <ContactSection socials={data.socials} />
            </motion.div>
          )}
        </AnimatePresence>

        {!activeSection && (
          <motion.div className="mb-20">
            <HomeScreen />
          </motion.div>
        )}

        {showCV && <CVViewer onClose={() => setShowCV(false)} />}
        
        <div className="h-16 md:h-20" />
      </div>
    </main>
  )
}

