import { providers } from "ethers";

import { ContractReaderNotAvailableForChain } from "../../lib/errors";
import { getContext } from "../../router";

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
