import { Bot, Coins, Hammer, TrendingUp } from "lucide-react";

export const integrationTasks = [
    {
      name: "Create Uniswap Position",
      description: "Go to Uniswap and create a liquidity position.",
      page: "https://app.uniswap.org/#/pool", // Uniswap position creation link
      action: "Create Position",
      logo: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <Coins className="text-gray-600" />
        </div>
      ),
    },
    {
      name: "Mint Options",
      description: "Lock Uniswap V3 LP positions as collateral to mint options.",
      page: "/mint",
      action: "Mint Options",
      logo: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <Hammer className="text-gray-600" />
        </div>
      ),
    },
    {
      name: "Exercise Options",
      description: "Exercise your options within the valid exercise window.",
      page: "/exercise",
      action: "Exercise Options",
      logo: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <Bot className="text-gray-600" />
        </div>
      ),
    },
    {
      name: "Track Positions",
      description: "View your Uniswap V3 positions, options, and transactions.",
      page: "/positions",
      action: "View Data",
      logo: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <TrendingUp className="text-gray-600" />
        </div>
      ),
    },
  ];
  
