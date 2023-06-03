import { BigNumber } from "ethers";
import { Type, Static } from "@sinclair/typebox";
import { TAddress, TIntegerString } from "@connext/nxtp-utils";

export type Pool = {
  domainId: string;
  name: string;
  symbol: string; // in the form of <TKN>-next<TKN>
  local: PoolAsset;
  adopted: PoolAsset;
  lpTokenAddress: string;
  canonicalHash: string; // hash of the domain and canonicalId, AKA "key"
  balances: BigNumber[];
  decimals: number[];
  invariant: BigNumber;
  initialA: BigNumber;
  initialATime: number;
  futureA: BigNumber;
  futureATime: number;
  currentA: BigNumber;
  swapFee: string;
  adminFee: string;
  address?: string; // address of the pool contract, no address if internal pool
};

export type PoolAsset = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  index: number;
  balance: BigNumber;
};

export type AssetData = {
  local: string;
  adopted: string;
  canonical_id: string;
  canonical_domain: string;
  domain: string;
  key: string;
  id: string;
};

export type RouterBalance = {
  address: string;
  asset_canonical_id: string;
  asset_domain: string;
  router_address: string;
  balance: number;
  local: string;
  adopted: string;
  canonical_id: string;
  canonical_domain: string;
  domain: string;
  key: string;
  id: string;
  fees_earned: number;
};

export type ConnextSupport = { name: string; chainId: number; domainId: string; assets: string[] };

export const PoolAssetSchema = Type.Object({
  address: Type.String(),
  name: Type.String(),
  symbol: Type.String(),
  decimals: Type.Number(),
  index: Type.Number(),
  balance: TIntegerString,
});

export const PoolSchema = Type.Object({
  domainId: Type.String(),
  name: Type.String(),
  symbol: Type.String(),
  local: PoolAssetSchema,
  adopted: PoolAssetSchema,
  lpTokenAddress: Type.String(),
  canonicalHash: Type.String(),
  balances: Type.Array(TIntegerString),
  decimals: Type.Array(Type.Number()),
  invariant: TIntegerString,
  initialA: TIntegerString,
  initialATime: Type.Number(),
  futureA: TIntegerString,
  futureATime: Type.Number(),
  currentA: TIntegerString,
  swapFee: Type.String(),
  adminFee: Type.String(),
  address: Type.Optional(Type.String()),
});

export const LogSchema = Type.Object({
  blockNumber: Type.Number(),
  blockHash: Type.String(),
  transactionIndex: Type.Number(),
  removed: Type.Boolean(),
  address: Type.String(),
  data: Type.String(),
  topics: Type.Array(Type.String()),
  transactionHash: Type.String(),
  logIndex: Type.Number(),
});
export type LogType = Static<typeof LogSchema>;

export const XTransferErrorStatus = Type.Union([
  Type.Literal("LowSlippage"),
  Type.Literal("LowRelayerFee"),
  Type.Literal("ExecutionError"),
  Type.Literal("NoBidsReceived"),
]);
export type TXTransferErrorStatus = Static<typeof XTransferErrorStatus>;

export const XTransferStatus = Type.Union([
  Type.Literal("XCalled"),
  Type.Literal("Executed"),
  Type.Literal("Reconciled"),
  Type.Literal("CompletedFast"),
  Type.Literal("CompletedSlow"),
]);
export type TXTransferStatus = Static<typeof XTransferStatus>;

/************************************
SDK Shared Types
*************************************/

// getConversionRate
export const SdkGetConversionRateParamsSchema = Type.Object({
  chainId: Type.Number(),
});
export type SdkGetConversionRateParams = Static<typeof SdkGetConversionRateParamsSchema>;

// getProvider
export const SdkGetProviderParamsSchema = Type.Object({
  domainId: Type.String(),
});
export type SdkGetProviderParams = Static<typeof SdkGetProviderParamsSchema>;

// getDeploymentAddress
export const SdkGetDeploymentAddressParamsSchema = Type.Object({
  domainId: Type.String(),
  deploymentName: Type.Enum({
    connext: "connext",
    multisend: "multisend",
    unwrapper: "unwrapper",
    stableSwap: "stableSwap",
  }),
});
export type SdkGetDeploymentAddressParams = Static<typeof SdkGetDeploymentAddressParamsSchema>;

