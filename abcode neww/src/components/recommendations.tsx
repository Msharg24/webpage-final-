"use client"

import { motion } from "framer-motion"
import { staggerContainer, staggerItem } from "@/lib/animation-variants"

interface Recommendation {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  category: string
  action: string
}

interface RecommendationsProps {
  recommendations: Recommendation[]
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  const priorityColors = {
    high: "border-destructive/30 bg-destructive/5",
    medium: "border-yellow-500/30 bg-yellow-500/5",
    low: "border-accent/30 bg-accent/5",
  }

  const priorityBadgeColors = {
    high: "bg-destructive/20 text-destructive",
    medium: "bg-yellow-500/20 text-yellow-400",
    low: "bg-accent/20 text-accent",
  }

  return (
    <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div className="mb-6" variants={staggerItem}>
        <h2 className="text-2xl font-bold text-foreground mb-2">AI Recommendations</h2>
        <p className="text-muted-foreground">Personalized suggestions to improve your code quality</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, idx) => (
          <motion.div
            key={rec.id}
            variants={staggerItem}
            className={`rounded-lg border p-4 ${priorityColors[rec.priority]}`}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground mb-1">{rec.title}</h3>
                <p className="text-xs text-muted-foreground">{rec.category}</p>
              </div>
              <motion.span
                className={`px-2 py-1 rounded text-xs font-medium ${priorityBadgeColors[rec.priority]}`}
                whileHover={{ scale: 1.1 }}
              >
                {rec.priority.toUpperCase()}
              </motion.span>
            </div>

            <p className="text-sm text-foreground/80 mb-3">{rec.description}</p>

            <motion.button
              className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.95 }}
            >
              {rec.action} →
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
