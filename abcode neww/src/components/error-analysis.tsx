"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ErrorCategory from "./error-category"
import ErrorStats from "./error-stats"

const errorCategories = [
  {
    id: "brackets",
    name: "Brackets",
    count: 2,
    description: "Mismatched or missing brackets",
    examples: ["Missing closing bracket on line 5", "Extra opening bracket on line 12"],
    explanation: "Brackets must be properly paired. Each opening bracket needs a corresponding closing bracket.",
    fix: "Check that all brackets are properly matched and closed.",
  },
  {
    id: "commas",
    name: "Commas",
    count: 1,
    description: "Missing or extra commas",
    examples: ["Missing comma in function call on line 8"],
    explanation: "Commas separate function arguments and list items. Missing commas cause syntax errors.",
    fix: "Add commas between function arguments and list elements.",
  },
  {
    id: "indentation",
    name: "Indentation",
    count: 3,
    description: "Incorrect indentation levels",
    examples: ["Inconsistent indentation on line 3", "Missing indentation on line 7"],
    explanation: "Python requires consistent indentation to define code blocks.",
    fix: "Use consistent indentation (typically 4 spaces per level).",
  },
  {
    id: "case-spelling",
    name: "Case & Spelling Errors",
    count: 1,
    description: "Variable name case or spelling mistakes",
    examples: ['Variable "myVar" used as "myvar" on line 15'],
    explanation: "Variable names are case-sensitive. Typos cause undefined variable errors.",
    fix: "Check variable names match their definitions exactly.",
  },
  {
    id: "colons",
    name: "Missing Colons",
    count: 2,
    description: "Missing colons in control structures",
    examples: ["Missing colon after if statement on line 4", "Missing colon after for loop on line 9"],
    explanation: "Python requires colons after if, for, while, and function definitions.",
    fix: "Add colons at the end of control structure declarations.",
  },
]

export default function ErrorAnalysis() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterSeverity, setFilterSeverity] = useState<"all" | "critical" | "warning">("all")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  const totalErrors = errorCategories.reduce((sum, cat) => sum + cat.count, 0)
  const byCategory = errorCategories.reduce(
    (acc, cat) => {
      acc[cat.name] = cat.count
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Error Stats */}
      <ErrorStats totalErrors={totalErrors} byCategory={byCategory} />

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(["all", "critical", "warning"] as const).map((filter) => (
          <motion.button
            key={filter}
            onClick={() => setFilterSeverity(filter)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterSeverity === filter
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Error Categories */}
      <motion.div className="space-y-2" variants={containerVariants} initial="hidden" animate="visible">
        {errorCategories.map((category) => (
          <motion.div key={category.id} variants={itemVariants}>
            <ErrorCategory
              category={category}
              isExpanded={expandedId === category.id}
              onToggle={() => setExpandedId(expandedId === category.id ? null : category.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Recommendations */}
      <motion.div className="glow-green rounded-lg border border-accent/30 bg-card p-4 mt-6" variants={itemVariants}>
        <h3 className="font-semibold text-accent mb-3">AI Recommendations</h3>
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex gap-2">
            <span className="text-accent">→</span>
            <span>Use a linter like ESLint or Pylint to catch errors automatically</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">→</span>
            <span>Enable IDE syntax highlighting to spot issues in real-time</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">→</span>
            <span>Consider using a code formatter like Prettier or Black</span>
          </li>
        </ul>
      </motion.div>

      {/* Chatbot */}
      <motion.div className="glow-blue rounded-lg border border-primary/30 bg-card p-4" variants={itemVariants}>
        <h3 className="font-semibold text-primary mb-3">Ask ABCode</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask a question about your code..."
            className="flex-1 bg-input border border-border rounded px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors text-sm">
            Ask
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