// getConnext
export const SdkGetConnextParamsSchema = Type.Object({
  domainId: Type.String(),
});
export type SdkGetConnextParams = Static<typeof SdkGetConnextParamsSchema>;

// getERC20
export const SdkGetERC20ParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});
export type SdkGetERC20Params = Static<typeof SdkGetERC20ParamsSchema>;

// getChainId
export const SdkGetChainIdParamsSchema = Type.Object({
  domainId: Type.String(),
});
export type SdkGetChainIdParams = Static<typeof SdkGetChainIdParamsSchema>;

// domainToChainName
export const SdkDomainToChainNameParamsSchema = Type.Object({
  domainId: Type.String(),
});
export type SdkDomainToChainNameParams = Static<typeof SdkDomainToChainNameParamsSchema>;

// chainIdToDomain
export const SdkChainIdToDomainParamsSchema = Type.Object({
  chainId: Type.Number(),
});
export type SdkChainIdToDomainParams = Static<typeof SdkChainIdToDomainParamsSchema>;

// domainToChainId
export const SdkDomainToChainIdParamsSchema = Type.Object({
  domainId: Type.Number(),
});
export type SdkDomainToChainIdParams = Static<typeof SdkDomainToChainIdParamsSchema>;

// getBlockNumberFromUnixTimestamp
export const SdkGetBlockNumberFromUnixTimestampParamsSchema = Type.Object({
  domainId: Type.String(),
  unixTimestamp: Type.Number(),
});
export type SdkGetBlockNumberFromUnixTimestampParams = Static<typeof SdkGetBlockNumberFromUnixTimestampParamsSchema>;

// approveIfNeeded
export const SdkApproveIfNeededParamsSchema = Type.Object({
  domainId: Type.String(),
  assetId: Type.String(),
  amount: Type.String(),
  infiniteApprove: Type.Boolean(),
});
export type SdkApproveIfNeededParams = Static<typeof SdkApproveIfNeededParamsSchema>;

// getActiveLiquidity
export const SdkGetActiveLiquidityParamsSchema = Type.Object({
  domain: Type.Optional(Type.String()),
  local: Type.Optional(Type.String()),
});
export type SdkGetActiveLiquidityParams = Static<typeof SdkGetActiveLiquidityParamsSchema>;

// getAssetsDataByDomainAndAddress
export const SdkGetAssetsDataByDomainAndAddressParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});
export type SdkGetAssetsDataByDomainAndAddressParams = Static<typeof SdkGetAssetsDataByDomainAndAddressParamsSchema>;

// getAssetsWithSameCanonical
export const SdkGetAssetsWithSameCanonicalParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});
export type SdkGetAssetsWithSameCanonicalParams = Static<typeof SdkGetAssetsWithSameCanonicalParamsSchema>;

// getAssetsDataByDomainAndKey
export const SdkGetAssetsDataByDomainAndKeyParamsSchema = Type.Object({
  domainId: Type.String(),
  key: Type.String(),
});
export type SdkGetAssetsDataByDomainAndKeyParams = Static<typeof SdkGetAssetsDataByDomainAndKeyParamsSchema>;

// isNextAsset
export const SdkIsNextAssetParamsSchema = Type.Object({
  tokenAddress: Type.String(),
});
export type SdkIsNextAssetParams = Static<typeof SdkIsNextAssetParamsSchema>;

// changeSignerAddress
export const SdkChangeSignerAddressParamsSchema = Type.Object({
  signerAddress: Type.String(),
});
export type SdkChangeSignerAddressParams = Static<typeof SdkChangeSignerAddressParamsSchema>;

// parseConnextTransactionReceipt
export const SdkParseConnextTransactionReceiptParamsSchema = Type.Object({
  to: Type.String(),
  from: Type.String(),
  contractAddress: Type.String(),
  transactionIndex: Type.Number(),
  root: Type.Optional(Type.String()),
  gasUsed: TIntegerString,
  logsBloom: Type.String(),
  blockHash: Type.String(),
  transactionHash: Type.String(),
  logs: Type.Array(LogSchema),
  blockNumber: Type.Number(),
  confirmations: Type.Number(),
  cumulativeGasUsed: TIntegerString,
  effectiveGasPrice: TIntegerString,
  byzantium: Type.Boolean(),
  type: Type.Number(),
  status: Type.Optional(Type.Number()),
});
export type SdkParseConnextTransactionReceiptParams = Static<typeof SdkParseConnextTransactionReceiptParamsSchema>;

