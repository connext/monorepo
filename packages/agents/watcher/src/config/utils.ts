import { existsSync, readFileSync } from "fs";

import { ajv } from "@connext/nxtp-utils";

import { WatcherConfig, WatcherConfigSchema, TESTNET_STAGING_DEFAULT, MAINNET_PRODUCTION_DEFAULT } from "../config";

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

  // Get the default config from environment
  const environment =
    process.env.WATCHER_ENVIRONMENT || configJson.environment || configFile.environment || "production";
  const DEFAULT = environment === "production" ? MAINNET_PRODUCTION_DEFAULT : TESTNET_STAGING_DEFAULT;

  // Take the chain config and enforce default values as needed.
  const parsedChains: object = process.env.WATCHER_CHAIN_CONFIG
    ? JSON.parse(process.env.WATCHER_CHAIN_CONFIG)
    : configJson.chains
    ? configJson.chains
    : configFile.chains;
  // Default value enforcement.
  const chains: any = {};
  Object.entries(parsedChains).forEach(([key, values]) => {
    chains[key] = {
      ...DEFAULT.chains[key],
      ...values,
    };
  });

  const parsedAssets = process.env.WATCHER_ASSETS
    ? JSON.parse(process.env.WATCHER_ASSETS)
    : configJson.assets
    ? configJson.assets
    : configFile.assets;

  const config: WatcherConfig = {
    mnemonic: process.env.WATCHER_MNEMONIC || configJson.mnemonic || configFile.mnemonic,
    web3SignerUrl: process.env.WATCHER_WEB3_SIGNER_URL || configJson.web3SignerUrl || configFile.web3SignerUrl,
    chains,
    assets: parsedAssets || DEFAULT.assets,
    logLevel: process.env.WATCHER_LOG_LEVEL || configJson.logLevel || configFile.logLevel || DEFAULT.logLevel,
    environment,
    hubDomain: process.env.WATCHER_HUB_DOMAIN || configJson.hubDomain || configFile.hubDomain || DEFAULT.hubDomain,
    server: {
      adminToken: process.env.WATCHER_ADMIN_TOKEN || configJson.server?.adminToken || configFile.server?.adminToken,
      port: process.env.WATCHER_PORT || configJson.server?.port || configFile.server?.port || DEFAULT.server.port,
      host: process.env.WATCHER_HOST || configJson.server?.host || configFile.server?.host || DEFAULT.server.host,
    },
    interval: process.env.WATCHER_INTERVAL || configJson.interval || configFile.interval || DEFAULT.interval,
    discordHookUrl: process.env.DISCORD_HOOK_URL || configJson.discordHookUrl || configFile.discordHookUrl,
    pagerDutyRoutingKey:
      process.env.PAGERDUTY_ROUTING_KEY || configJson.pagerDutyRoutingKey || configFile.pagerDutyRoutingKey,
    twilioNumber: process.env.TWILIO_NUMBER || configJson.twilioNumber || configFile.twilioNumber,
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || configJson.twilioAccountSid || configFile.twilioAccountSid,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || configJson.twilioAuthToken || configFile.twilioAuthToken,
    twilioToPhoneNumbers:
      process.env.TWILIO_TO_PHONE_NUMBERS || configJson.twilioToPhoneNumbers || configFile.twilioToPhoneNumbers || [],
    telegramApiKey: process.env.TELEGRAM_API_KEY || configJson.telegramApiKey || configFile.telegramApiKey,
    telegramChatId: process.env.TELEGRAM_CHAT_ID || configJson.telegramChatId || configFile.telegramChatId,
    betterUptimeApiKey:
      process.env.BETTER_UPTIME_API_KEY || configJson.betterUptimeApiKey || configFile.betterUptimeApiKey,
    betterUptimeRequesterEmail:
      process.env.BETTER_UPTIME_REQUESTER_EMAIL ||
      configJson.betterUptimeRequesterEmail ||
      configFile.betterUptimeRequesterEmail,
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
export const getConfig = (): WatcherConfig => {
  if (!config) {
    config = getEnvConfig();
  }
  return config;
};
