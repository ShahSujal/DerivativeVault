import { EReciptStatus } from "./enum";

export type TOptionDetails = {
  derivativeToken: string;
  collateralAsset: string;
  exercisePrice: string;
  expiryTime: number;
  isBuyOption: boolean;
  exercised: boolean;
  collateralAmount: string;
};

export type TPosition = {
  positionId: number;
  nonce: bigint;
  operator: `0x${string}`;
  token0: `0x${string}`;
  token0Symbol: string;
  token1: `0x${string}`;
  token1Symbol: string;
  fee: number;
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
  feeGrowthInside0LastX128: bigint;
  feeGrowthInside1LastX128: bigint;
  tokensOwed0: bigint;
  tokensOwed1: bigint;
  token0Decimal: number;
  token1Decimal: number
}

// getPool("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 3000)
export type TDerivativeInfo = {
  derivativeToken: string;
  collateralAsset: string;
  exercisePrice: string;
  expiryTime: Date;
  isBuyOption: boolean;
  exercised: boolean;
  collateralAmount: string;
};


export type TRealTimePriceData = {
  data: Data;
}

export type Data = {
  pools: Pool[];
}

export type Pool = {
  createdAtTimestamp:           string;
  id:                           string;
  sqrtPrice:                    string;
  swaps:                        Swap[];
  token0Price:                  string;
  token1Price:                  string;
  totalValueLockedETH:          string;
  totalValueLockedUSDUntracked: string;
}

export type Swap = {
  amountUSD:    string;
  id:           string;
  recipient:    string;
  sender:       string;
  sqrtPriceX96: string;
  tick:         string;
  timestamp:    string;
}

export type TExerciseData= {
  derivativeToken: `0x${string}`;
  collateralAsset: `0x${string}`;
  exercisePrice: bigint;
  expiryTime: bigint;
  isBuyOption: boolean;
  exercised: boolean;
  collateralAmount: bigint;
  poolAddress: `0x${string}`;
}

export type TCurrentStatus = {
  status: EReciptStatus;
  title: string;
  description: string;
};
