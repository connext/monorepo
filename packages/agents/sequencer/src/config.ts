import { readFileSync } from "fs";

import { ChainData, getChainData } from "@connext/nxtp-utils";

import { DEFAULT_LOCAL_CONFIG, SequencerConfig } from "./lib/entities";

export const getEnvConfig = (chainData: Map<string, ChainData>, useDefaultLocal = false): SequencerConfig => {
  const path = process.env.NXTP_TEST_CONFIG_FILE ?? "./ops/config/config.json";
  const data = useDefaultLocal ? DEFAULT_LOCAL_CONFIG : JSON.parse(readFileSync(path, "utf8"));

  const _sequencerConfig: SequencerConfig = {
    chains: data.chains,
    swapPools: data.swapPools,
    logLevel: data.logLevel || "info",
    network: data.network || "mainnet",
    redisUrl: data.redisUrl || "http://localhost:6379",
    listenPort: data.listenPort || 1234,
  };

  return _sequencerConfig;
};

let sequencerConfig: SequencerConfig | undefined;

/**
 * Gets and validates the router config from the environment.
 * @param useDefaultLocal - (optional) If true, use the default local config.
 * @returns The router config with sensible defaults
 */
export const getConfig = async (useDefaultLocal = false): Promise<SequencerConfig> => {
  if (!sequencerConfig) {
    const chainData = await getChainData();
    sequencerConfig = getEnvConfig(chainData!, useDefaultLocal);
  }
  return sequencerConfig;
};
