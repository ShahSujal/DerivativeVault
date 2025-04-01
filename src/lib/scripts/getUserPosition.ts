import { getAccount, getBalance, readContract } from "@wagmi/core";
import { Address, formatUnits } from "viem";
import { config } from "../providers/wagmi.config";
import { env } from "../../../env";
import { derivativeVaultContractAbi } from "../constants/abi/derivativeVaultContractAbi";
import { uniswapV3PositionManagerAbi } from "../constants/abi/uniswapV3PositionManagerAbi";
import { TPosition } from "@/types/type";
import { uniswapV3Abi } from "../constants/abi/uniswapv3abi";


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

    const {symbol:token0Symbol, decimals:token0Decimal} = await getBalance(config,{
        address: address as Address,
        chainId: 11155111,
        token: position[2] as Address,
    })
    const {symbol:token1Symbol, decimals:token1Decimal} = await getBalance(config,{
        address: address as Address,
        chainId: 11155111,
        token: position[3] as Address,
    })
    

  const positionData = {
    positionId: Number(tokenId),
    nonce: position[0],
    operator: position[1],
    token0: position[2],
    token0Symbol: token0Symbol,
    token1: position[3],
    token1Symbol: token1Symbol,
    fee: position[4],
    tickLower: position[5],
    tickUpper: position[6],
    liquidity: position[7],
    feeGrowthInside0LastX128: position[8],
    feeGrowthInside1LastX128: position[9],
    tokensOwed0: position[10],
    tokensOwed1: position[11],
    token0Decimal: token0Decimal,
    token1Decimal: token1Decimal
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
