import { getAccount, readContract } from "@wagmi/core";
import { Address, formatUnits } from "viem";
import { config } from "../providers/wagmi.config";
import { env } from "../../../env";
import { derivativeVaultContractAbi } from "../constants/abi/derivativeVaultContractAbi";
import { uniswapV3PositionManagerAbi } from "../constants/abi/uniswapV3PositionManagerAbi";
import { TPosition } from "@/types/type";
import { uniswapV3Abi } from "../constants/abi/uniswapv3abi";

// Helper function to fetch token IDs from TheGraph
async function fetchTokenIdsFromGraph(
  walletAddress: string
): Promise<bigint[]> {
  try {
    // This is a placeholder for TheGraph API call
    // In a real application, you would query the Uniswap subgraph to get positions
    // Example query:
    /*
      const query = `
        {
          positions(where: {owner: "${userAddress.toLowerCase()}"}) {
            id
          }
        }
      `;
      const response = await fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      return data.data.positions.map(position => BigInt(position.id));
      */

    // For now, we'll return a range of potential token IDs (1-100)
    // You should replace this with actual token IDs from your application
    return Array.from({ length: 100 }, (_, i) => BigInt(i + 1));
  } catch (error) {
    console.error("Error fetching token IDs from TheGraph:", error);
    return [];
  }
}

const getUserPositionByIndex = async (address: Address, index: number) => {
  const tokenId = await readContract(config, {
    address: env.NEXT_PUBLIC_UNISWAPV3_FACTORY_CONTRACT_ADDRESS,
    abi: uniswapV3Abi,
    functionName: "tokenOfOwnerByIndex",
    args: [address, BigInt(index)],
  });

  const position = await readContract(config, {
    address: env.NEXT_PUBLIC_UNISWAPV3_FACTORY_CONTRACT_ADDRESS,
    abi: uniswapV3Abi,
    functionName: "positions",
    args: [tokenId],
  });
  const positionData = {
    nonce: position[0],
    operator: position[1],
    token0: position[2],
    token1: position[3],
    fee: position[4],
    tickLower: position[5],
    tickUpper: position[6],
    liquidity: position[7],
    feeGrowthInside0LastX128: position[8],
    feeGrowthInside1LastX128: position[9],
    tokensOwed0: position[10],
    tokensOwed1: position[11],
  };
  return positionData;
};

export const getUserPositions = async (address: Address) => {
  try {
    const TotalPositions = await readContract(config, {
      address: env.NEXT_PUBLIC_UNISWAPV3_FACTORY_CONTRACT_ADDRESS,
      chainId: 11155111,
      abi: uniswapV3Abi,
      functionName: "balanceOf",
      args: [address],
    });

    const totalPositions = Number(TotalPositions);

    console.log(totalPositions);

    if (totalPositions > 0) {
      const positions = await Promise.all(
        Array.from({ length: totalPositions }, (_, i) =>
          getUserPositionByIndex(address, i)
        )
      );
      return {
        totalPositions: totalPositions,
        positions: positions,
      };
    } else {
      return {
        totalPositions: 0,
        positions: [] as TPosition[],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      totalPositions: 0,
      positions: [] as TPosition[],
    };
  }
};
