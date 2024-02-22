import { Static, Type } from "@sinclair/typebox";

// strings aliases: these function more as documentation for devs than checked types
export type Address = string; // aka HexString of length 42
export type HexString = string; // eg "0xabc123" of arbitrary length
export type PublicIdentifier = string; // "vector" + base58(<publicKey>)
export type PublicKey = string; // aka HexString of length 132
export type PrivateKey = string; // aka Bytes32
export type SignatureString = string; // aka HexString of length 132
export type UrlString = string; // eg "<protocol>://<host>[:<port>]/<path>

// String pattern types
export const TAddress = Type.RegEx(/^0x[a-fA-F0-9]{40}$/);
export const TBytes32 = Type.RegEx(/^0x[a-fA-F0-9]{64}$/);
export const TIntegerString = Type.RegEx(/^([0-9])*$/);
export const TUrl = Type.String({ format: "uri" });
// Convenience types
export const TChainId = Type.Number({ minimum: 1 });
export const TDecimalString = Type.RegEx(/^[0-9]*\.?[0-9]*$/);

export const TDatabaseConfig = Type.Object({
  url: Type.String({ format: "uri" }),
});

export const TLogLevel = Type.Union([
  Type.Literal("fatal"),
  Type.Literal("error"),
  Type.Literal("warn"),
  Type.Literal("info"),
  Type.Literal("debug"),
  Type.Literal("trace"),
  Type.Literal("silent"),
]);

export const TAssetDescription = Type.Object({
  name: Type.String(),
  address: TAddress,
  mainnetEquivalent: Type.Optional(TAddress),
});

export type AssetDescription = Static<typeof TAssetDescription>;

export const TChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
  gasStations: Type.Array(Type.String()),
  confirmations: Type.Integer({ minimum: 1 }), // What we consider the "safe confirmations" number for this chain.
  deployments: Type.Object({
    connext: TAddress,
    relayerProxy: TAddress,
  }),
  assets: Type.Optional(Type.Array(TAssetDescription)), // Assets for which the router provides liquidity on this chain.
});

export type ChainConfig = Static<typeof TChainConfig>;

export const TServerConfig = Type.Object({
  pub: Type.Object({
    port: Type.Integer({ minimum: 1, maximum: 65535 }),
    host: Type.String({ format: "ipv4" }),
  }),
  sub: Type.Object({
    port: Type.Integer({ minimum: 1, maximum: 65535 }),
    host: Type.String({ format: "ipv4" }),
  }),
  requestLimit: Type.Integer(),
  adminToken: Type.String(),
});

export const TOptionalPeripheralConfig = Type.Object({
  port: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
  host: Type.Optional(Type.String()),
});

export const TRequiredPeripheralConfig = Type.Object({
  port: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
  uri: Type.Optional(Type.String()),
  host: Type.Optional(Type.String()),
  user: Type.Optional(Type.String()),
  pass: Type.Optional(Type.String()),
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
  heartbeat: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
  failAfter: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
  retryLimit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
});
