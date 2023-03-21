import { Type } from "@sinclair/typebox";
import { XTransferStatus, XTransferErrorStatus } from "@connext/nxtp-utils";

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

export const getTokenSupplySchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
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

export const calculateRemoveSwapLiquidityOneTokenSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amount: Type.String(),
  index: Type.Number(),
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

export const removeLiquidityOneTokenSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  withdrawTokenAddress: Type.String(),
  amount: Type.String(),
  minAmount: Type.String(),
  deadline: Type.Optional(Type.Number()),
  estimateGas: Type.Optional(Type.Boolean()),
});

export const removeLiquiditySchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amount: Type.String(),
  minAmounts: Type.Array(Type.String()),
  deadline: Type.Optional(Type.Number()),
});

export const removeLiquidityImbalanceSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amounts: Type.Array(Type.String()),
  maxBurnAmount: Type.String(),
  deadline: Type.Optional(Type.Number()),
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
  params: Type.Optional(
    Type.Object({
      userAddress: Type.Optional(Type.String()),
      routerAddress: Type.Optional(Type.String()),
      status: Type.Optional(Type.Enum(XTransferStatus)),
      errorStatus: Type.Optional(Type.Enum(XTransferErrorStatus)),
      transferId: Type.Optional(Type.String()),
      transactionHash: Type.Optional(Type.String()),
      range: Type.Optional(
        Type.Object({
          limit: Type.Optional(Type.Number()),
          offset: Type.Optional(Type.Number()),
        }),
      ),
    }),
  ),
});

export const TSortOrder = Type.Union([Type.Literal("asc"), Type.Literal("desc")]);

export const getRoutersDataSchema = Type.Object({
  params: Type.Optional(
    Type.Object({
      order: Type.Optional(
        Type.Object({
          orderBy: Type.Optional(Type.String()),
          ascOrDesc: Type.Optional(TSortOrder),
        }),
      ),
    }),
  ),
});

export const checkRouterLiquiditySchema = Type.Object({
  domainId: Type.String(),
  asset: Type.String(),
  topN: Type.Optional(Type.Number()),
});

export const getBlockNumberFromUnixTimestampSchema = Type.Object({
  domainId: Type.String(),
  unixTimestamp: Type.Number(),
});

export const getYieldStatsForDaysSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  unixTimestamp: Type.Number(),
  days: Type.Number(),
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

export const removeRouterLiquidityForSchema = Type.Object({
  params: Type.Object({
    domainId: Type.String(),
    amount: Type.String(),
    tokenAddress: Type.String(),
    recipient: Type.String(),
    router: Type.String(),
  }),
});

export const getTokenSwapEventsSchema = Type.Object({
  params: Type.Object({
    key: Type.Optional(Type.String()),
    buyer: Type.Optional(Type.String()),
    transactionHash: Type.Optional(Type.String()),
    range: Type.Optional(
      Type.Object({
        limit: Type.Optional(Type.Number()),
        offset: Type.Optional(Type.Number()),
      }),
    ),
  }),
});

export const getHourlySwapVolumeSchema = Type.Object({
  params: Type.Object({
    key: Type.Optional(Type.String()),
    domainId: Type.Optional(Type.String()),
    startTimestamp: Type.Optional(Type.Number()),
    endTimestamp: Type.Optional(Type.Number()),
    range: Type.Optional(
      Type.Object({
        limit: Type.Optional(Type.Number()),
        offset: Type.Optional(Type.Number()),
      }),
    ),
  }),
});

export const getDailySwapVolumeSchema = Type.Object({
  params: Type.Object({
    key: Type.Optional(Type.String()),
    domainId: Type.Optional(Type.String()),
    startTimestamp: Type.Optional(Type.Number()),
    endTimestamp: Type.Optional(Type.Number()),
    range: Type.Optional(
      Type.Object({
        limit: Type.Optional(Type.Number()),
        offset: Type.Optional(Type.Number()),
      }),
    ),
  }),
});
