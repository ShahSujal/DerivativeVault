import { readContract } from "@wagmi/core"
import { Address } from "viem"
import { config } from "../providers/wagmi.config"
import { env } from "../../../env"
import { derivativeVaultContractAbi } from "../constants/abi/derivativeVaultContractAbi"

export const getUserExercise = async(walletAddress:Address)=>{
    const searchUserExerciseData = await readContract(config,{
        address:env.NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS,
        abi:derivativeVaultContractAbi,
        functionName:"getUserExercises",
        args:[walletAddress]
    })

    return searchUserExerciseData
}