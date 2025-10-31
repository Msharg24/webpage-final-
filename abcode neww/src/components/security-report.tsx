"use client"

import { motion } from "framer-motion"

interface SecurityIssue {
  id: string
  severity: "critical" | "high" | "medium" | "low"
  title: string
  description: string
  line: number
  suggestion: string
}

interface SecurityReportProps {
  issues: SecurityIssue[]
}

export default function SecurityReport({ issues }: SecurityReportProps) {
  const severityColors = {
    critical: "text-red-500 bg-red-500/10 border-red-500/30",
    high: "text-orange-500 bg-orange-500/10 border-orange-500/30",
    medium: "text-yellow-500 bg-yellow-500/10 border-yellow-500/30",
    low: "text-blue-500 bg-blue-500/10 border-blue-500/30",
  }

  const severityBadgeColors = {
    critical: "bg-red-500/20 text-red-400",
    high: "bg-orange-500/20 text-orange-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    low: "bg-blue-500/20 text-blue-400",
  }

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
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  const criticalCount = issues.filter((i) => i.severity === "critical").length
  const highCount = issues.filter((i) => i.severity === "high").length

  return (
    <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
      {/* Summary */}
      <div className="glow-red rounded-lg border border-destructive/30 bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-foreground">Security Report</h3>
          <span className="text-2xl font-bold text-destructive">{issues.length}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {criticalCount} critical, {highCount} high priority issues found
        </p>
      </div>

      {/* Issues List */}
      <div className="space-y-2">
        {issues.map((issue) => (
          <motion.div
            key={issue.id}
            variants={itemVariants}
            className={`rounded-lg border p-4 ${severityColors[issue.severity]}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{issue.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${severityBadgeColors[issue.severity]}`}>
                    {issue.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm opacity-90 mb-2">{issue.description}</p>
                <div className="bg-black/20 rounded px-3 py-2 text-xs font-mono mb-2">Line {issue.line}</div>
                <p className="text-sm opacity-80">
                  <span className="font-semibold">Fix:</span> {issue.suggestion}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
