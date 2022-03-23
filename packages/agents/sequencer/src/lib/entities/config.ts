import { Type, Static } from "@sinclair/typebox";

import { TAddress } from "@connext/nxtp-utils";
import { SubgraphReaderChainConfigSchema } from "@connext/nxtp-adapters-subgraph";

export const TChainConfig = Type.Object({
  subgraph: SubgraphReaderChainConfigSchema, // Subgraph configuration for this chain.
  providers: Type.Array(Type.String()),
  confirmations: Type.Integer({ minimum: 1 }), // What we consider the "safe confirmations" number for this chain.
  deployments: Type.Object({
    transactionManager: TAddress,
  }),
});

export type ChainConfig = Static<typeof TChainConfig>;

export const TServerConfig = Type.Object({
  port: Type.Integer({ minimum: 1, maximum: 65535 }),
  host: Type.String({ format: "ipv4" }),
});

export const TModeConfig = Type.Object({
  cleanup: Type.Boolean(),
});

export const SequencerConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), TChainConfig),
  logLevel: Type.Union([
    Type.Literal("fatal"),
    Type.Literal("error"),
    Type.Literal("warn"),
    Type.Literal("info"),
    Type.Literal("debug"),
    Type.Literal("trace"),
    Type.Literal("silent"),
  ]),
  network: Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")]),
  redisUrl: Type.Optional(Type.String({ format: "uri" })),
  server: TServerConfig,
  mode: TModeConfig,
  auctionWaitTime: Type.Number({ minimum: 1000, maximum: 500_000 }),
});

export type SequencerConfig = Static<typeof SequencerConfigSchema>;
