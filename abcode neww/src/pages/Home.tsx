import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Header from "@/components/header"
import CodeViewer from "@/components/code-viewer"
import ErrorAnalysis from "@/components/error-analysis"
import SecurityReport from "@/components/security-report"
import Recommendations from "@/components/recommendations"
import Footer from "@/components/footer"
import BottomNavigation from "@/components/bottom-navigation"
import { staggerContainer, staggerItem } from "@/lib/animation-variants"

export default function Home() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      navigate("/auth")
    } else {
      setIsLoading(false)
    }
  }, [navigate])

  const [code, setCode] = useState(`email = "user@example.com"
password = "12345"
print("Hello World")`)

  const securityIssues = [
    {
      id: "sec-1",
      severity: "critical" as const,
      title: "Hardcoded Password",
      description: "Password credentials are hardcoded in the source code",
      line: 2,
      suggestion: "Use environment variables or a secrets manager to store passwords",
    },
    {
      id: "sec-2",
      severity: "high" as const,
      title: "Exposed Email Address",
      description: "Email address is hardcoded and could be used for phishing",
      line: 1,
      suggestion: "Store user data in environment variables or configuration files",
    },
    {
      id: "sec-3",
      severity: "medium" as const,
      title: "No Input Validation",
      description: "User input is not validated before use",
      line: 3,
      suggestion: "Add input validation and sanitization for all user inputs",
    },
  ]

  const recommendations = [
    {
      id: "rec-1",
      title: "Use Environment Variables",
      description: "Move sensitive data like passwords and API keys to environment variables",
      priority: "high" as const,
      category: "Security",
      action: "Learn more",
    },
    {
      id: "rec-2",
      title: "Add Error Handling",
      description: "Wrap your code in try-catch blocks to handle potential errors gracefully",
      priority: "high" as const,
      category: "Best Practices",
      action: "View example",
    },
    {
      id: "rec-3",
      title: "Add Type Hints",
      description: "Use type hints to make your code more readable and catch type errors early",
      priority: "medium" as const,
      category: "Code Quality",
      action: "See guide",
    },
  ]

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
          Code Analysis
        </motion.h1>

        {/* Code Viewer and Error Analysis */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={staggerItem}>
          <CodeViewer code={code} />
          <ErrorAnalysis />
        </motion.div>

        {/* Security Report */}
        <motion.div className="mt-8" variants={staggerItem}>
          <SecurityReport issues={securityIssues} />
        </motion.div>

        {/* Stats */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12" variants={staggerItem}>
          {[
            { label: "Errors Detected", value: "9", color: "accent" },
            { label: "Security Issues", value: "3", color: "primary" },
            { label: "Recommendations", value: "12", color: "accent" },
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

        {/* Recommendations */}
        <motion.div className="mt-12" variants={staggerItem}>
          <Recommendations recommendations={recommendations} />
        </motion.div>
      </motion.main>

      <Footer />
      <BottomNavigation />
    </div>
  )
}
