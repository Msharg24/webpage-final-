"use client"

import { motion } from "framer-motion"

interface CodeViewerProps {
  code: string
}

export default function CodeViewer({ code }: CodeViewerProps) {
  const lines = code.split("\n")

  return (
    <motion.div
      className="glow-green rounded-lg border border-accent/30 overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-muted-foreground text-sm ml-4">Your Code</span>
      </div>

      <div className="bg-card/50 p-4 overflow-x-auto max-h-96 overflow-y-auto">
        <pre className="code-highlight text-accent">
          {lines.map((line, idx) => (
            <div key={idx} className="flex gap-4">
              <span className="text-muted-foreground select-none w-8 text-right">{idx + 1}</span>
              <span>{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </motion.div>
  )
}
