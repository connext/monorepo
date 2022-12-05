import { existsSync, readFileSync } from "fs";

import { ajv, TAssetDescription, TLogLevel } from "@connext/nxtp-utils";
import { Static, Type } from "@sinclair/typebox";

export const TChainConfig = Type.Object({
  assets: Type.Array(TAssetDescription), // Assets for which the router provides liquidity on this chain.
  providers: Type.Array(Type.String()),
});

export const WatcherConfigSchema = Type.Object({
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
});

export type WatcherConfig = Static<typeof WatcherConfigSchema>;

export const getEnvConfig = (): WatcherConfig => {
  let configJson: Record<string, any> = {};
  let configFile: any = {};

  try {
    configJson = JSON.parse(process.env.WATCHER_CONFIG || "");
  } catch (e: unknown) {
    console.info("No WATCHER_CONFIG exists, using config file and individual env vars");
  }
  try {
    let json: string;

    const path = process.env.WATCHER_CONFIG_FILE ?? "config.json";
    if (existsSync(path)) {
      json = readFileSync(path, { encoding: "utf-8" });
      configFile = JSON.parse(json);
    }
  } catch (e: unknown) {
    console.error("Error reading config file!");
    process.exit(1);
  }
  // return configFile;

  const config: WatcherConfig = {
    mnemonic: process.env.WATCHER_MNEMONIC || configJson.mnemonic || configFile.mnemonic,
    web3SignerUrl: process.env.WATCHER_WEB3_SIGNER_URL || configJson.web3SignerUrl || configFile.web3SignerUrl,
    chains: process.env.WATCHER_CHAIN_CONFIG
      ? JSON.parse(process.env.WATCHER_CHAIN_CONFIG)
      : configJson.chains
      ? configJson.chains
      : configFile.chains,
    logLevel: process.env.WATCHER_LOG_LEVEL || configJson.logLevel || configFile.logLevel || "info",
    environment: process.env.WATCHER_ENVIRONMENT || configJson.environment || configFile.environment || "production",
    hubDomain: process.env.WATCHER_HUB_DOMAIN || configJson.hubDomain || configFile.hubDomain,
    server: {
      adminToken: process.env.WATCHER_ADMIN_TOKEN || configJson.server?.adminToken || configFile.server?.adminToken,
      port: process.env.WATCHER_PORT || configJson.server?.port || configFile.server?.port || 8000,
      host: process.env.WATCHER_HOST || configJson.server?.host || configFile.server?.host || "0.0.0.0",
    },
    interval: process.env.WATCHER_INTERVAL || configJson.interval || configFile.interval || 15000,
  };

  const validate = ajv.compile(WatcherConfigSchema);

  const valid = validate(config);

  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  return config;
};

let config: WatcherConfig | undefined;

/**
 * Caches and returns the environment config
 *
 * @returns The config
 */
export const getConfig = async (): Promise<WatcherConfig> => {
  if (!config) {
    config = getEnvConfig();
  }
  return config;
};
