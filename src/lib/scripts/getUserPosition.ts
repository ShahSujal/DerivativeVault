import { getAccount, readContract } from "@wagmi/core";
import { formatUnits } from "viem";
import { config } from "../providers/wagmi.config";
import { env } from "../../../env";
import { derivativeVaultContractAbi } from "../constants/abi/derivativeVaultContractAbi";
import { uniswapV3PositionManagerAbi } from "../constants/abi/uniswapV3PositionManagerAbi";
import { TPosition } from "@/types/type";




// Helper function to fetch token IDs from TheGraph
async function fetchTokenIdsFromGraph(
  walletAddress: string,
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

export const getUserPositions = async () => {
  const { address } = await getAccount(config);

  if (!address) {
    return {
      status: "Reverted",
    };
  }

//   const liquidityManagerAddress = await readContract(config, {
//     address: env.NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS,
//     abi: derivativeVaultContractAbi,
//     functionName: "liquidityManager",
//   });

  const userDerivativeToken = await readContract(config, {
    address: env.NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS,
    abi: derivativeVaultContractAbi,
    functionName: "getUserDerivativeToken",
    args: [address],
  });

  // Get derivative records
  const derivativeRecords = await readContract(config, {
    address: env.NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS,
    abi: derivativeVaultContractAbi,
    functionName: "derivativeRecords",
    args: [userDerivativeToken],
  });

  const idsToCheck = await fetchTokenIdsFromGraph(
    address,
  );

  const userPositions: TPosition[] = [];

  for (const tokenId of idsToCheck) {
    try {
      const positionData = await readContract(config, {
        address:
          env.NEXT_PUBLIC_MOCKUNISWAPV3POSITIONMANAGER_CONTRACT_ADDRESS as `0x${string}`,
        abi: uniswapV3PositionManagerAbi,
        functionName: "positions",
        args: [tokenId],
      });

      const [
        nonce,
        operator,
        token0,
        token1,
        fee,
        tickLower,
        tickUpper,
        liquidity,
        feeGrowthInside0LastX128,
        feeGrowthInside1LastX128,
        tokensOwed0,
        tokensOwed1,
      ] = positionData as unknown as [
        bigint,
        string,
        string,
        string,
        number,
        number,
        number,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ];

      // Check if the position belongs to the user
      if (operator.toLowerCase() === address.toLowerCase()) {
        const position: TPosition = {
          tokenId,
          token0,
          token1,
          fee,
          tickLower,
          tickUpper,
          liquidity,
          tokensOwed0: formatUnits(tokensOwed0, 18),
          tokensOwed1: formatUnits(tokensOwed1, 18),
        };

        userPositions.push(position);
      }

      return userPositions;
    } catch (err) {
      console.log(`Token ID ${tokenId} not found or does not belong to user`);
      // Continue to the next token ID
    }
  }
};
