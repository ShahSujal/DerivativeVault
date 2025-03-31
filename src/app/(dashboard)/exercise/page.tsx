"use client";
// import OptionsExerciser from "@/components/pages/mint-page/PositionExcersier";
import React, { useEffect, useState } from "react";

type TokenInfo = {
  name: string;
  symbol: string;
  decimals: number;
  address?: string;
};

type Position = {
  tokenId: string;
  token0: TokenInfo;
  token1: TokenInfo;
  fee: number;
  tickLower: number;
  tickUpper: number;
  liquidity: string;
};

type Transaction = {
  id: string;
  type: string;
  positionId: string;
  optionType: string;
  asset: string;
  timestamp: number;
  user: string;
};

type Option = {
  id: number;
  optionType: "CALL" | "PUT";
  assetSymbol: string;
  positionId: string;
  strike: number;
  expiry: number;
  amount: number;
  status: string;
};

type Statistics = {
  totalLockedPositions: number;
  totalMintedOptions: number;
  totalExercisedOptions: number;
  totalValueLocked: string;
};

type Props = {};

const Page = (props: Props) => {
  const [userOptions, setUserOptions] = useState<Option[]>([]);
  const [vaultContract, setVaultContract] = useState<any>(null);
  const [positionManagerContract, setPositionManagerContract] = useState<any>(null);
  const [userPositions, setUserPositions] = useState<Position[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  // Mock function to fetch token info (would be replaced with actual token contract calls)
  const fetchTokenInfo = async (tokenAddress: string): Promise<TokenInfo> => {
    const mockTokens: Record<string, TokenInfo> = {
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": { name: "Wrapped Ether", symbol: "WETH", decimals: 18 },
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": { name: "USD Coin", symbol: "USDC", decimals: 6 },
      "0xdAC17F958D2ee523a2206206994597C13D831ec7": { name: "Tether USD", symbol: "USDT", decimals: 6 },
      "0x6B175474E89094C44Da98b954EedeAC495271d0F": { name: "Dai Stablecoin", symbol: "DAI", decimals: 18 },
    };

    return mockTokens[tokenAddress] || { name: "Unknown Token", symbol: "UNK", decimals: 18, address: tokenAddress };
  };

  // Fetch user's Uniswap V3 positions
//   const fetchUserPositions = async (userAccount: string, positionManagerContract: any) => {
//     try {
//     //   const balance = await positionManagerContract.balanceOf(userAccount);

//     //   const positions: Position[] = [];
//     //   for (let i = 0; i < balance.toNumber(); i++) {
//     //     const tokenId = await positionManagerContract.tokenOfOwnerByIndex(userAccount, i);
//     //     const position = await positionManagerContract.positions(tokenId);

//     //     const token0 = await fetchTokenInfo(position.token0);
//     //     const token1 = await fetchTokenInfo(position.token1);

//         positions.push({
//           tokenId: tokenId.toString(),
//           token0,
//           token1,
//           fee: position.fee,
//           tickLower: position.tickLower,
//           tickUpper: position.tickUpper,
//           liquidity: position.liquidity.toString(),
//         });
//     //   }

//       setUserPositions(positions);
//     } catch (error) {
//       console.error("Error fetching user positions:", error);
//     }
//   };

const fetchUserPositions = async () => {
  try {
    // Mock data for positions
    const mockPositions: Position[] = [
      {
        tokenId: "1",
        token0: { name: "Wrapped Ether", symbol: "WETH", decimals: 18 },
        token1: { name: "USD Coin", symbol: "USDC", decimals: 6 },
        fee: 3000,
        tickLower: -887220,
        tickUpper: 887220,
        liquidity: "1000000000000000000",
      },
      {
        tokenId: "2",
        token0: { name: "Dai Stablecoin", symbol: "DAI", decimals: 18 },
        token1: { name: "Tether USD", symbol: "USDT", decimals: 6 },
        fee: 500,
        tickLower: -50000,
        tickUpper: 50000,
        liquidity: "500000000000000000",
      },
    ];

    // Simulate fetching positions
    setUserPositions(mockPositions);
  } catch (error) {
    console.error("Error fetching user positions:", error);
  }
};

  // Fetch transaction history
  const fetchTransactionHistory = async () => {
    try {
      const mockTransactions: Transaction[] = [
        {
          id: "0x123...",
          type: "MINT",
          positionId: "123456",
          optionType: "CALL",
          asset: "WETH",
          timestamp: Date.now() - 3600000,
          user: "0xabcd...",
        },
        {
          id: "0x456...",
          type: "EXERCISE",
          positionId: "123456",
          optionType: "PUT",
          asset: "USDC",
          timestamp: Date.now() - 7200000,
          user: "0xefgh...",
        },
      ];

      setTransactions(mockTransactions);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  // Fetch platform statistics
  const fetchStatistics = async () => {
    try {
      const mockStatistics: Statistics = {
        totalLockedPositions: 15,
        totalMintedOptions: 42,
        totalExercisedOptions: 12,
        totalValueLocked: "1250000",
      };

      setStatistics(mockStatistics);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  // Fetch user's minted options
  const fetchUserOptions = async () => {
    try {
      const mockOptions: Option[] = [
        {
          id: 1,
          optionType: "CALL",
          assetSymbol: "WETH",
          positionId: "123456",
          strike: 2000,
          expiry: Math.floor(Date.now() / 1000) + 86400,
          amount: 1.5,
          status: "ACTIVE",
        },
        {
          id: 2,
          optionType: "PUT",
          assetSymbol: "USDC",
          positionId: "123456",
          strike: 1.0,
          expiry: Math.floor(Date.now() / 1000) + 43200,
          amount: 2000,
          status: "ACTIVE",
        },
      ];

      setUserOptions(mockOptions);
    } catch (error) {
      console.error("Error fetching user options:", error);
    }
  };

  // Fetch user data (positions and options)
  const fetchUserData = async () => {
    // if (!userAccount || !vaultContract || !positionManagerContract) return;

    try {
      await fetchUserPositions();
      await fetchUserOptions();
      await fetchTransactionHistory();
      await fetchStatistics();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Exercise options function
  const exerciseOptions = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Option exercised successfully!");
    } catch (error) {
      console.error("Error exercising options:", error);
    }
  };


  useEffect(() => {
    fetchUserData()
  }, [])
  

  return (
    <div className=" rounded-lg bg-[#0b0f18] min-h-screen shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Exercise Options</h2>
      {/* <OptionsExerciser options={userOptions} exerciseOptions={exerciseOptions} isLoading={false} /> */}
    </div>
  );
};

export default Page;