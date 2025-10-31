"use client"

import { motion, AnimatePresence } from "framer-motion"
import { staggerItem } from "@/lib/animation-variants"

interface ErrorCategoryProps {
  category: {
    id: string
    name: string
    count: number
    description: string
    examples: string[]
    explanation: string
    fix: string
  }
  isExpanded: boolean
  onToggle: () => void
}

export default function ErrorCategory({ category, isExpanded, onToggle }: ErrorCategoryProps) {
  return (
    <motion.div
      className="border border-border rounded-lg bg-card/50 overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
      onClick={onToggle}
      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(16, 185, 129, 0.1)" }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h4 className="font-semibold text-foreground">{category.name}</h4>
            <motion.span
              className="px-2 py-1 bg-destructive/20 text-destructive rounded text-xs font-medium"
              whileHover={{ scale: 1.1 }}
            >
              {category.count}
            </motion.span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="flex-shrink-0 ml-4"
        >
          <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-border px-4 py-4 bg-card/30"
          >
            <motion.div className="space-y-4" variants={staggerItem} initial="hidden" animate="visible">
              <motion.div variants={staggerItem}>
                <h5 className="text-sm font-semibold text-accent mb-2">Examples:</h5>
                <ul className="space-y-1">
                  {category.examples.map((example, idx) => (
                    <motion.li
                      key={idx}
                      className="text-sm text-foreground/80 flex gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <span className="text-muted-foreground">•</span>
                      <span>{example}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={staggerItem}>
                <h5 className="text-sm font-semibold text-accent mb-2">Explanation:</h5>
                <p className="text-sm text-foreground/80">{category.explanation}</p>
              </motion.div>

              <motion.div variants={staggerItem}>
                <h5 className="text-sm font-semibold text-accent mb-2">How to Fix:</h5>
                <p className="text-sm text-foreground/80">{category.fix}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
