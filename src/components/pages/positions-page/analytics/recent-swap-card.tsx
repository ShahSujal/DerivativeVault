"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { formatTimestamp, truncateAddress } from "@/lib/utils";
import { ArrowDownUp } from "lucide-react";
import { Pool } from "@/types/type";
import { sqrtPriceX96ToPrice } from "@/lib/scripts/getTokenPriceByTokenAddress";

interface RecentSwapsCardProps {
  pool: Pool;
}

export function RecentSwapsCard({ pool }: RecentSwapsCardProps) {
  const [hoveredSwap, setHoveredSwap] = useState<string | null>(null);

  // Sort swaps by timestamp (newest first)
  const recentSwaps = [...pool.swaps]
    .sort((a, b) => Number.parseInt(b.timestamp) - Number.parseInt(a.timestamp))
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 max-sm:p-0 shadow-xl h-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Swaps</h2>
        <div className="flex items-center space-x-2 text-sm text-blue-400">
          <span>Last 10 Transactions</span>
          {/* <ArrowUpRight className="h-4 w-4" /> */}
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {recentSwaps.map((swap, index) => (
            <motion.div
              key={swap.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredSwap(swap.id)}
              onMouseLeave={() => setHoveredSwap(null)}
            >
              <div className="p-4 rounded-xl bg-gray-700/30 border border-gray-700 hover:border-gray-600 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <ArrowDownUp className="h-4 w-4 text-blue-400" />
                      <span className="font-medium">
                        ${sqrtPriceX96ToPrice(BigInt(swap.sqrtPriceX96))}{" "}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-400">
                      {formatTimestamp(
                        Number.parseInt(swap.timestamp) * 1000,
                        true
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      From:{" "}
                      <span className="text-blue-400">
                        {truncateAddress(swap.sender)}
                      </span>
                    </div>
                    <div className="text-sm">
                      To:{" "}
                      <span className="text-purple-400">
                        {truncateAddress(swap.recipient)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
