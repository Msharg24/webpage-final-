import { motion } from "framer-motion"
import Header from "@/components/header"
import Chatbot from "@/components/chatbot"
import Footer from "@/components/footer"
import BottomNavigation from "@/components/bottom-navigation"

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <Header />

      <motion.main
        className="container mx-auto px-4 py-8 flex-1 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-8 text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          AI Assistant
        </motion.h1>

        <motion.div
          className="glow-cyan rounded-xl border border-primary/20 bg-card p-6 h-[600px] flex flex-col"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Chatbot />
        </motion.div>
      </motion.main>

      <Footer />
      <BottomNavigation />
    </div>
  )
}
