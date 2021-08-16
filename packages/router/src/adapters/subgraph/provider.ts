import { providers, Contract, constants } from "ethers";
import { ERC20Abi } from "@connext/nxtp-utils";

import { ContractReaderNotAvailableForChain } from "../../lib/errors";
import { getContext } from "../../router";

// TODO: move all of this into tx service calls

/**
 * Cache for the asset decimals
 */
const decimals: Record<string, number> = {};

/** Functions where the provider is used instead of a subgraph */
export const getBlockTime = async (chainId: number): Promise<number> => {
  const { config } = getContext();

  if (!Object.keys(config.chainConfig).includes(chainId.toString())) {
    throw new ContractReaderNotAvailableForChain(chainId, { available: Object.keys(chainId) });
  }

  const urls = config.chainConfig[chainId].providers;
  const provider =
    urls.length === 1
      ? new providers.JsonRpcProvider(urls[0])
      : new providers.FallbackProvider(urls.map((url) => new providers.JsonRpcProvider(url), 1));
  const block = await provider.getBlock("latest");
  return block.timestamp;
};

export const getAssetDecimals = async (assetId: string, chainId: number): Promise<number> => {
  const { config } = getContext();

  if (!Object.keys(config.chainConfig).includes(chainId.toString())) {
    throw new ContractReaderNotAvailableForChain(chainId, { available: Object.keys(chainId) });
  }

  const cacheKey = `${chainId}:${assetId}`;
  if (decimals[cacheKey]) {
    return decimals[cacheKey];
  }

  if (assetId === constants.AddressZero) {
    decimals[cacheKey] = 18;
    return 18;
  }

  // Get provider
  const urls = config.chainConfig[chainId].providers;
  const provider =
    urls.length === 1
      ? new providers.JsonRpcProvider(urls[0])
      : new providers.FallbackProvider(urls.map((url) => new providers.JsonRpcProvider(url), 1));

  const assetDecimals = await new Contract(assetId, ERC20Abi, provider).decimals();
  decimals[cacheKey] = assetDecimals;
  return assetDecimals;
};

export const getBalance = async (address: string, chainId: number) => {
  const { config } = getContext();

  if (!Object.keys(config.chainConfig).includes(chainId.toString())) {
    throw new ContractReaderNotAvailableForChain(chainId, { available: Object.keys(chainId) });
  }

  const urls = config.chainConfig[chainId].providers;
  const provider =
    urls.length === 1
      ? new providers.JsonRpcProvider(urls[0], chainId)
      : new providers.FallbackProvider(urls.map((url) => new providers.JsonRpcProvider(url, chainId), 1));

  const start = Date.now();
  const balance = await provider.getBalance(address);
  const elapsed = (Date.now() - start) / 1000;
  console.log("******** getBalance time:", elapsed, "seconds");
  return balance;
};
