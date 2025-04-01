"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SwapsChart } from "./swaps-chart";
import { PoolCard } from "./pool-card";
import { RecentSwapsCard } from "./recent-swap-card";
import { StatsCard } from "./stats-card";
import { TotalValueCard } from "./total-value-card";
// import { mockData } from "@/lib/mock-data"
// import type { TRealTimePriceData } from "@/lib/types"
import { ArrowUpRight, BarChart3, Activity, Wallet } from "lucide-react";
import { TRealTimePriceData } from "@/types/type";
import { sqrtPriceX96ToPrice } from "@/lib/scripts/getTokenPriceByTokenAddress";

type Props = {
  realPrice: TRealTimePriceData;
  tokenSymbol1: string;
  tokenSymbol2: string;
};
export function SwapsDashboard({
  realPrice,
  tokenSymbol1,
  tokenSymbol2,
}: Props) {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  if (!realPrice) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-primary rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  const currentPool = realPrice.data.pools.find(
    (pool) => pool.id === selectedPool
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Pool Price USD"
          value={sqrtPriceX96ToPrice(BigInt(realPrice.data.pools[0].sqrtPrice))
            .toFixed(2)
            .toString()}
          icon={<Activity className="h-5 w-5" />}
          change="+12.5%"
        />
        <StatsCard
          title="total Value Locked USD"
          value={realPrice.data.pools[0].totalValueLockedUSDUntracked}
          icon={<BarChart3 className="h-5 w-5" />}
          change="+3.2%"
        />
        <StatsCard
          title="Token 1"
          value={tokenSymbol1}
          icon={<Wallet className="h-5 w-5" />}
          change=""
        />
        <StatsCard
          title="Token 2"
          value={tokenSymbol2}
          icon={<Wallet className="h-5 w-5" />}
          change=""
        />
      </div>

      <div className="">
        <PoolCard
          // key={realPrice.data.pools[0].id}
          pool={realPrice.data.pools[0]}
          token1={tokenSymbol1}
          token2={tokenSymbol2}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        <div className="lg:col-span-2  backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-xl max-sm:p-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Swap Activity</h2>
            <div className="flex items-center space-x-2 text-sm text-blue-400">
              <span>Last 10 Transactions</span>
            </div>
          </div>
          <SwapsChart pool={realPrice.data.pools[0]} />
        </div>
        <RecentSwapsCard pool={realPrice.data.pools[0]} />
      </motion.div>
    </div>
  );
}
