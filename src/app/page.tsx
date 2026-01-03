"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Page } from "@/types"
import { Dock } from "@/components/dock"
import { HomePage, WorkPage, AboutPage, PhotosPage, ContactPage } from "@/components/pages"

export default function App() {
  const [activePage, setActivePage] = useState<Page>("home")

  return (
    <main className="bg-white text-black font-[family-name:var(--font-geist-sans)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activePage === "home" && <HomePage />}
          {activePage === "work" && <WorkPage />}
          {activePage === "about" && <AboutPage />}
          {activePage === "photos" && <PhotosPage />}
          {activePage === "contact" && <ContactPage />}
        </motion.div>
      </AnimatePresence>

      <Dock activePage={activePage} setActivePage={setActivePage} />
    </main>
  )
}
