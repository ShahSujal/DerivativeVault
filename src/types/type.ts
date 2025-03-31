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
  nonce: bigint;
  operator: `0x${string}`;
  token0: `0x${string}`;
  token1: `0x${string}`;
  fee: number;
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
  feeGrowthInside0LastX128: bigint;
  feeGrowthInside1LastX128: bigint;
  tokensOwed0: bigint;
  tokensOwed1: bigint;

//   nonce   uint96 :  0
// operator   address :  0x0000000000000000000000000000000000000000
// token0   address :  0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0
// token1   address :  0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14
// fee   uint24 :  10000
// tickLower   int24 :  -887200
// tickUpper   int24 :  887200
// liquidity   uint128 :  29933427641
// feeGrowthInside0LastX128   uint256 :  7102819458208913550344462361960394408
// feeGrowthInside1LastX128   uint256 :  1825507333493655880775965138114502414238213
// tokensOwed0   uint128 :  0
// tokensOwed1   uint128 :  0


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
