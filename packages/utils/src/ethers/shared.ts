import { BigNumber, providers, Contract, utils } from "ethers";

import { ERC20Abi } from "..";

export const getETHBalance = async (provider: providers.Provider, address: string): Promise<BigNumber> => {
  return provider.getBalance(address);
};

export const getTokenBalance = async (
  assetId: string,
  address: string,
  provider: providers.Provider,
): Promise<BigNumber> => {
  return new Contract(assetId, ERC20Abi, provider).balanceOf(address);
};

export const getTokenDecimals = async (assetId: string, provider: providers.Provider): Promise<number> => {
  return new Contract(assetId, ERC20Abi, provider).decimals();
};

export const fetchJson = utils.fetchJson;

/**
 * Gets the best RPC URL between several options by comparing latencies
 * @param rpcUrls - The source list
 * @returns - The best RPC URL
 */
export const getBestProvider = async (rpcUrls: string[]): Promise<string | undefined> => {
  let bestProvider: string | undefined = undefined;
  let bestLatency = Infinity;

  for (const url of rpcUrls) {
    const provider = new providers.JsonRpcProvider(url);
    try {
      const start = Date.now();
      await provider.getBlockNumber();
      const latency = Date.now() - start;

      if (latency < bestLatency) {
        bestProvider = url;
        bestLatency = latency;
      }
    } catch (error: unknown) {
      console.log(`Error connecting to provider at ${url}: ${error}`);
    }
  }

  return bestProvider;
};
