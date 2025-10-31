import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"

interface NavItem {
  id: string
  label: string
  href: string
  icon: string
  preview: string
}

const navItems: NavItem[] = [
  {
    id: "analysis",
    label: "View Code Analysis and Error Detection",
    href: "/",
    icon: "📊",
    preview: "Analyze code and detect errors",
  },
  {
    id: "chatbot",
    label: "Chat with AI Assistant",
    href: "/chatbot",
    icon: "💬",
    preview: "Get AI-powered coding assistance",
  },
  {
    id: "history",
    label: "History Analysis",
    href: "/history",
    icon: "📜",
    preview: "View your analysis history",
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
    icon: "👤",
    preview: "john.doe@example.com • Pro Plan",
  },
]

export default function BottomNavigation() {
  const location = useLocation()
  const pathname = location.pathname
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-primary/20 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.id}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className="relative"
              >
                <Link to={item.href}>
                  <motion.button
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all ${
                      isActive
                        ? "bg-gradient-to-br from-primary to-accent glow-cyan"
                        : "bg-card border border-primary/20 hover:border-primary/40"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-accent"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </Link>

                {/* Preview Tooltip */}
                <AnimatePresence>
                  {hoveredItem === item.id && !isActive && (
                    <motion.div
                      className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-card border border-primary/30 rounded-lg px-4 py-2 whitespace-nowrap text-sm text-foreground glow-cyan"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.preview}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
