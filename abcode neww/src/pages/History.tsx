import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Header from "@/components/header"
import BottomNavigation from "@/components/bottom-navigation"
import Footer from "@/components/footer"
import { staggerContainer, staggerItem } from "@/lib/animation-variants"

interface AnalysisRecord {
  id: string
  fileName: string
  date: string
  errorCount: number
  securityIssues: number
  status: "completed" | "in-progress"
}

export default function HistoryPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [analyses, setAnalyses] = useState<AnalysisRecord[]>([])

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      navigate("/auth")
    } else {
      setIsLoading(false)
      setAnalyses([
        {
          id: "1",
          fileName: "app.py",
          date: "2024-10-30",
          errorCount: 5,
          securityIssues: 2,
          status: "completed",
        },
        {
          id: "2",
          fileName: "utils.js",
          date: "2024-10-29",
          errorCount: 3,
          securityIssues: 1,
          status: "completed",
        },
        {
          id: "3",
          fileName: "config.ts",
          date: "2024-10-28",
          errorCount: 8,
          securityIssues: 3,
          status: "completed",
        },
        {
          id: "4",
          fileName: "main.go",
          date: "2024-10-27",
          errorCount: 2,
          securityIssues: 0,
          status: "completed",
        },
        {
          id: "5",
          fileName: "database.sql",
          date: "2024-10-26",
          errorCount: 4,
          securityIssues: 2,
          status: "completed",
        },
      ])
    }
  }, [navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-12 h-12 border-2 border-primary border-t-accent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <Header />

      <motion.main
        className="container mx-auto px-4 py-8 flex-1"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-4xl font-bold mb-8 text-foreground" variants={staggerItem}>
          Analysis History
        </motion.h1>

        {/* History Table */}
        <motion.div className="rounded-lg border border-primary/20 bg-card overflow-hidden" variants={staggerItem}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20 bg-card/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">File Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Errors</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Security Issues</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {analyses.map((analysis, idx) => (
                  <motion.tr
                    key={analysis.id}
                    className="border-b border-primary/10 hover:bg-card/50 transition-colors"
                    variants={staggerItem}
                    whileHover={{ scale: 1.01 }}
                  >
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{analysis.fileName}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{analysis.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent font-semibold">
                        {analysis.errorCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold">
                        {analysis.securityIssues}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          analysis.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {analysis.status === "completed" ? "✓ Completed" : "⏳ In Progress"}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12" variants={staggerItem}>
          {[
            { label: "Total Analyses", value: analyses.length.toString(), color: "accent" },
            {
              label: "Total Errors",
              value: analyses.reduce((sum, a) => sum + a.errorCount, 0).toString(),
              color: "primary",
            },
            {
              label: "Security Issues",
              value: analyses.reduce((sum, a) => sum + a.securityIssues, 0).toString(),
              color: "accent",
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="glow-cyan rounded-lg border border-primary/20 bg-card p-6 text-center"
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 30px rgba(100, 180, 200, 0.2)`,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="text-3xl font-bold text-primary mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.1, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.main>

      <Footer />
      <BottomNavigation />
    </div>
  )
}