// calculateCanonicalKey
export const SdkCalculateCanonicalKeyParamsSchema = Type.Object({
  domainId: Type.String(),
  canonicalId: Type.String(),
});
export type SdkCalculateCanonicalKeyParams = Static<typeof SdkCalculateCanonicalKeyParamsSchema>;

// getCanonicalTokenId
export const SdkGetCanonicalTokenIdParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});
export type SdkGetCanonicalTokenIdParams = Static<typeof SdkGetCanonicalTokenIdParamsSchema>;

/************************************
SDK Base Types
*************************************/

// xCall
export const SdkXCallParamsSchema = Type.Object({
  origin: TIntegerString,
  destination: TIntegerString,
  to: TAddress,
  asset: Type.Optional(TAddress),
  delegate: Type.Optional(TAddress),
  amount: Type.Optional(TIntegerString),
  slippage: Type.Optional(TIntegerString),
  callData: Type.Optional(Type.String()),
  relayerFee: Type.Optional(TIntegerString),
  relayerFeeInTransactingAsset: Type.Optional(Type.String()),
  receiveLocal: Type.Optional(Type.Boolean()),
  wrapNativeOnOrigin: Type.Optional(Type.Boolean()),
  unwrapNativeOnDestination: Type.Optional(Type.Boolean()),
});
export type SdkXCallParams = Static<typeof SdkXCallParamsSchema>;

// bumpTransfer
export const SdkBumpTransferParamsSchema = Type.Object({
  domainId: TIntegerString,
  transferId: Type.String(),
  asset: Type.String(),
  relayerFee: TIntegerString,
});
export type SdkBumpTransferParams = Static<typeof SdkBumpTransferParamsSchema>;

// estimateRelayerFee
export const SdkEstimateRelayerFeeParamsSchema = Type.Object({
  originDomain: TIntegerString,
  destinationDomain: TIntegerString,
  callDataGasAmount: Type.Optional(Type.Integer()),
  priceIn: Type.Optional(Type.Union([Type.Literal("native"), Type.Literal("usd")])),
  isHighPriority: Type.Optional(Type.Boolean()),
  originNativeTokenPrice: Type.Optional(Type.Number()),
  destinationNativeTokenPrice: Type.Optional(Type.Number()),
  destinationGasPrice: Type.Optional(Type.String()),
});
export type SdkEstimateRelayerFeeParams = Static<typeof SdkEstimateRelayerFeeParamsSchema>;

// updateSlippage
export const SdkUpdateSlippageParamsSchema = Type.Object({
  domainId: TIntegerString,
  transferId: Type.String(),
  slippage: TIntegerString,
});
export type SdkUpdateSlippageParams = Static<typeof SdkUpdateSlippageParamsSchema>;

// calculateAmountReceived
export const SdkCalculateAmountReceivedParamsSchema = Type.Object({
  originDomain: Type.String(),
  destinationDomain: Type.String(),
  originTokenAddress: Type.String(),
  amount: Type.String(),
  receiveLocal: Type.Optional(Type.Boolean()),
  checkFastLiquidity: Type.Optional(Type.Boolean()),
});
export type SdkCalculateAmountReceivedParams = Static<typeof SdkCalculateAmountReceivedParamsSchema>;

/************************************
SDK Pool Types
*************************************/

// calculateSwap
export const SdkCalculateSwapParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  tokenIndexFrom: Type.Number(),
  tokenIndexTo: Type.Number(),
  amount: TIntegerString,
});
export type SdkCalculateSwapParams = Static<typeof SdkCalculateSwapParamsSchema>;

// calculateSwapLocal
export const SdkCalculateSwapLocalParamsSchema = Type.Object({
  domainId: Type.String(),
  pool: PoolSchema,
  tokenAddress: Type.String(),
  tokenIndexFrom: Type.Number(),
  tokenIndexTo: Type.Number(),
  amount: TIntegerString,
});
export type SdkCalculateSwapLocalParams = Static<typeof SdkCalculateSwapLocalParamsSchema>;

