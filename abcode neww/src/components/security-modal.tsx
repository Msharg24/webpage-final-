"use client"

import { motion, AnimatePresence } from "framer-motion"

interface SecurityModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SecurityModal({ isOpen, onClose }: SecurityModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-lg p-6 z-50 glow-blue"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4 text-foreground">Security Best Practices</h2>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-semibold text-accent mb-2">Never Hardcode Secrets</h3>
                <p className="text-sm text-foreground/80 mb-3">
                  Passwords, API keys, and personal data should never be hardcoded in your source code.
                </p>
                <div className="bg-card/50 border border-border rounded p-3 font-mono text-xs text-destructive mb-2">
                  ❌ password = "12345"
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-accent mb-2">Use Environment Variables</h3>
                <p className="text-sm text-foreground/80 mb-3">
                  Store sensitive data in environment variables or configuration files.
                </p>
                <div className="bg-card/50 border border-border rounded p-3 font-mono text-xs text-accent">
                  ✓ password = os.getenv("DB_PASSWORD")
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Got it
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
