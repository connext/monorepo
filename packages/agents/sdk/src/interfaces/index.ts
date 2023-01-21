import { BigNumber } from "ethers";
import { Type, Static } from "@sinclair/typebox";
import { TAddress, TIntegerString, XCallArgsSchema } from "@connext/nxtp-utils";

export type Pool = {
  domainId: string;
  name: string;
  symbol: string; // in the form of <TKN>-next<TKN>
  local: PoolAsset;
  adopted: PoolAsset;
  lpTokenAddress: string;
  canonicalHash: string; // hash of the domain and canonicalId, AKA "key"
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

export type ConnextSupport = { name: string; chainId: number; domainId: string; assets: string[] };

export const SdkXCallParamsSchema = Type.Intersect([
  XCallArgsSchema,
  Type.Object({
    origin: TIntegerString,
    relayerFee: TIntegerString,
    receiveLocal: Type.Boolean(),
    wrapNativeOnOrigin: Type.Optional(Type.Boolean()),
    unwrapNativeOnDestination: Type.Optional(Type.Boolean()),
  }),
]);

export type SdkXCallParams = Static<typeof SdkXCallParamsSchema>;

export const SdkBumpTransferParamsSchema = Type.Object({
  domainId: TIntegerString,
  transferId: Type.String(),
  relayerFee: TIntegerString,
});

export type SdkBumpTransferParams = Static<typeof SdkBumpTransferParamsSchema>;

export const SdkEstimateRelayerFeeParamsSchema = Type.Object({
  originDomain: TIntegerString,
  destinationDomain: TIntegerString,
  originNativeToken: Type.Optional(TAddress),
  destinationNativeToken: Type.Optional(TAddress),
  callDataGasAmount: Type.Optional(Type.Integer()),
  isHighPriority: Type.Optional(Type.Boolean()),
});

export type SdkEstimateRelayerFeeParams = Static<typeof SdkEstimateRelayerFeeParamsSchema>;
