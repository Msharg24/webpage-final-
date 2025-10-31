"use client"

import { motion } from "framer-motion"

interface ErrorStatsProps {
  totalErrors: number
  byCategory: Record<string, number>
}

export default function ErrorStats({ totalErrors, byCategory }: ErrorStatsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  }

  const categories = Object.entries(byCategory).sort(([, a], [, b]) => b - a)

  return (
    <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Errors */}
        <motion.div variants={itemVariants} className="glow-red rounded-lg border border-destructive/30 bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Errors</p>
              <p className="text-4xl font-bold text-destructive">{totalErrors}</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Error Distribution */}
        <motion.div variants={itemVariants} className="glow-blue rounded-lg border border-primary/30 bg-card p-6">
          <p className="text-sm text-muted-foreground mb-4">Error Distribution</p>
          <div className="space-y-3">
            {categories.slice(0, 3).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-foreground/80">{category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-primary/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / totalErrors) * 100}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-primary w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
