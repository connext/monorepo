///NXTP Config Generator based on vector/modules/router/src/config.ts
import { Type, Static } from "@sinclair/typebox";
import { readFileSync } from "fs";
import addFormats from "ajv-formats";
import Ajv from "ajv";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";

const ajv = addFormats(new Ajv(), [
  "date-time",
  "time",
  "date",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference",
  "uuid",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex",
])
  .addKeyword("kind")
  .addKeyword("modifier");

export const TChainConfig = Type.Object({
  provider: Type.Array(Type.String()),
  confirmations: Type.Number({ minimum: 1 }),
  subgraph: Type.String(),
  transactionManagerAddress: Type.String(),
});

const NxtpRouterConfigSchema = Type.Object({
  adminToken: Type.String(),
  chainConfig: Type.Dict(TChainConfig),
  logLevel: Type.Optional(
    Type.Union([
      Type.Literal("fatal"),
      Type.Literal("error"),
      Type.Literal("warn"),
      Type.Literal("info"),
      Type.Literal("debug"),
      Type.Literal("trace"),
      Type.Literal("silent"),
    ]),
  ),
  natsUrl: Type.String(),
  authUrl: Type.String(),
  mnemonic: Type.String(),
});

export type NxtpRouterConfig = Static<typeof NxtpRouterConfigSchema>;

export const getEnvConfig = (): NxtpRouterConfig => {
  let configJson: Record<string, any> = {};
  let configFile: any = {};

  try {
    let json: string;
    if (process.env.NXTP_CONFIG_FILE) {
      console.log("process.env.NXTP_CONFIG_FILE: ", process.env.NXTP_CONFIG_FILE);
      json = readFileSync(process.env.NXTP_CONFIG_FILE, "utf-8");
    } else {
      json = readFileSync("config.json", "utf-8");
    }
    if (json) {
      configFile = JSON.parse(json);
      console.log("configFile: ", configFile);
      console.log("Found configFile");
    }
  } catch (e) {
    console.warn("No config file available...");
  }
  // return configFile;

  if (process.env.NXTP_CONFIG) {
    try {
      configJson = JSON.parse(process.env.NXTP_CONFIG || "");
      if (configJson) console.log("Found process.env.NXTP_CONFIG_FILE");
    } catch (e) {
      console.warn("No NXTP_CONFIG_FILE exists...");
    }
  }

  const nxtpConfig: NxtpRouterConfig = {
    mnemonic: process.env.NXTP_MNEMONIC || configJson.mnemonic || configFile.mnemonic,
    authUrl: process.env.NXTP_AUTH_URL || configJson.authUrl || configFile.authUrl,
    natsUrl: process.env.NXTP_NATS_URL || configJson.natsUrl || configFile.natsUrl,
    adminToken: process.env.NXTP_ADMIN_TOKEN || configJson.adminToken || configFile.adminToken,
    chainConfig: process.env.NXTP_CHAIN_CONFIG
      ? JSON.parse(process.env.NXTP_CHAIN_CONFIG)
      : configJson.chainConfig
      ? configJson.chainConfig
      : configFile.chainConfig,
    logLevel: process.env.NXTP_FEE_LOG_LEVEL || configJson.logLevel || configFile.logLevel,
  };

  // add contract deployments if they exist
  Object.entries(nxtpConfig.chainConfig).forEach(([chainId, chainConfig]) => {
    // allow passed in address to override
    // format: { [chainId]: { [chainName]: { "contracts": { "TransactionManager": { "address": "...." } } } }
    if (!chainConfig.transactionManagerAddress) {
      try {
        nxtpConfig.chainConfig[chainId].transactionManagerAddress = (Object.values(
          (contractDeployments as any)[chainId],
        )[0] as any).contracts.TransactionManager.address;
      } catch (e) {}
    }
  });

  return nxtpConfig;
};

const nxtpConfig: NxtpRouterConfig = getEnvConfig();
const validate = ajv.compile(NxtpRouterConfigSchema);

const valid = validate(nxtpConfig);

if (!valid) {
  console.error(`Invalid config: ${JSON.stringify(nxtpConfig, null, 2)}`);
  throw new Error(validate.errors?.map(err => err.message).join(","));
}

const config = nxtpConfig as Omit<NxtpRouterConfig, "mnemonic"> & { mnemonic: string };

export const getConfig = (): Omit<NxtpRouterConfig, "mnemonic"> & { mnemonic: string } => config;
