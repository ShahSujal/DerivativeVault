// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { isAddress } from "viem";
import { z } from "zod";

export const env = createEnv({
  server: {
    GRAPH_API_KEY: z.string(),
    GRAPH_URL:z.string()

  },
  client: {
      NEXT_PUBLIC_PROJECT_ID: z.string().min(6),
      NEXT_PUBLIC_MOCKRATEORACLE_CONTRACT_ADDRESS: z
        .string()
        .refine((v) => isAddress(v), {
          message: "Invalid address,NEXT_PUBLIC_MOCKRATEORACLE_CONTRACT_ADDRESS",
        }),
      NEXT_PUBLIC_MOCKTOKEN_CONTRACT_ADDRESS: z
        .string()
        .refine((v) => isAddress(v), {
          message: "Invalid address,NEXT_PUBLIC_MOCKTOKEN_CONTRACT_ADDRESS",
        }),
      NEXT_PUBLIC_MOCKUNISWAPV3POSITIONMANAGER_CONTRACT_ADDRESS: z
        .string()
        .refine((v) => isAddress(v), {
          message:
            "Invalid address,NEXT_PUBLIC_MOCKUNISWAPV3POSITIONMANAGER_CONTRACT_ADDRESS",
        }),
      NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS: z
        .string()
        .refine((v) => isAddress(v), {
          message: "Invalid address,NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS",
        }),
        NEXT_PUBLIC_SEPOLIA_RPC: z.string().url(),
        NEXT_PUBLIC_UNISWAPV3_FACTORY_CONTRACT_ADDRESS: z.string().refine((v) => isAddress(v), {
          message: "Invalid address,NEXT_PUBLIC_UNISWAPV3_FACTORY_CONTRACT_ADDRESS",
        }),
        NEXT_PUBLIC_SEPOLIA_UNISWAP: z.string().refine((v) => isAddress(v), {
          message: "Invalid address,NEXT_PUBLIC_SEPOLIA_UNISWAP",
        }),
       
    },

  runtimeEnv: {
      NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
      NEXT_PUBLIC_MOCKRATEORACLE_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_MOCKRATEORACLE_CONTRACT_ADDRESS,
      NEXT_PUBLIC_MOCKTOKEN_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_MOCKTOKEN_CONTRACT_ADDRESS,
      NEXT_PUBLIC_MOCKUNISWAPV3POSITIONMANAGER_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_MOCKUNISWAPV3POSITIONMANAGER_CONTRACT_ADDRESS,
      NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS,
      NEXT_PUBLIC_SEPOLIA_RPC: process.env.NEXT_PUBLIC_SEPOLIA_RPC,
      NEXT_PUBLIC_UNISWAPV3_FACTORY_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_UNISWAPV3_FACTORY_CONTRACT_ADDRESS,
      GRAPH_API_KEY: process.env.GRAPH_API_KEY,
      GRAPH_URL: process.env.GRAPH_URL,
      NEXT_PUBLIC_SEPOLIA_UNISWAP:process.env.NEXT_PUBLIC_SEPOLIA_UNISWAP
  },
});
