"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import SecurityModal from "./security-modal"
import { fadeInDown } from "@/lib/animation-variants"

interface SecurityAlertProps {
  onClose: () => void
}

export default function SecurityAlert({ onClose }: SecurityAlertProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="pulse-glow rounded-lg border border-destructive/50 bg-gradient-to-r from-destructive/10 to-destructive/5 p-4 flex items-start gap-4"
          variants={fadeInDown}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex-shrink-0 mt-1">
            <motion.svg
              className="w-6 h-6 text-destructive"
              fill="currentColor"
              viewBox="0 0 20 20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </motion.svg>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-destructive mb-1">Security Alert: Sensitive Information Detected</h3>
            <p className="text-sm text-foreground/80 mb-3">
              Your code contains potentially sensitive information (e.g., password or email). Remove or mask it before
              sharing.
            </p>
            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowModal(true)}
                className="text-sm text-accent hover:text-accent/80 font-medium transition-colors"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
              <motion.button
                onClick={onClose}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                Dismiss
              </motion.button>
            </div>
          </div>

          <motion.button
            onClick={onClose}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </motion.div>
      </AnimatePresence>

      <SecurityModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
