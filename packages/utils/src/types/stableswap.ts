import { Type, Static } from "@sinclair/typebox";

import { TAddress, TIntegerString } from "./primitives";

export const StableSwapPoolSchema = Type.Object({
  key: Type.String(),
  domain: Type.String(),
  isActive: Type.Boolean(),
  lpToken: Type.String(),
  initialA: Type.Number(),
  futureA: Type.Number(),
  initialATime: Type.Number(),
  futureATime: Type.Number(),
  swapFee: TIntegerString,
  adminFee: TIntegerString,
  pooledTokens: Type.Array(Type.String()),
  tokenPrecisionMultipliers: Type.Array(TIntegerString),
  poolTokenDecimals: Type.Array(Type.Number()),
  balances: Type.Array(TIntegerString),
  virtualPrice: TIntegerString,
  invariant: TIntegerString,
  lpTokenSupply: TIntegerString,
});
export type StableSwapPool = Static<typeof StableSwapPoolSchema>;

export const StableSwapExchangeSchema = Type.Object({
  id: Type.String(),
  poolId: Type.String(),
  domain: Type.String(),
  buyer: Type.String(),
  boughtId: Type.Number({ minimum: 0 }),
  soldId: Type.Number({ minimum: 0 }),
  tokensSold: Type.Number(),
  tokensBought: Type.Number(),
  blockNumber: Type.Number(),
  transactionHash: Type.String(),
  timestamp: Type.Number(),
});
export type StableSwapExchange = Static<typeof StableSwapExchangeSchema>;

export const StableSwapLPSchema = Type.Object({
  key: Type.String(),
  domain: Type.String(),
  provider: TAddress,
  tokenAmounts: Type.Array(TIntegerString),
});
export type StableSwapLP = Static<typeof StableSwapLPSchema>;
