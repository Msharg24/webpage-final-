import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userEmail", email)
      if (isSignUp) {
        localStorage.setItem("userName", name)
      }
      navigate("/")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div className="flex items-center justify-center gap-2 mb-12" whileHover={{ scale: 1.05 }}>
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center glow-cyan"
            whileHover={{ rotate: 10 }}
          >
            <span className="text-accent-foreground font-bold text-2xl">A</span>
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            ABCode
          </h1>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="glow-cyan rounded-2xl border border-primary/30 bg-card/60 backdrop-blur-xl p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-bold mb-2 text-foreground">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
            <p className="text-muted-foreground mb-8">
              {isSignUp ? "Join ABCode to analyze your code with AI" : "Sign in to your ABCode account"}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <motion.input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg bg-input border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  whileFocus={{ boxShadow: "0 0 30px rgba(100, 180, 200, 0.3)" }}
                />
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-input border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                whileFocus={{ boxShadow: "0 0 30px rgba(100, 180, 200, 0.3)" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <motion.input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-input border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                whileFocus={{ boxShadow: "0 0 30px rgba(100, 180, 200, 0.3)" }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  Loading...
                </motion.span>
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <motion.button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:text-accent transition-colors font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </motion.button>
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </motion.div>
    </div>
  )
}
