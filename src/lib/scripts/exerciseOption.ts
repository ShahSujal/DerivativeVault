import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { config } from "../providers/wagmi.config";
import { derivativeVaultContractAbi } from "../constants/abi/derivativeVaultContractAbi";
import { env } from "../../../env";
import { Address, erc20Abi, parseUnits } from "viem";
import { EReciptStatus } from "@/types/enum";
import { ethers, EventLog } from "ethers";

export async function exerciseOption({
  userAddress,
  assetToken,
  amount,
}: {
  userAddress: Address;
  assetToken: Address;
  amount: string;
}): Promise<{
  status: EReciptStatus;
  message: string;
  earnings?: string;
}> {
  try {
    // const { request: approveTokenRequest } = await simulateContract(config, {
    //   address: assetToken,
    //   abi: erc20Abi,
    //   functionName: "approve",
    //   args: [
    //     env.NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS,
    //     parseUnits(amount, 18),
    //   ],
    // });

    // // Write the contract transaction
    // const approvehash = await writeContract(config, approveTokenRequest);

    // // Wait for the transaction receipt
    // const approvereceipt = await waitForTransactionReceipt(config, {
    //   hash: approvehash,
    //   confirmations: 10,
    // });

    // if (approvereceipt.status === EReciptStatus.REVERTED) {
    //   return {
    //     status: EReciptStatus.REVERTED,
    //     message: "Failed To Approve Token",
    //   };
    // }
    // Simulate the contract call
    const { request } = await simulateContract(config, {
      address: env.NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS,
      abi: derivativeVaultContractAbi,
      functionName: "exerciseOption",
      args: [userAddress, parseUnits(amount, 18)],
    });

    // Write the contract transaction
    const hash = await writeContract(config, request);

    // Wait for the transaction receipt
    const receipt = await waitForTransactionReceipt(config, {
      hash: hash,
      confirmations: 10,
    });

    // Check if the transaction was successful
    if (receipt.status === EReciptStatus.SUCCESS) {
      if (receipt.logs.length > 0) {
        const eventLogs = receipt.logs as unknown as EventLog[];

        const provider = new ethers.JsonRpcProvider(
          env.NEXT_PUBLIC_SEPOLIA_RPC
        );

        // Iterate through logs to find the "OptionExercised" event
        for (const log of eventLogs) {
          if (log.eventName === "OptionExercised") {
            const rpcContract = new ethers.Contract(
              env.NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS as Address,
              derivativeVaultContractAbi,
              provider
            );

            const decodedLog = rpcContract.interface.parseLog({
              topics: log.topics,
              data: log.data,
            });

            if (decodedLog && decodedLog.args) {
              const earnings = ethers.formatUnits(decodedLog.args[0], 18);

              return {
                status: EReciptStatus.SUCCESS,
                message: "Option exercised successfully",
                earnings,
              };
            }
          }
        }
      }

      return {
        status: EReciptStatus.SUCCESS,
        message: "Option exercised successfully",
      };
    }

    // Transaction failed
    return {
      status: EReciptStatus.REVERTED,
      message: "Transaction failed",
    };
  } catch (error) {
    console.error("Error exercising option:", error);
    return {
      status: EReciptStatus.REVERTED,
      message: "Transaction failed",
    };
  }
}
