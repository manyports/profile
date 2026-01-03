"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const phrases = ["feel good", "look good", "are delightful"]

export function HomePage() {
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center px-6 md:px-12">
      <div className="max-w-2xl mx-auto w-full py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <p className="text-[#666]">
              Hey, I'm Yerassyl —
            </p>
            
            <h1 className="text-3xl md:text-4xl font-medium leading-snug tracking-[-0.02em]">
              A software engineer who{" "}
              <span className="text-white bg-[#000]">
                loves
              </span>{" "}
              building things for the web that{" "}
              <span className="inline-block relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phraseIndex}
                    initial={{ 
                      opacity: 0, 
                      y: 20,
                      filter: "blur(8px)"
                    }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      filter: "blur(0px)"
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -20,
                      filter: "blur(8px)"
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="text-[#666]"
                  >
                    {phrases[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              .
            </h1>
          </div>
          <p className="text-lg text-[#666] leading-relaxed">
            Currently a student at Nazarbayev Intellectual School in Kazakhstan, 
            spending most of my time with React, Next.js, and lately — AI.
          </p>
          <div className="pt-8 border-t border-[#eee]">
            <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm text-[#999]">
              <span>Astana & Semey, KZ</span>
              <span>·</span>
              <span>Available for projects</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
