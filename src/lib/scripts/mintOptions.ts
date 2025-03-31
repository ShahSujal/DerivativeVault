// import { simulateContract } from "viem/actions";
import { config } from "../providers/wagmi.config";
import { env } from "../../../env";
import { derivativeVaultContractAbi } from "../constants/abi/derivativeVaultContractAbi";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { Address, parseUnits } from "viem";
import { EReciptStatus } from "@/types/enum";

export async function mintOptions(
  collateralAsset: Address,
  exercisePrice: string,
  expiryTimeInHours: number,
  isBuyOption: boolean,
  issueAmount: string
): Promise<{
  status: EReciptStatus;
  message: string;
  explorerHash?: string;
}> {
  try {
    const expiryTime =
      Math.floor(Date.now() / 1000) + expiryTimeInHours * 60 * 60;

    const { request } = await simulateContract(config, {
      address: env.NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS,
      abi: derivativeVaultContractAbi,
      functionName: "generateOptions",
      args: [
        collateralAsset,
        parseUnits(exercisePrice, 18), // Adjust decimals based on asset
        BigInt(expiryTime),
        isBuyOption,
        parseUnits(issueAmount, 18), // Adjust decimals based on asset
      ],
    });

    const hash = await writeContract(config, request);

    const receipt = await waitForTransactionReceipt(config, {
      hash: hash,
      confirmations: 10,
    });

    if (receipt.status == "success") {
      return{
        status: EReciptStatus.SUCCESS,
        message: "Transaction failed",
        explorerHash:hash
      };
    } else {
      return{
        status: EReciptStatus.REVERTED,
        message: "Transaction failed",
      };
    }
  } catch (error) {
    console.error("Error minting options:", error);
    return {
      status: EReciptStatus.REVERTED,
      message: "Transaction failed",
    };
  }
}
