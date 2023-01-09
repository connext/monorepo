import { Type } from "@sinclair/typebox";
import { XTransferStatus } from "@connext/nxtp-utils";

export const getCanonicalTokenIdSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});

export const calculateCanonicalKeySchema = Type.Object({
  domainId: Type.String(),
  tokenId: Type.String(),
});

export const getLPTokenAddressSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});

export const getLPTokenSupplySchema = Type.Object({
  domainId: Type.String(),
  lpTokenAddress: Type.String(),
});

export const getTokenUserBalanceSchema = Type.Object({
  domainId: Type.String(),
  lpTokenAddress: Type.String(),
  userAddress: Type.String(),
});

export const getPoolTokenIndexSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  poolTokenAddress: Type.String(),
});

export const getPoolTokenBalanceSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  poolTokenAddress: Type.String(),
});

export const getPoolTokenAddressSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  index: Type.Number(),
});

export const getVirtualPriceSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});

export const calculateSwapSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  tokenIndexFrom: Type.Number(),
  tokenIndexTo: Type.Number(),
  amount: Type.String(),
});

export const calculateTokenAmountSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amounts: Type.Array(Type.String()),
  isDeposit: Type.Optional(Type.Boolean()),
});

export const calculateRemoveSwapLiquiditySchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amount: Type.String(),
});

export const calculateAddLiquidityPriceImpactSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amountX: Type.String(),
  amountY: Type.String(),
});

export const calculateRemoveLiquidityPriceImpactSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amountX: Type.String(),
  amountY: Type.String(),
});

export const calculateSwapPriceImpactSchema = Type.Object({
  domainId: Type.String(),
  amountX: Type.String(),
  tokenX: Type.String(),
  tokenY: Type.String(),
});

export const calculateAmountReceivedSchema = Type.Object({
  originDomain: Type.String(),
  destinationDomain: Type.String(),
  originTokenAddress: Type.String(),
  amount: Type.String(),
  receiveLocal: Type.Optional(Type.Boolean()),
});

export const getTokenPriceSchema = Type.Object({
  tokenSymbol: Type.String(),
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
  tokenAddress: Type.String(),
  amounts: Type.Array(Type.String()),
  deadline: Type.Optional(Type.Number()),
  estimateGas: Type.Optional(Type.Boolean()),
});

export const removeLiquiditySchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amount: Type.String(),
  deadline: Type.Optional(Type.Number()),
  estimateGas: Type.Optional(Type.Boolean()),
});

export const swapSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
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

export const calculateCanonicalHashSchema = Type.Object({
  canonicalId: Type.String(),
  canonicalDomain: Type.String(),
});

export const getTransfersByUserSchema = Type.Object({
  params: Type.Object({
    userAddress: Type.String(),
    status: Type.Optional(Type.Enum(XTransferStatus)),
    range: Type.Optional(
      Type.Object({
        limit: Type.Optional(Type.Number()),
        offset: Type.Optional(Type.Number()),
      }),
    ),
  }),
});

export const getTransfersByStatusSchema = Type.Object({
  params: Type.Object({
    status: Type.Enum(XTransferStatus),
    range: Type.Optional(
      Type.Object({
        limit: Type.Optional(Type.Number()),
        offset: Type.Optional(Type.Number()),
      }),
    ),
  }),
});

export const getTransfersByRouterSchema = Type.Object({
  params: Type.Object({
    routerAddress: Type.String(),
    status: Type.Optional(Type.Enum(XTransferStatus)),
    range: Type.Optional(
      Type.Object({
        limit: Type.Optional(Type.Number()),
        offset: Type.Optional(Type.Number()),
      }),
    ),
  }),
});

export const getTransfersByIdSchema = Type.Object({
  transferId: Type.String(),
});

export const getTransfersByTransactionHashSchema = Type.Object({
  transactionHash: Type.String(),
});

export const getTransfersSchema = Type.Object({
  params: Type.Object({
    range: Type.Optional(
      Type.Object({
        limit: Type.Optional(Type.Number()),
        offset: Type.Optional(Type.Number()),
      }),
    ),
  }),
});

export const getBlockNumberFromUnixTimestampSchema = Type.Object({
  domainId: Type.String(),
  unixTimestamp: Type.Number(),
});

export const getYieldStatsForDaySchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  unixTimestamp: Type.Number(),
});

export const getYieldDataSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  days: Type.Optional(Type.Number()),
});

export const addLiquidityForRouterSchema = Type.Object({
  params: Type.Object({
    domainId: Type.String(),
    amount: Type.String(),
    tokenAddress: Type.String(),
    router: Type.String(),
  }),
});

export const removeRouterLiquiditySchema = Type.Object({
  params: Type.Object({
    domainId: Type.String(),
    amount: Type.String(),
    tokenAddress: Type.String(),
    recipient: Type.String(),
  }),
});
