import { readFileSync } from "fs";

import { Type, Static } from "@sinclair/typebox";
import { ajv, Logger, TChainId } from "@connext/nxtp-utils";
import { SdkBaseConfigParams, NetworkSchema, LogLevelScehma, SdkBaseChainConfigParams } from "@connext/nxtp-sdk";
import { Wallet, providers } from "ethers";

export const SdkServerChainConfigSchema = Type.Record(
  TChainId,
  Type.Object({
    provider: Type.Array(Type.String()),
    transactionManagerAddress: Type.Optional(Type.String()),
    priceOracleAddress: Type.Optional(Type.String()),
    subgraph: Type.Optional(Type.String()),
    subgraphSyncBuffer: Type.Optional(Type.Number({ minimum: 1 })), // If subgraph is out of sync by this number, will not process actions
  }),
);

export const NxtpSdkServerConfigSchema = Type.Object({
  mnemonic: Type.String(),
  chainConfig: SdkServerChainConfigSchema,
  logLevel: LogLevelScehma,
  network: Type.Optional(NetworkSchema),
  natsUrl: Type.Optional(Type.String()),
  authUrl: Type.Optional(Type.String()),
  messagingMnemonic: Type.Optional(Type.String()),
  skipPolling: Type.Optional(Type.Boolean()),
});

export type NxtpSdkServerConfig = Static<typeof NxtpSdkServerConfigSchema>;

export const getConfig = (): SdkBaseConfigParams => {
  let configFile: any = {};

  try {
    let json: string;

    if (process.env.NXTP_SDK_SERVER_CONFIG_FILE) {
      json = readFileSync(process.env.NXTP_SDK_SERVER_CONFIG_FILE, "utf-8");
    } else {
      json = readFileSync("config.json", "utf-8");
    }
    if (json) {
      configFile = JSON.parse(json);
    }
  } catch (e) {
    console.error("config file parse error");
  }

  const serverConfig: NxtpSdkServerConfig = {
    mnemonic: process.env.NXTP_MNEMONIC || configFile.mnemonic,
    messagingMnemonic: process.env.NXTP_MNEMONIC || configFile.mnemonic,
    chainConfig: process.env.NXTP_CHAIN_CONFIG ? JSON.parse(process.env.NXTP_CHAIN_CONFIG) : configFile.chainConfig,
    network: process.env.NETWORK || configFile.network,
    natsUrl: process.env.NXTP_NATS_URL || configFile.natsUrl,
    authUrl: process.env.NXTP_AUTH_URL || configFile.authUrl,
    logLevel: process.env.NXTP_LOG_LEVEL || configFile.logLevel || "info",
    skipPolling: process.env.NXTP_SKIP_POLLING || configFile.skipPolling,
  };

  const validate = ajv.compile(NxtpSdkServerConfigSchema);
  const valid = validate(serverConfig);
  if (!valid) {
    throw new Error(validate.errors?.map((err: any) => err.message).join(","));
  }

  const signer = Wallet.fromMnemonic(serverConfig.mnemonic);
  const messagingSigner = serverConfig.messagingMnemonic
    ? Wallet.fromMnemonic(serverConfig.messagingMnemonic)
    : undefined;

  const chainConfig: SdkBaseChainConfigParams = {};
  Object.entries(serverConfig.chainConfig).forEach(([chainId, config]) => {
    chainConfig[parseInt(chainId)] = {
      provider: new providers.FallbackProvider(
        config.provider.map((p) => new providers.StaticJsonRpcProvider(p, parseInt(chainId))),
      ),
      transactionManagerAddress: config.transactionManagerAddress,
      priceOracleAddress: config.priceOracleAddress,
      subgraph: config.subgraph,
      subgraphSyncBuffer: config.subgraphSyncBuffer,
    };
  });

  // const chainConfig: SdkBaseChainConfigParams = {
  //   provider:
  // };

  const config: SdkBaseConfigParams = {
    chainConfig: chainConfig,
    signerAddress: signer.getAddress(),
    signer,
    messagingSigner,
    logger: new Logger({ name: "sdk-server", level: serverConfig.logLevel }),
    network: serverConfig.network,
    natsUrl: serverConfig.natsUrl,
    authUrl: serverConfig.authUrl,
    skipPolling: serverConfig.skipPolling,
  };

  return config;
};
