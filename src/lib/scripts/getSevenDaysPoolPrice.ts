import { readContract } from "@wagmi/core";
import { Address } from "viem";
import { config } from "../providers/wagmi.config";
import { ethers } from "ethers";
import { env } from "../../../env";

// Factory Contract ABI (Only `getPool` function)
const UNISWAP_V3_FACTORY_ABI = [
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint24", name: "", type: "uint24" },
    ],
    name: "getPool",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

const UNISWAP_SWAP_TRANSACTION_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "amount0",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "amount1",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "uint160",
        name: "sqrtPriceX96",
        type: "uint160",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "liquidity",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "int24",
        name: "tick",
        type: "int24",
      },
    ],
    name: "Swap",
    type: "event",
  },
];


export const getPoolAddress = async({
    tokenA,
    tokenB,
    feeTier,
  }: {
    tokenA: Address;
    tokenB: Address;
    feeTier: number;
  })=>{
    
    const poolAddress = await readContract(config, {
        address: "0x0227628f3F023bb0B980b67D528571c95c6DaC1c",
        abi: UNISWAP_V3_FACTORY_ABI,
        functionName: "getPool",
        args: [tokenA, tokenB, feeTier],
      });
  
      console.log(poolAddress);
      
      return poolAddress
}

export const getSevenDaysPoolPrice = async ({
  tokenA,
  tokenB,
  feeTier,
}: {
  tokenA: Address;
  tokenB: Address;
  feeTier: number;
}) => {
  try {
    const provider = new ethers.JsonRpcProvider(env.NEXT_PUBLIC_SEPOLIA_RPC);


    const poolAddress = await getPoolAddress({
        feeTier: feeTier,
        tokenA: tokenA,
        tokenB: tokenB
    })

    return poolAddress
    // const contract = new ethers.Contract(
    //   poolAddress,
    //   UNISWAP_SWAP_TRANSACTION_ABI,
    //   provider
    // );

    // const latestBlock = await provider.getBlockNumber();
    // const sevenDaysAgoBlock = latestBlock - 42000; // Approximate blocks in 7 days

    // const events = await contract.queryFilter(
    //   "Swap",
    //   sevenDaysAgoBlock,
    //   latestBlock
    // );

    // // Process event data
    // const priceHistory = events.map((event) => {
    //   const timestamp = event.blockNumber;

    //   console.log(events);

    //   //   const price = sqrtPriceX96ToPrice(event.topics);
    //   //   return { timestamp, price: price.toFixed(6) };
    // });

    // return priceHistory.reverse(); // Return from oldest to newest
  } catch (error) {
    console.error("Error fetching Uniswap price history:", error);
    return [];
  }
};
