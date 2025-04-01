import {
  getAccount,
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { config } from "../providers/wagmi.config";
import { env } from "../../../env";
import { uniswapV3PositionManagerAbi } from "../constants/abi/uniswapV3PositionManagerAbi";
import { EReciptStatus } from "@/types/enum";
import { ethers, EventLog } from "ethers";
import { derivativeVaultContractAbi } from "../constants/abi/derivativeVaultContractAbi";
import { Address } from "viem";
import { uniswapV3Abi } from "../constants/abi/uniswapv3abi";

export const lockPosition = async ({
  positionId,
  deadline,
}: {
  positionId: number;
  deadline: number;
}): Promise<{
  status: EReciptStatus;
  message: string;
}> => {
  try {
    const positionData = await readContract(config, {
      address:
        env.NEXT_PUBLIC_MOCKUNISWAPV3POSITIONMANAGER_CONTRACT_ADDRESS as `0x${string}`,
      abi: uniswapV3PositionManagerAbi,
      functionName: "positions",
      args: [BigInt(positionId)],
    });

    const position = {
      nonce: positionData[0],
      operator: positionData[1],
      token0: positionData[2],
      token1: positionData[3],
      fee: positionData[4],
      tickLower: positionData[5],
      tickUpper: positionData[6],
      liquidity: positionData[7],
      feeGrowthInside0LastX128: positionData[8],
      feeGrowthInside1LastX128: positionData[9],
      tokensOwed0: positionData[10],
      tokensOwed1: positionData[11],
    };

    if (Number(position.liquidity) > 0) {
      const { request: nftrequest } = await simulateContract(config, {
        address: env.NEXT_PUBLIC_MOCKUNISWAPV3POSITIONMANAGER_CONTRACT_ADDRESS,
        abi: uniswapV3Abi,
        functionName: "approve",
        args: [
          env.NEXT_PUBLIC_MOCKUNISWAPV3POSITIONMANAGER_CONTRACT_ADDRESS,
          BigInt(positionId),
        ],
      });

      const nfthash = await writeContract(config, nftrequest);

      const nftreceipt = await waitForTransactionReceipt(config, {
        hash: nfthash,
        confirmations: 10,
      });

      if (nftreceipt.status == "reverted") {
        return {
          status:EReciptStatus.REVERTED,
          message:"Cannot approve nft"
        }
      }

      const { request } = await simulateContract(config, {
        address:
          env.NEXT_PUBLIC_MOCKUNISWAPV3POSITIONMANAGER_CONTRACT_ADDRESS as `0x${string}`,
        abi: uniswapV3PositionManagerAbi,
        functionName: "decreaseLiquidity",
        args: [positionId, position.liquidity, 0, 0, deadline],
        value: BigInt(0),
      });

      const hash = await writeContract(config, request);

      const receipt = await waitForTransactionReceipt(config, {
        hash: hash,
        confirmations: 10,
      });

      // Check if the transaction was successful
      if (receipt.status !== EReciptStatus.SUCCESS) {
        return {
          status: EReciptStatus.REVERTED,
          message: "Transaction failed",
        };
      }

    //   if (receipt.logs.length > 0) {
    //     const eventLogs = receipt.logs as unknown as EventLog[];

    //     const provider = new ethers.JsonRpcProvider(
    //       env.NEXT_PUBLIC_SEPOLIA_RPC
    //     );

    //     // Iterate through logs to find the "OptionExercised" event
    //     for (const log of eventLogs) {
    //       if (log.eventName === "OptionExercised") {
    //         const rpcContract = new ethers.Contract(
    //           env.NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS as Address,
    //           derivativeVaultContractAbi,
    //           provider
    //         );

    //         const decodedLog = rpcContract.interface.parseLog({
    //           topics: log.topics,
    //           data: log.data,
    //         });

    //         if (decodedLog && decodedLog.args) {
    //           const amount0 = ethers.formatUnits(decodedLog.args[0], 18);

    //           const amount1 = ethers.formatUnits(decodedLog.args[1], 18);

    //           return {
    //             status: EReciptStatus.SUCCESS,
    //             message: "Option exercised successfully",
    //             amount0: amount0,
    //             amount1: amount1,
    //           };
    //         }
    //       }
    //     }
    //   }

    //   // If no relevant event is found
    //   return {
    //     status: EReciptStatus.REVERTED,
    //     message: "Option exercised transaction failed",
    //   };
    //   // Transaction failed
    // } else {
      return {
        status: EReciptStatus.SUCCESS,
        message: "Transaction successful",
      };
    }else{
            return {
        status: EReciptStatus.REVERTED,
        message: "Option Liquidity transaction failed",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: EReciptStatus.REVERTED,
      message: "Transaction failed",
    };
  }

  // 3. Collect all tokens
};
