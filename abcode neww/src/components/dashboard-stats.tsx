"use client"

import { motion } from "framer-motion"

interface DashboardStatsProps {
  totalAnalyses: number
  errorsFixed: number
  securityIssuesResolved: number
  averageScore: number
}

export default function DashboardStats({
  totalAnalyses,
  errorsFixed,
  securityIssuesResolved,
  averageScore,
}: DashboardStatsProps) {
  const stats = [
    {
      label: "Total Analyses",
      value: totalAnalyses,
      icon: "📊",
      color: "glow-blue",
      borderColor: "border-primary/30",
    },
    {
      label: "Errors Fixed",
      value: errorsFixed,
      icon: "✓",
      color: "glow-green",
      borderColor: "border-accent/30",
    },
    {
      label: "Security Issues Resolved",
      value: securityIssuesResolved,
      icon: "🔒",
      color: "glow-red",
      borderColor: "border-destructive/30",
    },
    {
      label: "Average Score",
      value: `${averageScore}%`,
      icon: "⭐",
      color: "glow-green",
      borderColor: "border-accent/30",
    },
  ]

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          className={`${stat.color} rounded-lg border ${stat.borderColor} bg-card p-6`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.3 + idx * 0.1 }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
