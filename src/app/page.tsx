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
          className="fixed bottom-10 left-0 right-0 z-50 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="backdrop-blur-xl bg-black/70 border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-[28px] overflow-hidden"
            initial={{ y: 60, width: "auto" }}
            animate={{ 
              y: 0,
              width: "auto",
              transition: { 
                y: { type: "spring", stiffness: 300, damping: 25 },
                width: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
              }
            }}
            whileHover={{ 
              boxShadow: "0 8px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08)",
              y: -2,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div 
              className="px-3 py-3 flex items-center gap-1.5 relative"
              layout
            >
              <div className="flex gap-1 mx-1">
                {navigationItems.map((item, index) => {
                  const isActive = 
                    (activeSection === "software" && item.label === "Software Engineer") ||
                    (activeSection === "student" && item.label === "Student @ NIS") ||
                    (activeSection === "projects" && item.label === "Projects") ||
                    (activeSection === null && item.label === "Home");
                    
                  return (
                    <motion.button
                      key={item.label}
                      onClick={item.onClick}
                      className={`relative group flex items-center rounded-2xl px-4 py-2.5 transition-colors ${
                        isActive ? "text-white" : "text-neutral-400"
                      }`}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ 
                        opacity: 1,
                        x: 0,
                        transition: { 
                          delay: index * 0.06,
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1]
                        }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavBackground"
                          className="absolute inset-0 bg-white/[0.08] dark:bg-white/[0.08] rounded-2xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                      
                      <div className="relative z-10 flex items-center gap-2.5">
                        <motion.div
                          initial={{ scale: 1 }}
                          animate={{ scale: isActive ? 1.1 : 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <item.icon size={20} strokeWidth={1.5} 
                            className={`transition-colors ${isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`} 
                          />
                        </motion.div>
                        
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ 
                            opacity: isActive ? 1 : 0,
                            width: isActive ? "auto" : 0
                          }}
                          transition={{ 
                            duration: 0.3,
                            ease: [0.32, 0.72, 0, 1]
                          }}
                          className="text-sm font-medium whitespace-nowrap overflow-hidden"
                        >
                          {item.label === "Home" ? "Home" : 
                           item.label === "Software Engineer" ? "Engineer" : 
                           item.label === "Student @ NIS" ? "Student" : "Projects"}
                        </motion.span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              
              <motion.div 
                className="absolute inset-0 pointer-events-none opacity-0"
                animate={{ 
                  opacity: [0, 0.03, 0],
                  backgroundPosition: ["0% 0%", "100% 100%"]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 5,
                  ease: "linear"
                }}
                style={{ 
                  background: "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)",
                  backgroundSize: "250% 250%"
                }}
              />
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

