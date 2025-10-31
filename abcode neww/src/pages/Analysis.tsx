import { motion } from "framer-motion"
import Header from "@/components/header"
import BottomNavigation from "@/components/bottom-navigation"
import Footer from "@/components/footer"
import CodeViewer from "@/components/code-viewer"
import ErrorAnalysis from "@/components/error-analysis"
import SecurityReport from "@/components/security-report"
import Recommendations from "@/components/recommendations"
import { staggerContainer, staggerItem } from "@/lib/animation-variants"

export default function AnalysisPage() {
  const code = `email = "user@example.com"
password = "12345"
print("Hello World")`

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
  ]

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
          Error Analysis
        </motion.h1>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={staggerItem}>
          <CodeViewer code={code} />
          <ErrorAnalysis />
        </motion.div>

        <motion.div className="mt-8" variants={staggerItem}>
          <SecurityReport issues={securityIssues} />
        </motion.div>

        <motion.div className="mt-8" variants={staggerItem}>
          <Recommendations recommendations={recommendations} />
        </motion.div>
      </motion.main>

      <Footer />
      <BottomNavigation />
    </div>
  )
}
