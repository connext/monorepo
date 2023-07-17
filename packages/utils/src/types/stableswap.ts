import { Type, Static } from "@sinclair/typebox";

import { TIntegerString } from "./primitives";

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
  balances: Type.Array(Type.Number()),
  fee: Type.Number(),
  blockNumber: Type.Number(),
  transactionHash: Type.String(),
  timestamp: Type.Number(),
  nonce: Type.Number(),
});
export type StableSwapExchange = Static<typeof StableSwapExchangeSchema>;

export const PoolActionType = {
  Add: "Add",
  Remove: "Remove",
} as const;
export type PoolActionType = (typeof PoolActionType)[keyof typeof PoolActionType];

export const StableSwapPoolEventSchema = Type.Object({
  id: Type.String(),
  poolId: Type.String(),
  domain: Type.String(),
  provider: Type.String(),
  action: Type.Enum(PoolActionType),
  pooledTokens: Type.Array(Type.String()),
  poolTokenDecimals: Type.Array(Type.Number()),
  tokenAmounts: Type.Array(Type.Number()),
  balances: Type.Array(Type.Number()),
  lpTokenAmount: Type.Number(),
  lpTokenSupply: Type.Number(),
  fees: Type.Array(Type.Number()),
  blockNumber: Type.Number(),
  transactionHash: Type.String(),
  timestamp: Type.Number(),
  nonce: Type.Number(),
});
export type StableSwapPoolEvent = Static<typeof StableSwapPoolEventSchema>;

export const StableSwapTransferSchema = Type.Object({
  id: Type.String(),
  poolId: Type.String(),
  domain: Type.String(),
  lpToken: Type.String(),
  fromAddress: Type.String(),
  toAddress: Type.String(),
  pooledTokens: Type.Array(Type.String()),
  balances: Type.Array(Type.Number()),
  amount: Type.Number(),
  blockNumber: Type.Number(),
  transactionHash: Type.String(),
  timestamp: Type.Number(),
  nonce: Type.Number(),
});
export type StableSwapTransfer = Static<typeof StableSwapTransferSchema>;

export const StableSwapLpBalanceSchema = Type.Object({
  poolId: Type.String(),
  domain: Type.String(),
  lpToken: Type.String(),
  provider: Type.String(),
  balance: Type.Number(),
  lastTimestamp: Type.Number(),
});
export type StableSwapLpBalance = Static<typeof StableSwapLpBalanceSchema>;
