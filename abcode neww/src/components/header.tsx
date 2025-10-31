"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Header() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-lg">A</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
            ABCode
          </h1>
        </motion.div>

        <div />
      </div>
    </header>
  )
}
