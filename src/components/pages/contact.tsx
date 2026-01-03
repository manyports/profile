"use client"

import { motion } from "framer-motion"
import { data } from "@/data"

export function ContactPage() {
  return (
    <div className="min-h-screen flex items-center px-6">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-[#999] mb-12">Contact</p>
          <p className="text-2xl leading-relaxed mb-16">
            Open to new projects and opportunities.
          </p>

          <div className="space-y-4">
            {data.socials.map((social, i) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between py-4 border-b border-[#eee] hover:border-[#999] transition-colors group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <span className="text-[#999] group-hover:text-black transition-colors">
                  {social.platform}
                </span>
                <span className="group-hover:underline">
                  {social.username}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
