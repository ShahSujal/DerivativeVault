import { TOptionDetails } from "@/types/type";
import { getAccount, readContract } from "@wagmi/core";
import { config } from "../providers/wagmi.config";
import { env } from "../../../env";
import { derivativeVaultContractAbi } from "../constants/abi/derivativeVaultContractAbi";
import { zeroAddress } from "viem";

export async function getUserOptions(): Promise<TOptionDetails[]> {
  //   const derivativeTokenAddress = await derivativeVault.getUserDerivativeToken(userAddress);

  const { address } = await getAccount(config);
  if (!address) {
    return [] as TOptionDetails[];
  }
  const derivativeTokenAddress = await readContract(config, {
    address: env.NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS,
    abi: derivativeVaultContractAbi,
    functionName: "getUserDerivativeToken",
    args: [address],
  });

  if (derivativeTokenAddress === zeroAddress) {
    return [] as TOptionDetails[];
  }

  const optionDetails = await readContract(config, {
    address: env.NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS,
    abi: derivativeVaultContractAbi,
    functionName: "derivativeRecords",
    args: [derivativeTokenAddress],
  });

  
  return [{
    derivativeToken: optionDetails[0],
    collateralAsset: optionDetails[1],
    exercisePrice: optionDetails[2].toString(),
    expiryTime: Number(optionDetails[3]),
    isBuyOption: optionDetails[4],
    exercised: optionDetails[5],
    collateralAmount: optionDetails[6].toString()
  }]
}
