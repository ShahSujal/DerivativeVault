import { Address } from "viem";
import { getPoolAddress } from "./getSevenDaysPoolPrice";
import { readContract } from "@wagmi/core";
import { config } from "../providers/wagmi.config";

const SLOT0_ABI = [
  {
    inputs: [],
    name: "slot0",
    outputs: [
      { internalType: "uint160", name: "sqrtPriceX96", type: "uint160" },
      { internalType: "int24", name: "tick", type: "int24" },
      { internalType: "uint16", name: "observationIndex", type: "uint16" },
      {
        internalType: "uint16",
        name: "observationCardinality",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "observationCardinalityNext",
        type: "uint16",
      },
      { internalType: "uint8", name: "feeProtocol", type: "uint8" },
      { internalType: "bool", name: "unlocked", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function sqrtPriceX96ToPrice(
  sqrtPriceX96: bigint,
  decimals0 = 18,
  decimals1 = 18
) {
  const Q96 = BigInt(2) ** BigInt(96);
  const priceX192 = BigInt(sqrtPriceX96) * BigInt(sqrtPriceX96);

  const priceX96 = priceX192 / Q96;
  const scaleFactor = BigInt(10) ** BigInt(decimals0 - decimals1);

  return Number(priceX96 * scaleFactor) / Number(Q96);
}

export const getPoolPriceByTokenAddress = async ({
  feeTier,
  tokenA,
  tokenB,
}: {
  tokenA: Address;
  tokenB: Address;
  feeTier: number;
}) => {
  const poolAddress = await getPoolAddress({
    feeTier: feeTier,
    tokenA: tokenA,
    tokenB: tokenB,
  });

  const slot0 = await readContract(config, {
    address: poolAddress,
    abi: SLOT0_ABI,
    functionName: "slot0",
  });

  const sqrtPriceX96 = slot0[0];

  const price = await sqrtPriceX96ToPrice(sqrtPriceX96);
  return price;
};
