import React, { useEffect, useState } from "react";
import { realTimePrice } from "@/actions/fetcPrice";
import { TPosition, TRealTimePriceData } from "@/types/type";
import { getPoolAddress } from "@/lib/scripts/getSevenDaysPoolPrice";
import { Address } from "viem";
import { SwapsDashboard } from "./analytics/swap-dashboard";

const PriceChart = ({ position }: { position: TPosition }) => {
  const [realPrice, setRealTimePrice] = useState<TRealTimePriceData>();
  const [timestamps, setTimestamps] = useState<string[]>([]);

  const fetchPriceData = async () => {
    try {
      if (!position) {
        return;
      }
      const poolAddress = await getPoolAddress({
        tokenA: position.token0,
        tokenB: position.token1,
        feeTier: position.fee,
      });
      const priceData = await realTimePrice(poolAddress);


      if (priceData) {
        setRealTimePrice(priceData);
      }
    } catch (error) {
      console.error("Error fetching price data:", error);
    }
  };

  useEffect(() => {
    fetchPriceData();
    const interval = setInterval(fetchPriceData, 100000);
    return () => clearInterval(interval);
  }, [position, fetchPriceData]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#8080803c] backdrop-blur-lg to-[#00000008] text-white p-6">
      {realPrice && (
        <SwapsDashboard
          realPrice={realPrice}
          tokenSymbol1={position?.token0Symbol}
          tokenSymbol2={position.token1Symbol}
        />
      )}
    </main>
  );
};

export default PriceChart;
