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

export const NxtpSdkXCallArgsSchema = Type.Object({
  destination: Type.String(),
  to: TAddress,
  asset: TAddress,
  delegate: Type.Optional(TAddress),
  amount: TIntegerString,
  slippage: TIntegerString,
  callData: Type.Optional(Type.String()),
  origin: Type.String(),
  relayerFee: Type.Optional(Type.String()),
  receiveLocal: Type.Optional(Type.Boolean()),
  wrapNativeOnOrigin: Type.Optional(Type.Boolean()),
  unwrapNativeOnDestination: Type.Optional(Type.Boolean()),
});

export type NxtpSdkXCallArgs = Static<typeof NxtpSdkXCallArgsSchema>;
