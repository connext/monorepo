import { existsSync, readFileSync } from "fs";

import { ajv } from "@connext/nxtp-utils";
import { Static, Type } from "@sinclair/typebox";

export const WatcherConfigSchema = Type.Object({
  discordHookUrl: Type.Optional(Type.String()),
  pagerDutyRoutingKey: Type.Optional(Type.String()),
  twilioNumber: Type.Optional(Type.String()),
  twilioAccountSid: Type.Optional(Type.String()),
  twilioAuthToken: Type.Optional(Type.String()),
  twilioToPhoneNumbers: Type.Optional(Type.Array(Type.String())),
  telegramApiKey: Type.Optional(Type.String()),
  telegramChatId: Type.Optional(Type.String()),
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
