"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { formatTimestamp } from "@/lib/utils"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis } from "recharts"
import { Pool } from "@/types/type"
import { sqrtPriceX96ToPrice } from "@/lib/scripts/getTokenPriceByTokenAddress"

interface SwapsChartProps {
  pool: Pool
}

export function SwapsChart({ pool }: SwapsChartProps) {
  const chartData = useMemo(() => {
    // Sort swaps by timestamp
    const sortedSwaps = [...pool.swaps].sort((a, b) => Number.parseInt(a.timestamp) - Number.parseInt(b.timestamp))

    // Create chart data points
    return sortedSwaps.map((swap) => ({
      timestamp: Number.parseInt(swap.timestamp) * 1000, // Convert to milliseconds
      amountUSD: sqrtPriceX96ToPrice(BigInt(swap.sqrtPriceX96)),
      tick: Number.parseInt(swap.tick),
    }))
  }, [pool])

  const chartConfig = {
    amountUSD: {
      label: "Amount (USD)",
      color: "hsl(var(--chart-1))",
    },
    tick: {
      label: "Price Tick",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-[300px] w-full bg-[#0000004b]"
    >
      <ChartContainer config={chartConfig} className="h-full">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUSD" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => formatTimestamp(value)}
            tick={{ fill: "#9ca3af" }}
            axisLine={{ stroke: "#4b5563" }}
            tickLine={{ stroke: "#4b5563" }}
          />
          <YAxis
            tick={{ fill: "#9ca3af" }}
            axisLine={{ stroke: "#4b5563" }}
            tickLine={{ stroke: "#4b5563" }}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="bg-gray-900/90 backdrop-blur-sm border border-gray-800"
                labelClassName="text-gray-400"
                // valueClassName="font-mono"
              />
            }
          />
          <Area
            type="monotone"
            dataKey="amountUSD"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUSD)"
            animationDuration={1000}
          />
        </AreaChart>
      </ChartContainer>
    </motion.div>
  )
}