// getSwapOut
export const SdkGetSwapOutParamsSchema = Type.Object({
  pool: PoolSchema,
  x: TIntegerString,
  xp: Type.Array(TIntegerString),
  tokenIndexFrom: Type.Optional(Type.Number()),
  tokenIndexTo: Type.Optional(Type.Number()),
});
export type SdkGetSwapOutParams = Static<typeof SdkGetSwapOutParamsSchema>;

// scientificToBigInt
export const SdkScientificToBigIntParamsSchema = Type.Object({
  scientificNotationString: Type.String(),
});
export type SdkScientificToBigIntParams = Static<typeof SdkScientificToBigIntParamsSchema>;

// calculateTokenAmount
export const SdkCalculateTokenAmountParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amounts: Type.Array(Type.String()),
  isDeposit: Type.Optional(Type.Boolean()),
});
export type SdkCalculateTokenAmountParams = Static<typeof SdkCalculateTokenAmountParamsSchema>;

// calculateRemoveSwapLiquidity
export const SdkCalculateRemoveSwapLiquidityParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amount: Type.String(),
});
export type SdkCalculateRemoveSwapLiquidityParams = Static<typeof SdkCalculateRemoveSwapLiquidityParamsSchema>;

// calculateRemoveSwapLiquidityOneToken
export const SdkCalculateRemoveSwapLiquidityOneTokenParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amount: Type.String(),
  index: Type.Number(),
});
export type SdkCalculateRemoveSwapLiquidityOneTokenParams = Static<
  typeof SdkCalculateRemoveSwapLiquidityOneTokenParamsSchema
>;

// calculatePriceImpact
export const SdkCalculatePriceImpactParamsSchema = Type.Object({
  tokenInputAmount: TIntegerString,
  tokenOutputAmount: TIntegerString,
  virtualPrice: Type.Optional(TIntegerString),
  isDeposit: Type.Optional(Type.Boolean()),
});
export type SdkCalculatePriceImpactParams = Static<typeof SdkCalculatePriceImpactParamsSchema>;

// calculateAddLiquidityPriceImpact
export const SdkCalculateAddLiquidityPriceImpactParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amountX: Type.String(),
  amountY: Type.String(),
});
export type SdkCalculateAddLiquidityPriceImpactParams = Static<typeof SdkCalculateAddLiquidityPriceImpactParamsSchema>;

// calculateRemoveLiquidityPriceImpact
export const SdkCalculateRemoveLiquidityPriceImpactParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amountX: Type.String(),
  amountY: Type.String(),
});
export type SdkCalculateRemoveLiquidityPriceImpactParams = Static<
  typeof SdkCalculateRemoveLiquidityPriceImpactParamsSchema
>;

// calculateSwapPriceImpact
export const SdkCalculateSwapPriceImpactParamsSchema = Type.Object({
  domainId: Type.String(),
  amountX: Type.String(),
  tokenX: Type.String(),
  tokenY: Type.String(),
});
export type SdkCalculateSwapPriceImpactParams = Static<typeof SdkCalculateSwapPriceImpactParamsSchema>;

// getTokenPrice
export const SdkGetTokenPriceParamsSchema = Type.Object({
  tokenSymbol: Type.String(),
});
export type SdkGetTokenPriceParams = Static<typeof SdkGetTokenPriceParamsSchema>;

// getLPTokenAddress
export const SdkGetLPTokenAddressParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});
export type SdkGetLPTokenAddressParams = Static<typeof SdkGetLPTokenAddressParamsSchema>;

// getTokenSupply
export const SdkGetTokenSupplyParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});
export type SdkGetTokenSupplyParams = Static<typeof SdkGetTokenSupplyParamsSchema>;

// getTokenUserBalance
export const SdkGetTokenUserBalanceParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  userAddress: Type.String(),
});
export type SdkGetTokenUserBalanceParams = Static<typeof SdkGetTokenUserBalanceParamsSchema>;

