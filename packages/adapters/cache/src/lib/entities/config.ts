import { Type, Static } from "@sinclair/typebox";
import { TIntegerString } from "@connext/nxtp-utils";

export const TChainConfig = Type.Object({});

export type ChainConfig = Static<typeof TChainConfig>;

export const CacheConfigSchema = Type.Object({
  chains: Type.Record(TIntegerString, TChainConfig),
});

export type CacheConfig = Static<typeof CacheConfigSchema>;
