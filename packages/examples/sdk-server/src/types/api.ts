import { Type } from "@sinclair/typebox";

export const getCanonicalFromLocalSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});

export const getLPTokenAddressSchema = Type.Object({
  domainId: Type.String(),
  canonicalId: Type.String(),
});

export const getLPTokenUserBalanceSchema = Type.Object({
  domainId: Type.String(),
  lpTokenAddress: Type.String(),
  userAddress: Type.String(),
});

export const getPoolTokenIndexSchema = Type.Object({
  domainId: Type.String(),
  canonicalId: Type.String(),
  tokenAddress: Type.String(),
});

export const getPoolTokenBalanceSchema = Type.Object({
  domainId: Type.String(),
  canonicalId: Type.String(),
  tokenAddress: Type.String(),
});

export const getPoolTokenUserBalanceSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  userAddress: Type.String(),
});

export const getPoolTokenAddressSchema = Type.Object({
  domainId: Type.String(),
  canonicalId: Type.String(),
  index: Type.Number(),
});

export const getVirtualPriceSchema = Type.Object({
  domainId: Type.String(),
  canonicalId: Type.String(),
});

export const calculateSwapSchema = Type.Object({
  domainId: Type.String(),
  canonicalId: Type.String(),
  tokenIndexFrom: Type.Number(),
  tokenIndexTo: Type.Number(),
  amount: Type.String(),
});

export const calculateTokenAmountSchema = Type.Object({
  domainId: Type.String(),
  canonicalId: Type.String(),
  amounts: Type.Array(Type.String()),
  isDeposit: Type.Optional(Type.Boolean()),
});

export const calculateRemoveSwapLiquiditySchema = Type.Object({
  domainId: Type.String(),
  canonicalId: Type.String(),
  amount: Type.String(),
});

export const getPoolSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});

export const getUserPoolsSchema = Type.Object({
  domainId: Type.String(),
  userAddress: Type.String(),
});

export const addLiquiditySchema = Type.Object({
  domainId: Type.String(),
  canonicalId: Type.String(),
  amounts: Type.Array(Type.String()),
  deadline: Type.Optional(Type.Number()),
  estimateGas: Type.Optional(Type.Boolean()),
});

export const removeLiquiditySchema = Type.Object({
  domainId: Type.String(),
  canonicalId: Type.String(),
  amount: Type.String(),
  deadline: Type.Optional(Type.Number()),
  estimateGas: Type.Optional(Type.Boolean()),
});

export const swapSchema = Type.Object({
  domainId: Type.String(),
  canonicalId: Type.String(),
  from: Type.String(),
  to: Type.String(),
  amount: Type.String(),
  deadline: Type.Optional(Type.Number()),
  estimateGas: Type.Optional(Type.Boolean()),
});

export const approveIfNeededSchema = Type.Object({
  domainId: Type.String(),
  assetId: Type.String(),
  amount: Type.String(),
  infiniteApprove: Type.Optional(Type.Boolean()),
});