// getPoolTokenIndex
export const SdkGetPoolTokenIndexParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  poolTokenAddress: Type.String(),
});
export type SdkGetPoolTokenIndexParams = Static<typeof SdkGetPoolTokenIndexParamsSchema>;

// getPoolTokenDecimals
export const SdkGetPoolTokenDecimalsParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  poolTokenAddress: Type.String(),
});
export type SdkGetPoolTokenDecimalsParams = Static<typeof SdkGetPoolTokenDecimalsParamsSchema>;

// getPoolTokenBalance
export const SdkGetPoolTokenBalanceParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  poolTokenAddress: Type.String(),
  index: Type.Optional(Type.Number()),
});
export type SdkGetPoolTokenBalanceParams = Static<typeof SdkGetPoolTokenBalanceParamsSchema>;

// getPoolTokenAddress
export const SdkGetPoolTokenAddressParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  index: Type.Number(),
});
export type SdkGetPoolTokenAddressParams = Static<typeof SdkGetPoolTokenAddressParamsSchema>;

// getVirtualPrice
export const SdkGetVirtualPriceParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});
export type SdkGetVirtualPriceParams = Static<typeof SdkGetVirtualPriceParamsSchema>;

// getRepresentation
export const SdkGetRepresentationParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});
export type SdkGetRepresentationParams = Static<typeof SdkGetRepresentationParamsSchema>;

// getAdopted
export const SdkGetAdoptedParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});
export type SdkGetAdoptedParams = Static<typeof SdkGetAdoptedParamsSchema>;

// getTokenSwapEvents
export const SdkGetTokenSwapEventsParamsSchema = Type.Object({
  key: Type.Optional(Type.String()),
  buyer: Type.Optional(Type.String()),
  transactionHash: Type.Optional(Type.String()),
  startTimestamp: Type.Optional(Type.Number()),
  endTimestamp: Type.Optional(Type.Number()),
  range: Type.Optional(
    Type.Object({
      limit: Type.Optional(Type.Number()),
      offset: Type.Optional(Type.Number()),
    }),
  ),
});
export type SdkGetTokenSwapEventsParams = Static<typeof SdkGetTokenSwapEventsParamsSchema>;

// getPoolData
export const SdkGetPoolDataParamsSchema = Type.Object({
  key: Type.Optional(Type.String()),
  domainId: Type.Optional(Type.String()),
  lpTokenAddress: Type.Optional(Type.String()),
});
export type SdkGetPoolDataParams = Static<typeof SdkGetPoolDataParamsSchema>;

// addLiquidity
export const SdkAddLiquidityParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amounts: Type.Array(Type.String()),
  minToMint: Type.Optional(Type.String()),
  deadline: Type.Optional(Type.Number()),
});
export type SdkAddLiquidityParams = Static<typeof SdkAddLiquidityParamsSchema>;

// removeLiquidityOneToken
export const SdkRemoveLiquidityOneTokenParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  withdrawTokenAddress: Type.String(),
  amount: Type.String(),
  minAmount: Type.Optional(Type.String()),
  deadline: Type.Optional(Type.Number()),
});
export type SdkRemoveLiquidityOneTokenParams = Static<typeof SdkRemoveLiquidityOneTokenParamsSchema>;

// removeLiquidity
export const SdkRemoveLiquidityParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amount: Type.String(),
  minAmounts: Type.Optional(Type.Array(Type.String())),
  deadline: Type.Optional(Type.Number()),
});
export type SdkRemoveLiquidityParams = Static<typeof SdkRemoveLiquidityParamsSchema>;

// removeLiquidityImbalance
export const SdkRemoveLiquidityImbalanceParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  amounts: Type.Array(Type.String()),
  maxBurnAmount: Type.Optional(Type.String()),
  deadline: Type.Optional(Type.Number()),
});
export type SdkRemoveLiquidityImbalanceParams = Static<typeof SdkRemoveLiquidityImbalanceParamsSchema>;

// swap
export const SdkSwapParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  from: Type.String(),
  to: Type.String(),
  amount: Type.String(),
  minDy: Type.Optional(Type.Number()),
  deadline: Type.Optional(Type.Number()),
});
export type SdkSwapParams = Static<typeof SdkSwapParamsSchema>;

