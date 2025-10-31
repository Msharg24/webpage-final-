"use client"

import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const chartData = [
  { date: "Jan 1", errors: 45 },
  { date: "Jan 5", errors: 38 },
  { date: "Jan 10", errors: 32 },
  { date: "Jan 15", errors: 24 },
  { date: "Jan 20", errors: 18 },
  { date: "Jan 25", errors: 12 },
  { date: "Jan 30", errors: 8 },
]

export default function ImprovementChart() {
  return (
    <motion.div
      className="glow-green rounded-lg border border-accent/30 bg-card p-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-4 text-foreground">Improvement Over Time</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(112, 193, 131, 0.1)" />
          <XAxis dataKey="date" stroke="rgba(255, 255, 255, 0.5)" />
          <YAxis stroke="rgba(255, 255, 255, 0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(20, 20, 20, 0.9)",
              border: "1px solid rgba(112, 193, 131, 0.3)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "rgba(255, 255, 255, 0.9)" }}
          />
          <Line
            type="monotone"
            dataKey="errors"
            stroke="rgba(112, 193, 131, 0.8)"
            strokeWidth={2}
            dot={{ fill: "rgba(112, 193, 131, 0.8)", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
