import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import DashboardStats from "@/components/dashboard-stats"
import AnalysisHistory from "@/components/analysis-history"
import UserProfile from "@/components/user-profile"

export default function DashboardPage() {
  const recentAnalyses = [
    {
      id: "1",
      fileName: "app.py",
      date: "Today at 2:30 PM",
      errors: 5,
      securityIssues: 2,
      score: 78,
    },
    {
      id: "2",
      fileName: "utils.js",
      date: "Yesterday at 10:15 AM",
      errors: 3,
      securityIssues: 1,
      score: 85,
    },
    {
      id: "3",
      fileName: "config.ts",
      date: "2 days ago",
      errors: 2,
      securityIssues: 3,
      score: 72,
    },
    {
      id: "4",
      fileName: "main.py",
      date: "3 days ago",
      errors: 8,
      securityIssues: 4,
      score: 65,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <motion.main
        className="container mx-auto px-4 py-8 flex-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back! Here's your analysis overview.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <DashboardStats totalAnalyses={24} errorsFixed={156} securityIssuesResolved={42} averageScore={76} />
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8" variants={itemVariants}>
          <div className="lg:col-span-2">
            <AnalysisHistory analyses={recentAnalyses} />
          </div>

          <div>
            <UserProfile name="Alex Developer" email="alex@example.com" joinDate="January 15, 2024" tier="pro" />
          </div>
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  )
}