// getPool
export const SdkGetPoolParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});
export type SdkGetPoolParams = Static<typeof SdkGetPoolParamsSchema>;

// getUserPools
export const SdkGetUserPoolsParamsSchema = Type.Object({
  domainId: Type.String(),
  userAddress: Type.String(),
});
export type SdkGetUserPoolsParams = Static<typeof SdkGetUserPoolsParamsSchema>;

// getYieldStatsForDays
export const SdkGetYieldStatsForDaysParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  unixTimestamp: Type.Number(),
  days: Type.Number(),
});
export type SdkGetYieldStatsForDaysParams = Static<typeof SdkGetYieldStatsForDaysParamsSchema>;

// calculateYield
export const SdkCalculateYieldParamsSchema = Type.Object({
  feesEarned: Type.Number(),
  principal: Type.Number(),
  days: Type.Number(),
});
export type SdkCalculateYieldParams = Static<typeof SdkCalculateYieldParamsSchema>;

// getYieldData
export const SdkGetYieldDataParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
  days: Type.Optional(Type.Number()),
});
export type SdkGetYieldDataParams = Static<typeof SdkGetYieldDataParamsSchema>;

// getLiquidityMiningAprPerPool
export const SdkGetLiquidityMiningAprPerPoolParamsSchema = Type.Object({
  totalTokens: Type.Number(),
  totalBlocks: Type.Number(),
  numPools: Type.Number(),
  tokenSymbol: Type.String(),
  poolTVL: Type.Number(),
});
export type SdkGetLiquidityMiningAprPerPoolParams = Static<typeof SdkGetLiquidityMiningAprPerPoolParamsSchema>;

// getHourlySwapVolume
export const SdkGetHourlySwapVolumeParamsSchema = Type.Object({
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
});
export type SdkGetHourlySwapVolumeParams = Static<typeof SdkGetHourlySwapVolumeParamsSchema>;

// getDailySwapVolume
export const SdkGetDailySwapVolumeParamsSchema = Type.Object({
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
});
export type SdkGetDailySwapVolumeParams = Static<typeof SdkGetDailySwapVolumeParamsSchema>;

/************************************
SDK Utils Types
*************************************/

export const TSortOrder = Type.Union([Type.Literal("asc"), Type.Literal("desc")]);

export const TOrderBy = Type.Object({
  orderBy: Type.Optional(Type.String()),
  ascOrDesc: Type.Optional(TSortOrder),
});

export const TRange = Type.Object({
  limit: Type.Optional(Type.Number()),
  offset: Type.Optional(Type.Number()),
});

// getRoutersData
export const SdkGetRoutersDataParamsSchema = Type.Object({
  params: Type.Optional(
    Type.Object({
      order: Type.Optional(TOrderBy),
    }),
  ),
});
export type SdkGetRoutersDataParams = Static<typeof SdkGetRoutersDataParamsSchema>;

// getRouterLiquidity
export const SdkGetRouterLiquidityParamsSchema = Type.Object({
  params: Type.Optional(
    Type.Object({
      order: Type.Optional(TOrderBy),
    }),
  ),
});
export type SdkGetRouterLiquidityParams = Static<typeof SdkGetRouterLiquidityParamsSchema>;

// getTransfers
export const SdkGetTransfersParamsSchema = Type.Object({
  params: Type.Optional(
    Type.Object({
      userAddress: Type.Optional(Type.String()),
      routerAddress: Type.Optional(Type.String()),
      status: Type.Optional(XTransferStatus),
      errorStatus: Type.Optional(XTransferErrorStatus),
      transferId: Type.Optional(Type.String()),
      transactionHash: Type.Optional(Type.String()),
      xcallCaller: Type.Optional(Type.String()),
      range: Type.Optional(TRange),
    }),
  ),
});
export type SdkGetTransfersParams = Static<typeof SdkGetTransfersParamsSchema>;

// checkRouterLiquidity
export const SdkCheckRouterLiquidityParamsSchema = Type.Object({
  domainId: Type.String(),
  asset: Type.String(),
  topN: Type.Optional(Type.Number()),
});
export type SdkCheckRouterLiquidityParams = Static<typeof SdkCheckRouterLiquidityParamsSchema>;
