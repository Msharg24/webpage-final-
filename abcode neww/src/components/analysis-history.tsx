"use client"

import { motion } from "framer-motion"

interface Analysis {
  id: string
  fileName: string
  date: string
  errors: number
  securityIssues: number
  score: number
}

interface AnalysisHistoryProps {
  analyses: Analysis[]
}

export default function AnalysisHistory({ analyses }: AnalysisHistoryProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      className="rounded-lg border border-border bg-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b border-border px-6 py-4">
        <h3 className="font-semibold text-foreground">Recent Analyses</h3>
      </div>

      <motion.div className="divide-y divide-border" variants={containerVariants} initial="hidden" animate="visible">
        {analyses.map((analysis) => (
          <motion.div
            key={analysis.id}
            variants={itemVariants}
            className="px-6 py-4 hover:bg-card/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{analysis.fileName}</h4>
                <p className="text-sm text-muted-foreground">{analysis.date}</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Errors</p>
                  <p className="text-lg font-semibold text-destructive">{analysis.errors}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Security</p>
                  <p className="text-lg font-semibold text-orange-500">{analysis.securityIssues}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="text-lg font-semibold text-accent">{analysis.score}%</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
