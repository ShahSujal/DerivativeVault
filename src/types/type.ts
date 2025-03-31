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
  tokenId: bigint;
  token0: string;
  token1: string;
  fee: number;
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
  tokensOwed0: string;
  tokensOwed1: string;
};
// : readonly [`0x${string}`, `0x${string}`, bigint, bigint, boolean, boolean, bigint]

export type TDerivativeInfo = {
  derivativeToken: string;
  collateralAsset: string;
  exercisePrice: string;
  expiryTime: Date;
  isBuyOption: boolean;
  exercised: boolean;
  collateralAmount: string;
};
