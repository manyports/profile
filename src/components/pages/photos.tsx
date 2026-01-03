"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { data } from "@/data"
import Image from "next/image"

export function PhotosPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof data.photos[0] | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (id: string) => {
    setImageErrors(prev => new Set(prev).add(id))
  }

  return (
    <div className="min-h-screen px-6 md:px-12 py-32 pb-40">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-end justify-between mb-12">
            <p className="text-[#999]">Photos</p>
            <p className="text-sm text-[#ccc]">{data.photos.length} moments</p>
          </div>
          <div className="columns-2 md:columns-3 gap-3">
            {data.photos.map((photo, i) => {
              const heights = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[4/3]"]
              const aspectClass = heights[i % heights.length]
              const hasError = imageErrors.has(photo.id)
              
              return (
                <motion.button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className={`group relative w-full overflow-hidden bg-[#f5f5f5] break-inside-avoid mb-3 ${aspectClass}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: i * 0.08, 
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {!hasError ? (
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={() => handleImageError(photo.id)}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#eee] to-[#e0e0e0] flex items-center justify-center">
                      <span className="text-[#ccc] text-xs">{photo.caption}</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <p className="text-white text-sm font-medium">{photo.caption}</p>
                    <p className="text-white/60 text-xs mt-1">{photo.location} · {photo.year}</p>
                  </div>
                </motion.button>
              )
            })}
          </div>

          <motion.p 
            className="text-center text-[#bbb] mt-16 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            More photos to be uploaded <span className="inline-block animate-pulse">:)</span>
          </motion.p>
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] bg-[#111] overflow-hidden mb-8">
                {!imageErrors.has(selectedPhoto.id) ? (
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.caption}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/20 text-sm">Image not found</span>
                  </div>
                )}
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white text-lg">{selectedPhoto.caption}</p>
                  <p className="text-white/40 text-sm mt-1">{selectedPhoto.location}</p>
                </div>
                <p className="text-white/20 text-sm">{selectedPhoto.year}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
