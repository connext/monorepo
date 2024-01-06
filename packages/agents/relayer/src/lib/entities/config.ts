import { Type, Static } from "@sinclair/typebox";
import { TAddress, TIntegerString } from "@connext/nxtp-utils";

export const TChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
  confirmations: Type.Integer({ minimum: 1 }), // What we consider the "safe confirmations" number for this chain.
  minGasPrice: Type.Optional(TIntegerString), // minimun gas price in wei
  deployments: Type.Object({
    connext: TAddress,
  }),
});

export type ChainConfig = Static<typeof TChainConfig>;

export const TServerConfig = Type.Object({
  port: Type.Integer({ minimum: 1, maximum: 65535 }),
  host: Type.String({ format: "ipv4" }),
  adminToken: Type.String(),
});

export const TRedisConfig = Type.Object({
  port: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
  host: Type.Optional(Type.String()),
});

export const TModeConfig = Type.Object({
  cleanup: Type.Boolean(),
});

export const RelayerConfigSchema = Type.Object({
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
  network: Type.Union([
    Type.Literal("testnet"),
    Type.Literal("mainnet"),
    Type.Literal("local"),
    Type.Literal("devnet"),
  ]),
  mnemonic: Type.Optional(Type.String()),
  web3SignerUrl: Type.Optional(Type.String()),
  redis: TRedisConfig,
  server: TServerConfig,
  mode: TModeConfig,
  environment: Type.Union([Type.Literal("staging"), Type.Literal("production")]),
});

export type RelayerConfig = Static<typeof RelayerConfigSchema>;
