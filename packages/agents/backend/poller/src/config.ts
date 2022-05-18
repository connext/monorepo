///NXTP Config Generator based on vector/modules/router/src/config.ts
import { existsSync, readFileSync } from "fs";

import { Type, Static } from "@sinclair/typebox";
import { config as dotenvConfig } from "dotenv";
import { ajv } from "@connext/nxtp-utils";

const DEFAULT_POLL_INTERVAL = 15_000;

dotenvConfig();

export const TDatabaseConfig = Type.Object({
  url: Type.String({ format: "uri" }),
});

export const Backend = Type.Object({
  pollInterval: Type.Integer({ minimum: 1000 }),
  logLevel: Type.Union([
    Type.Literal("fatal"),
    Type.Literal("error"),
    Type.Literal("warn"),
    Type.Literal("info"),
    Type.Literal("debug"),
    Type.Literal("trace"),
    Type.Literal("silent"),
  ]),
  database: TDatabaseConfig,
  environment: Type.Union([Type.Literal("staging"), Type.Literal("production")]),
});

export type BackendConfig = Static<typeof Backend>;

/**
 * Gets and validates the router config from the environment.
 *
 * @returns The router config with sensible defaults
 */
export const getEnvConfig = (): BackendConfig => {
  let configJson: Record<string, any> = {};
  let configFile: any = {};

  try {
    configJson = JSON.parse(process.env.BACKEND_CONFIG || "");
  } catch (e: unknown) {
    console.info("No BACKEND_CONFIG exists, using config file and individual env vars");
  }
  try {
    let json: string;

    const path = process.env.BACKEND_CONFIG_FILE ?? "config.json";
    if (existsSync(path)) {
      json = readFileSync(path, { encoding: "utf-8" });
      configFile = JSON.parse(json);
    }
  } catch (e: unknown) {
    console.error("Error reading config file!");
    process.exit(1);
  }

  const nxtpConfig: BackendConfig = {
    pollInterval:
      process.env.BACKEND_POLL_INTERVAL || configJson.pollInterval || configFile.pollInterval || DEFAULT_POLL_INTERVAL,
    logLevel:
      process.env.BACKEND_LOG_LEVEL ||
      configJson.logLevel ||
      configFile.logLevel ||
      process.env.NXTP_LOG_LEVEL ||
      "info",
    database: { url: process.env.DATABASE_URL || configJson.databaseUrl || configFile.databaseUrl },
    environment: process.env.NXTP_ENVIRONMENT || configJson.environment || configFile.environment || "production",
  };

  const validate = ajv.compile(Backend);

  const valid = validate(nxtpConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  return nxtpConfig;
};

let nxtpConfig: BackendConfig | undefined;

/**
 * Caches and returns the environment config
 *
 * @returns The config
 */
export const getConfig = async (): Promise<BackendConfig> => {
  if (!nxtpConfig) {
    nxtpConfig = getEnvConfig();
  }
  return nxtpConfig;
};
