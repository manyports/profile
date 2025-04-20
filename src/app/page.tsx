"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ExperienceSection from "@/components/sections/experience-section"
import ProjectsSection from "@/components/sections/project-section"
import ContactSection from "@/components/sections/contact-section"
import CVViewer from "@/components/cv-viewer"
import { data } from "@/data"
import { Home, Briefcase, GraduationCap, FolderGit2, Cloud, CloudDrizzle, Sun, Code, Calendar, Clock, Award, Gauge } from 'lucide-react'
import { 
  Button, 
  PageTitle, 
  SectionHeader, 
  Card, 
  CardContent, 
  CardImage, 
  CardTitle, 
  CardDescription,
  Badge,
  Grid, 
  GridItem,
  Container,
  Spacer,
  StatusBadge,
  DynamicIsland
} from "@/components/ui"

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

  const dynamicIslandItems = navigationItems.map(item => ({
    ...item,
    isActive: 
      (activeSection === "software" && item.label === "Software Engineer") ||
      (activeSection === "student" && item.label === "Student @ NIS") ||
      (activeSection === "projects" && item.label === "Projects") ||
      (activeSection === null && item.label === "Home")
  }))

  const HomeScreen = () => (
    <motion.div 
      className="space-y-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Grid columns={1} mdColumns={12} gap={16}>
        <GridItem colSpan={1} mdColSpan={8} className="space-y-6">
          <motion.h2 
            className="text-3xl md:text-4xl font-medium leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Software engineer & developer focused on building exceptional digital experiences.
          </motion.h2>
          
          <motion.p
            className="text-neutral-400 text-lg leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Currently studying computer science in Kazakhstan. Building modern web apps with React, Next.js, TypeScript, and AI technologies.
          </motion.p>
        </GridItem>
      </Grid>

      <motion.div 
        className="space-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeader title="Featured Project" />
        
        <Card className="group">
          <CardImage 
            src="/featured-project.png" 
            alt="Featured project screenshot"
            className="aspect-video md:aspect-[16/7]"
          />
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <CardTitle>Math12.studio</CardTitle>
                <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div 
                    whileHover={{ rotate: 45 }}
                    className="text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                  </motion.div>
                </div>
              </div>
              <CardDescription>
                An AI-powered web app designed to help students build confidence and excel in math. With a focus on the Kazakhstani syllabus, it combines cutting-edge AI with an interactive approach to make learning more accessible and engaging. The project was presented on nFactorial Incubator 2024 and has 9000+ users.
              </CardDescription>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'Tailwind CSS', 'Express.js', 'ChatGPT API', 'Gemini API', 'MongoDB', 'JWT'].map((tech, index) => (
                <Badge key={tech} index={index}>{tech}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        className="space-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeader title="Skills & Expertise" />
        
        <Grid columns={1} mdColumns={4} gap={6}>
          {[
            { name: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'] },
            { name: 'Backend', skills: ['Node.js', 'Express', 'MongoDB'] },
            { name: 'Design', skills: ['Figma', 'UI/UX', 'Responsive Design'] },
            { name: 'Tools', skills: ['Git', 'Docker'] }
          ].map((category, i) => (
            <Card key={i} index={i} className="space-y-4 p-6">
              <CardTitle className="text-lg">{category.name}</CardTitle>
              <ul className="space-y-2.5">
                {category.skills.map(skill => (
                  <li key={skill} className="text-neutral-400 text-sm flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-neutral-500"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </Grid>
      </motion.div>

      <motion.div 
        className="space-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeader title="Current Status" />
        
        <Grid columns={1} mdColumns={3} gap={6}>
          <Card>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-lg font-medium">Now</p>
                  <p className="text-neutral-400">Building next-gen web applications</p>
                </div>
                <StatusBadge color="green" />
              </div>
            </CardContent>
          </Card>
          
          <Card index={1}>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-lg font-medium">Learning</p>
                  <p className="text-neutral-400">Advanced AI integration with web apps</p>
                </div>
                <StatusBadge color="blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card index={2}>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-lg font-medium">Location</p>
                  <p className="text-neutral-400">Astana, Kazakhstan; Semey, Kazakhstan</p>
                </div>
                <StatusBadge color="purple" />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </motion.div>

      <motion.div 
        className="space-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeader title="Latest Activity" />
        
        <div className="space-y-5">
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
            <Card key={i} index={i} className="group">
              <CardContent>
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium group-hover:text-white transition-colors">{post.title}</h3>
                    <p className="text-neutral-400">{post.desc}</p>
                  </div>
                  <p className="text-sm text-neutral-500 shrink-0">{post.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Container className="py-16 pb-32">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-24">
          <PageTitle>Yerassyl Bazarbayev</PageTitle>

          <Button 
            variant="primary"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
            }
            onClick={() => setShowCV(true)}
            className="mt-6 sm:mt-0"
          >
            View CV
          </Button>
        </div>

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
      </Container>

      <DynamicIsland navigationItems={dynamicIslandItems} />
    </main>
  )
}

