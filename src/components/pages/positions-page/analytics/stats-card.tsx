"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface StatsCardProps {
  title: string
  value: string
  icon: ReactNode
  change: string
}

export function StatsCard({ title, value, icon, change }: StatsCardProps) {
  const isPositive = change.startsWith("+")

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-xl"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <motion.h3
            className="text-2xl font-bold mt-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {value}
          </motion.h3>
        </div>
        <div className="p-3 rounded-full bg-gray-700/50 border border-gray-600">{icon}</div>
      </div>

   
    </motion.div>
  )
}

