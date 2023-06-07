import * as fs from "fs";

import { Type, Static } from "@sinclair/typebox";
import { config as dotenvConfig } from "dotenv";
import { ajv } from "@connext/nxtp-utils";

const CACHE_EXPIRATION_SECS = 300;

dotenvConfig();

export const TChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
});

export const TServerConfig = Type.Object({
  http: Type.Object({
    port: Type.Integer({ minimum: 1, maximum: 65535 }),
    host: Type.String(),
  }),
});

export const TRedisConfig = Type.Object({
  enabled: Type.Optional(Type.Boolean()),
  expirationTime: Type.Optional(Type.Integer()),
  host: Type.Optional(Type.String()),
  port: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
});

export const SdkServerConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), TChainConfig),
  environment: Type.Union([Type.Literal("staging"), Type.Literal("production")]),
  network: Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")]),
  logLevel: Type.Union([
    Type.Literal("fatal"),
    Type.Literal("error"),
    Type.Literal("warn"),
    Type.Literal("info"),
    Type.Literal("debug"),
    Type.Literal("trace"),
    Type.Literal("silent"),
  ]),
  mnemonic: Type.Optional(Type.String()),
  redis: TRedisConfig,
  server: TServerConfig,
});
export type SdkServerConfig = Static<typeof SdkServerConfigSchema>;

export const getEnvConfig = (): SdkServerConfig => {
  let configJson: Record<string, any> = {};
  let configFile: any = {};

  try {
    configJson = JSON.parse(process.env.SDK_SERVER_CONFIG || "");
  } catch (e: unknown) {
    console.info("No SDK_SERVER_CONFIG exists, using config file and individual env vars");
  }
  try {
    let json: string;

    const path = process.env.SDK_SERVER_CONFIG_FILE ?? "config.json";
    if (fs.existsSync(path)) {
      json = fs.readFileSync(path, { encoding: "utf-8" });
      configFile = JSON.parse(json);
    }
  } catch (e: unknown) {
    console.error("Error reading config file!");
    process.exit(1);
  }

  const _sdkServerConfig: SdkServerConfig = {
    chains: process.env.SDK_SERVER_CHAIN_CONFIG
      ? JSON.parse(process.env.SDK_SERVER_CHAIN_CONFIG)
      : configJson.chains
      ? configJson.chains
      : configFile.chains,
    environment: process.env.SDK_SERVER_ENVIRONMENT || configJson.environment || configFile.environment || "production",
    network: process.env.SDK_SERVER_NETWORK || configJson.network || configFile.network || "mainnet",
    logLevel: process.env.SDK_SERVER_LOG_LEVEL || configJson.logLevel || configFile.logLevel || "info",
    mnemonic: process.env.SDK_SERVER_MNEMONIC || configJson.mnemonic || configFile.mnemonic,
    redis: {
      enabled: process.env.SDK_SERVER_REDIS_ENABLED || configJson.redis?.enabled || configFile.redis?.enabled || false,
      expirationTime:
        process.env.SDK_SERVER_REDIS_EXPIRATION_TIME ||
        configJson.redis?.expirationTime ||
        configFile.redis?.expirationTime ||
        CACHE_EXPIRATION_SECS,
      host: process.env.SDK_SERVER_REDIS_HOST || configJson.redis?.host || configFile.redis?.host || "localhost",
      port: process.env.SDK_SERVER_REDIS_PORT || configJson.redis?.port || configFile.redis?.port || 6379,
    },
    server: {
      http: {
        port:
          process.env.SDK_SERVER_HTTP_SERVER_PORT ||
          configJson.server?.http?.port ||
          configFile.server?.http?.port ||
          8080,
        host:
          process.env.SDK_SERVER_HTTP_SERVER_HOST ||
          configJson.server?.http?.host ||
          configFile.server?.http?.host ||
          "localhost",
      },
    },
  };

  const validate = ajv.compile(SdkServerConfigSchema);
  const valid = validate(_sdkServerConfig);
  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  return _sdkServerConfig;
};

export let sdkServerConfig: SdkServerConfig | undefined;

export const getConfig = async (): Promise<SdkServerConfig> => {
  if (!sdkServerConfig) {
    sdkServerConfig = getEnvConfig();
  }
  return sdkServerConfig;
};
