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

/************************************
SDK Shared Types
*************************************/

export const SdkGetConversionRateParamsSchema = Type.Object({
  chainId: Type.Number(),
});

export type SdkGetConversionRateParams = Static<typeof SdkGetConversionRateParamsSchema>;

export const SdkGetProviderParamsSchema = Type.Object({
  domainId: Type.String(),
});

export type SdkGetProviderParams = Static<typeof SdkGetProviderParamsSchema>;

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

export const SdkGetConnextParamsSchema = Type.Object({
  domainId: Type.String(),
});

export type SdkGetConnextParams = Static<typeof SdkGetConnextParamsSchema>;

export const SdkGetERC20ParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});

export type SdkGetERC20Params = Static<typeof SdkGetERC20ParamsSchema>;

export const SdkGetChainIdParamsSchema = Type.Object({
  domainId: Type.String(),
});

export type SdkGetChainIdParams = Static<typeof SdkGetChainIdParamsSchema>;

export const SdkDomainToChainNameParamsSchema = Type.Object({
  domainId: Type.String(),
});

export type SdkDomainToChainNameParams = Static<typeof SdkDomainToChainNameParamsSchema>;

export const SdkChainIdToDomainParamsSchema = Type.Object({
  chainId: Type.Number(),
});

export type SdkChainIdToDomainParams = Static<typeof SdkChainIdToDomainParamsSchema>;

export const SdkDomainToChainIdParamsSchema = Type.Object({
  domainId: Type.Number(),
});

export type SdkDomainToChainIdParams = Static<typeof SdkDomainToChainIdParamsSchema>;

export const SdkGetBlockNumberFromUnixTimestampParamsSchema = Type.Object({
  domainId: Type.String(),
  unixTimestamp: Type.Number(),
});

export type SdkGetBlockNumberFromUnixTimestampParams = Static<typeof SdkGetBlockNumberFromUnixTimestampParamsSchema>;

export const SdkApproveIfNeededParamsSchema = Type.Object({
  domainId: Type.String(),
  assetId: Type.String(),
  amount: Type.String(),
  infiniteApprove: Type.Boolean(),
});

export type SdkApproveIfNeededParams = Static<typeof SdkApproveIfNeededParamsSchema>;

export const SdkGetActiveLiquidityParamsSchema = Type.Object({
  domain: Type.Optional(Type.String()),
  local: Type.Optional(Type.String()),
});

export type SdkGetActiveLiquidityParams = Static<typeof SdkGetActiveLiquidityParamsSchema>;

export const SdkGetAssetsDataByDomainAndAddressParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});

export type SdkGetAssetsDataByDomainAndAddressParams = Static<typeof SdkGetAssetsDataByDomainAndAddressParamsSchema>;

export const SdkGetAssetsWithSameCanonicalParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});
export type SdkGetAssetsWithSameCanonicalParams = Static<typeof SdkGetAssetsWithSameCanonicalParamsSchema>;

export const SdkGetAssetsDataByDomainAndKeyParamsSchema = Type.Object({
  domainId: Type.String(),
  key: Type.String(),
});

export type SdkGetAssetsDataByDomainAndKeyParams = Static<typeof SdkGetAssetsDataByDomainAndKeyParamsSchema>;

export const SdkIsNextAssetParamsSchema = Type.Object({
  tokenAddress: Type.String(),
});

export type SdkIsNextAssetParams = Static<typeof SdkIsNextAssetParamsSchema>;

export const SdkChangeSignerAddressParamsSchema = Type.Object({
  signerAddress: Type.String(),
});

export type SdkChangeSignerAddressParams = Static<typeof SdkChangeSignerAddressParamsSchema>;

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
  logs: Type.Array(LogSchema), // Assuming you have LogSchema defined
  blockNumber: Type.Number(),
  confirmations: Type.Number(),
  cumulativeGasUsed: TIntegerString,
  effectiveGasPrice: TIntegerString,
  byzantium: Type.Boolean(),
  type: Type.Number(),
  status: Type.Optional(Type.Number()),
});

export type SdkParseConnextTransactionReceiptParams = Static<typeof SdkParseConnextTransactionReceiptParamsSchema>;

export const SdkCalculateCanonicalKeyParamsSchema = Type.Object({
  domainId: Type.String(),
  canonicalId: Type.String(),
});

export type SdkCalculateCanonicalKeyParams = Static<typeof SdkCalculateCanonicalKeyParamsSchema>;

export const SdkGetCanonicalTokenIdParamsSchema = Type.Object({
  domainId: Type.String(),
  tokenAddress: Type.String(),
});

export type SdkGetCanonicalTokenIdParams = Static<typeof SdkGetCanonicalTokenIdParamsSchema>;

/************************************
SDK Base Types
*************************************/

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

export const SdkBumpTransferParamsSchema = Type.Object({
  domainId: TIntegerString,
  transferId: Type.String(),
  asset: Type.String(),
  relayerFee: TIntegerString,
});

export type SdkBumpTransferParams = Static<typeof SdkBumpTransferParamsSchema>;

export const SdkUpdateSlippageSchema = Type.Object({
  domainId: TIntegerString,
  transferId: Type.String(),
  slippage: TIntegerString,
});

export type SdkUpdateSlippage = Static<typeof SdkUpdateSlippageSchema>;

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

export const SdkUpdateSlippageParamsSchema = Type.Object({
  domainId: TIntegerString,
  transferId: Type.String(),
  slippage: TIntegerString,
});

export type SdkUpdateSlippageParams = Static<typeof SdkUpdateSlippageParamsSchema>;

export const SdkCalculateAmountReceivedParamsSchema = Type.Object({
  originDomain: Type.String(),
  destinationDomain: Type.String(),
  originTokenAddress: Type.String(),
  amount: Type.String(),
  receiveLocal: Type.Optional(Type.Boolean()),
  checkFastLiquidity: Type.Optional(Type.Boolean()),
});

export type SdkCalculateAmountReceivedParams = Static<typeof SdkUpdateSlippageParamsSchema>;
