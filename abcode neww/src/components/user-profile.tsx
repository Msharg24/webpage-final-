"use client"

import { motion } from "framer-motion"

interface UserProfileProps {
  name: string
  email: string
  joinDate: string
  tier: "free" | "pro" | "enterprise"
}

export default function UserProfile({ name, email, joinDate, tier }: UserProfileProps) {
  const tierColors = {
    free: "bg-muted text-muted-foreground",
    pro: "bg-primary/20 text-primary",
    enterprise: "bg-accent/20 text-accent",
  }

  return (
    <motion.div
      className="rounded-lg border border-border bg-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-accent-foreground">{name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tierColors[tier]}`}>{tier.toUpperCase()}</span>
      </div>

      <div className="space-y-3 pt-6 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Member Since</span>
          <span className="text-sm font-medium text-foreground">{joinDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Account Status</span>
          <span className="text-sm font-medium text-accent">Active</span>
        </div>
      </div>

      <motion.button
        className="w-full mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Edit Profile
      </motion.button>
    </motion.div>
  )
}
