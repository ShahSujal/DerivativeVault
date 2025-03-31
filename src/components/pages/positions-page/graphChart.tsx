import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { request, gql } from "graphql-request";

Chart.register(...registerables);

const UNISWAP_V3_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

const FETCH_POOL_DATA = gql`
  query GetPoolPrice($poolAddress: String!) {
    pool(id: $poolAddress) {
      token0Price
      token1Price
      id
    }
  }
`;

const PriceChart = ({ 
  poolAddress,
  strikePrice,
  expiryTimestamp 
}: {
  poolAddress: string;
  strikePrice: number;
  expiryTimestamp: number;
}) => {
  const [prices, setPrices] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<string[]>([]);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await request(UNISWAP_V3_SUBGRAPH, FETCH_POOL_DATA, { poolAddress });
        const price = parseFloat((response as any).pool.token0Price);

        setPrices((prevPrices) => [...prevPrices.slice(-9), price]); // Keep last 10 data points
        setTimestamps((prevTimestamps) => [...prevTimestamps.slice(-9), new Date().toLocaleTimeString()]);
      } catch (error) {
        console.error("Error fetching price data:", error);
      }
    };

    fetchPriceData();
    const interval = setInterval(fetchPriceData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [poolAddress]);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Token 0 Price (USD)",
        data: prices,
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Strike Price",
        data: new Array(prices.length).fill(strikePrice),
        borderColor: "red",
        borderDash: [5, 5],
      },
    ],
  };

  return (
    <div>
      <h2>Uniswap V3 Price Graph</h2>
      <Line data={data} />
      <p>Expiry Time: {new Date(expiryTimestamp * 1000).toLocaleString()}</p>
    </div>
  );
};

export default PriceChart;
