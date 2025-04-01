"use client"

import { motion } from "framer-motion"
// import type { Pool } from "@/lib/types"
import { Pool } from "@/types/type"
import { formatCurrency } from "@/lib/utils"
import { ArrowUpRight, TrendingUp, TrendingDown, CopyIcon } from "lucide-react"

interface PoolCardProps {
  pool: Pool,
  token1:string;
  token2:string
}

export function PoolCard({ pool, token1 , token2 }: PoolCardProps) {

  const totalValueLockedUSD = Number.parseFloat(pool.totalValueLockedUSDUntracked)

  // Determine if price is up or down (in a real app, you'd compare with previous data)
  const priceUp = Math.random() > 0.5

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        relative overflow-hidden rounded-2xl p-6 max-sm:p-0 cursor-pointer
        ${
       
             "bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-500/50"
            
        }
      `}
      
    >
      {/* Glow effect */}
  
        <motion.div
          className="absolute inset-0 bg-blue-500/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
     

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold flex flex-row justify-center items-center ">Pool: {pool.id} <CopyIcon className="w-4 h-4 text-gray-400 ml-4"/></h3>
            <p className="text-sm text-gray-400">
              Created: {new Date(Number.parseInt(pool.createdAtTimestamp) * 1000).toLocaleDateString()}
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-1 text-blue-400">
            <span className="text-sm">Details</span>
            <ArrowUpRight className="h-4 w-4" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-400">{token1} Price</p>
            <div className="flex items-center mt-1">
              <span className="text-lg font-semibold">$ {pool.token0Price}</span>
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`ml-2 ${!priceUp ? "text-green-500" : "text-red-500"}`}
              >
                {priceUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </motion.div>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400">{token2} Price</p>
            <div className="flex items-center mt-1">
              <span className="text-lg font-semibold">$ {pool.token1Price}</span>
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`ml-2 ${!priceUp ? "text-green-500" : "text-red-500"}`}
              >
                {!priceUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </motion.div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400">Total Value Locked</p>
          <p className="text-xl font-bold mt-1">{formatCurrency(totalValueLockedUSD)}</p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            {/* <span className="font-medium text-white">{pool.swaps.length}</span> swaps */}
          </div>

       
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-3 w-3 rounded-full bg-blue-500" />
       
        </div>
      </div>
    </motion.div>
  )
}

