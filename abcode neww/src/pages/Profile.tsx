import { motion } from "framer-motion"
import Header from "@/components/header"
import BottomNavigation from "@/components/bottom-navigation"
import Footer from "@/components/footer"

export default function ProfilePage() {
  const user = {
    name: "Alex Developer",
    email: "alex@example.com",
    joinDate: "January 2024",
    tier: "Pro",
    analysisCount: 156,
    issuesFixed: 342,
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <Header />

      <motion.main
        className="container mx-auto px-4 py-8 flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-foreground">Profile</h1>

        {/* Profile Card */}
        <motion.div
          className="glow-cyan rounded-xl border border-primary/20 bg-card p-8 max-w-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-6 mb-8">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground"
              whileHover={{ scale: 1.1 }}
            >
              {user.name.charAt(0)}
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-primary font-medium mt-1">Tier: {user.tier}</p>
            </div>
          </div>

          <div className="border-t border-primary/20 pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Account Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-input rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                <p className="text-foreground font-medium">{user.joinDate}</p>
              </div>
              <div className="bg-input rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Analyses</p>
                <p className="text-foreground font-medium">{user.analysisCount}</p>
              </div>
              <div className="bg-input rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Issues Fixed</p>
                <p className="text-foreground font-medium">{user.issuesFixed}</p>
              </div>
              <div className="bg-input rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Account Status</p>
                <p className="text-foreground font-medium">Active</p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary/20 mt-6 pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Settings</h3>
            <div className="space-y-3">
              <motion.button
                className="w-full px-4 py-2 rounded-lg bg-input border border-primary/20 text-foreground hover:border-primary/40 transition-colors text-left"
                whileHover={{ scale: 1.02 }}
              >
                Change Password
              </motion.button>
              <motion.button
                className="w-full px-4 py-2 rounded-lg bg-input border border-primary/20 text-foreground hover:border-primary/40 transition-colors text-left"
                whileHover={{ scale: 1.02 }}
              >
                Notification Preferences
              </motion.button>
              <motion.button
                className="w-full px-4 py-2 rounded-lg bg-input border border-primary/20 text-foreground hover:border-primary/40 transition-colors text-left"
                whileHover={{ scale: 1.02 }}
              >
                API Keys
              </motion.button>
            </div>
          </div>

          <motion.button
            className="w-full mt-6 py-2 rounded-lg bg-destructive/20 text-destructive border border-destructive/30 font-medium hover:bg-destructive/30 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign Out
          </motion.button>
        </motion.div>
      </motion.main>

      <Footer />
      <BottomNavigation />
    </div>
  )
}
