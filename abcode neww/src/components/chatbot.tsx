"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { staggerContainer, staggerItem } from "@/lib/animation-variants"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm ABCode, your AI code assistant. Ask me anything about your code, errors, or best practices!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on your code, I'd recommend using environment variables for sensitive data.",
        "I noticed you're using inconsistent indentation. Try using 4 spaces consistently throughout your code.",
        "Consider adding error handling to your function. This will make your code more robust.",
        "Your code looks good! Just make sure to add comments for complex logic.",
        "I'd suggest refactoring this function into smaller, more manageable pieces.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <motion.div
      className="glow-blue rounded-lg border border-primary/30 bg-card overflow-hidden flex flex-col h-96"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="border-b border-border px-4 py-3 bg-card/50"
        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
      >
        <h3 className="font-semibold text-foreground">ABCode Assistant</h3>
        <p className="text-xs text-muted-foreground">AI-powered code guidance</p>
      </motion.div>

      {/* Messages */}
      <motion.div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {messages.map((message, idx) => (
            <motion.div
              key={message.id}
              variants={staggerItem}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card border border-border text-foreground rounded-bl-none"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm">{message.content}</p>
              </motion.div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div variants={staggerItem} className="flex justify-start">
              <div className="bg-card border border-border text-foreground rounded-lg rounded-bl-none px-4 py-2">
                <div className="flex gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.1 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </motion.div>

      {/* Input */}
      <motion.div
        className="border-t border-border p-4 bg-card/50"
        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask a question..."
            className="flex-1 bg-input border border-border rounded px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          <motion.button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
