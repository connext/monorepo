import { WatcherAlertsConfigSchema } from "@connext/nxtp-adapters-watcher";
import { TAssetDescription, TLogLevel } from "@connext/nxtp-utils";
import { Static, Type } from "@sinclair/typebox";

export const TChainConfig = Type.Object({
  assets: Type.Array(TAssetDescription), // Assets for which the router provides liquidity on this chain.
  providers: Type.Array(Type.String(), { minItems: 2 }),
  quorum: Type.Optional(Type.Integer({ minimum: 2 })), // Required quorum among RPC providers.
});

export const WatcherConfigSchema = Type.Intersect([
  Type.Object({
    chains: Type.Record(Type.String(), TChainConfig),
    logLevel: TLogLevel,
    mnemonic: Type.Optional(Type.String()),
    web3SignerUrl: Type.Optional(Type.String({ format: "uri" })),
    environment: Type.Union([Type.Literal("staging"), Type.Literal("production")]),
    hubDomain: Type.String(),
    server: Type.Object({
      adminToken: Type.String(),
      port: Type.Number(),
      host: Type.String(),
    }),
    interval: Type.Number({ minimum: 5000, maximum: 500_000 }),
  }),
  WatcherAlertsConfigSchema,
]);

export type WatcherConfig = Static<typeof WatcherConfigSchema>;

// Define default config types (omits sensitive information from the config)
export const WatcherDefaultConfigSchema = Type.Object({
  chains: Type.Record(
    Type.String(),
    Type.Object({
      assets: Type.Array(TAssetDescription),
      quorum: Type.Integer({ minimum: 2 }),
    }),
  ),
  logLevel: TLogLevel,
  environment: Type.Union([Type.Literal("staging"), Type.Literal("production")]),
  hubDomain: Type.String(),
  server: Type.Object({
    port: Type.Number(),
    host: Type.String(),
  }),
  interval: Type.Number({ minimum: 5000, maximum: 500_000 }),
});
export type WatcherDefaultConfig = Static<typeof WatcherDefaultConfigSchema>;
