"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
// import type { Pool } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { DollarSign } from "lucide-react"
import { Pool } from "@/types/type"

interface TotalValueCardProps {
  pools: Pool[]
}

export function TotalValueCard({ pools }: TotalValueCardProps) {
  const totalValue = useMemo(() => {
    return pools.reduce((total, pool) => {
      return total + Number.parseFloat(pool.totalValueLockedUSDUntracked)
    }, 0)
  }, [pools])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl border border-blue-700/30 p-6 shadow-xl"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">Total Value Locked</p>
          <motion.h3
            className="text-2xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {formatCurrency(totalValue)}
          </motion.h3>
        </div>
        <div className="p-3 rounded-full bg-blue-900/50 border border-blue-700/50">
          <DollarSign className="h-5 w-5 text-blue-400" />
        </div>
      </div>

      <div className="mt-4">
        {/* <span className="text-blue-400 text-sm">+15.2%</span> */}
        {/* <span className="text-gray-400 text-sm ml-1">vs last week</span> */}
      </div>
    </motion.div>
  )
}

