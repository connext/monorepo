import { readFileSync } from "fs";

import { SwapPool } from ".";

// TODO: Use typebox??
export type SequencerChainConfig = {
  [chainId: number]: {
    confirmations: number;
    providers: string[];
    transactionManagerAddress?: string;
    priceOracleAddress?: string;
    subgraph?: string | string[];
    gasStations: string[];
  };
};

export type SequencerConfig = {
  chains: SequencerChainConfig;
  mnemonic: string;
  routers: string[];
  swapPools: SwapPool[];
  logLevel?: string;
  natsUrl?: string;
  authUrl?: string;
  network?: string;
  redisUrl?: string;
};

// Copy/pasted from json file in the README - this should generally work for local chain load testing.
const DEFAULT_LOCAL_CONFIG = {
  adminToken: "blahblah",
  chains: {
    "1337": {
      providers: ["http://localhost:8545"],
      confirmations: 1,
      subgraph: "http://localhost:8010/subgraphs/name/connext/nxtp",
      transactionManagerAddress: "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0",
      priceOracleAddress: "0x0000000000000000000000000000000000000000",
    },
    "1338": {
      providers: ["http://localhost:8546"],
      confirmations: 1,
      subgraph: "http://localhost:9010/subgraphs/name/connext/nxtp",
      transactionManagerAddress: "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0",
      priceOracleAddress: "0x0000000000000000000000000000000000000000",
    },
  },
  logLevel: "info",
  network: "local",
  mnemonic: "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",
  routers: [],
  swapPools: [
    {
      name: "TEST",
      assets: [
        { chainId: 1337, assetId: "0x345cA3e014Aaf5dcA488057592ee47305D9B3e10" },
        { chainId: 1338, assetId: "0x345cA3e014Aaf5dcA488057592ee47305D9B3e10" },
      ],
    },
  ],
};

let sequencerConfig: SequencerConfig | undefined;

/**
 * Gets and validates the router config from the environment.
 * @param useDefaultLocal - (optional) If true, use the default local config.
 * @returns The router config with sensible defaults
 */
export const getConfig = (useDefaultLocal = false): SequencerConfig => {
  if (!sequencerConfig) {
    const path = process.env.NXTP_TEST_CONFIG_FILE ?? "./ops/config/config.json";
    const data = useDefaultLocal ? DEFAULT_LOCAL_CONFIG : JSON.parse(readFileSync(path, "utf8"));
    sequencerConfig = {
      network: data.network || "testnet",
      routers: [],
      ...data,
    };
  }
  return sequencerConfig!;
};
