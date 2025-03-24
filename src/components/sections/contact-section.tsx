"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react"

interface Social {
  platform: string
  url: string
  username: string
}

interface ContactSectionProps {
  socials: Social[]
}

export default function ContactSection({ socials }: ContactSectionProps) {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github className="w-5 h-5" />
      case "linkedin":
        return <Linkedin className="w-5 h-5" />
      case "email":
        return <Mail className="w-5 h-5" />
      case "telegram":
        return <MessageCircle className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-medium mb-12">Contact</h2>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-6">
          <div className="space-y-6">
            {socials.map((social) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {getIcon(social.platform)}
                <span>{social.username}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

