"use client"

import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="text-lg font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent mb-2">
              ABCode
            </h3>
            <p className="text-sm text-muted-foreground">AI-powered code analyzer for Visual Studio Code</p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-accent transition-colors cursor-pointer">Error Detection</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Security Analysis</li>
              <li className="hover:text-accent transition-colors cursor-pointer">AI Recommendations</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Code Insights</li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-accent transition-colors cursor-pointer">Documentation</li>
              <li className="hover:text-accent transition-colors cursor-pointer">GitHub</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Support</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© {currentYear} ABCode. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Twitter
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Discord
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
