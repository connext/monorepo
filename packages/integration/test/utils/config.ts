import { readFileSync } from "fs";

import { providers } from "ethers";

export type ChainConfig = {
  [chainId: number]: {
    confirmations: number;
    providerUrls: string[];
    provider: providers.FallbackProvider;
    transactionManagerAddress?: string;
    subgraph?: string;
  };
};

type Asset = {
  chainId: number;
  assetId: string;
};

type SwapPool = {
  name: string;
  assets: Asset[];
};

type Config = {
  chainConfig: ChainConfig;
  mnemonic: string;
  swapPools: SwapPool[];
  logLevel?: string;
  natsUrl?: string;
  authUrl?: string;
};

/**
 * Gets and validates the router config from the environment.
 *
 * @returns The router config with sensible defaults
 */
export const getConfig = (): Config => {
  const path = process.env.NXTP_TEST_CONFIG_FILE ?? "./ops/config/load/config.json";
  const json = readFileSync(path, "utf-8");
  const parsed = JSON.parse(json);
  const chainConfig: ChainConfig = {};
  Object.entries(parsed.chainConfig).map(([chainId, config]) => {
    const { providers: providerUrls, confirmations, ...rest } = config as any;
    chainConfig[parseInt(chainId)] = {
      confirmations,
      providerUrls: providerUrls,
      provider: new providers.FallbackProvider(
        providerUrls.map((url: string) => new providers.JsonRpcProvider(url)),
        1,
      ),
      ...rest,
    };
  });
  return {
    ...parsed,
    chainConfig,
  };
};

export const config: Config = getConfig();
