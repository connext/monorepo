import interval from "interval-promise";
import { ChainData, getChainData, jsonifyError, SubgraphQueryMetaParams } from "@connext/nxtp-utils";
import { SubgraphReader } from "./reader";
import { testnetProdConfig as testnetProdConfigJson } from "./config";

// Ought to be configured properly for each network; we consult the chain config below.

export const DEFAULT_SAFE_CONFIRMATIONS = 5;

const config = JSON.parse(testnetProdConfigJson);

export const getXCalls = async () => {
  const chainData = await getChainData();
  const allowedDomains = Object.keys(config.chains);
  const allowedChainData: Map<string, ChainData> = new Map();
  for (const allowedDomain of allowedDomains) {
    if (chainData.has(allowedDomain)) {
      allowedChainData.set(allowedDomain, chainData.get(allowedDomain)!);
    }
  }
  const subgraphReader = await SubgraphReader.create(allowedChainData, config.environment, config.subgraphPrefix);

  const destinationDomains: string[] = Object.entries(config.chains).map(([chain]) => chain);
  const subgraphQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();
  const latestBlockNumbers = await subgraphReader.getLatestBlockNumber(allowedDomains);

  console.log({ latestBlockNumbers });

  for (const domain of allowedDomains) {
    try {
      let latestBlockNumber = 0;
      if (latestBlockNumbers.has(domain)) {
        latestBlockNumber = latestBlockNumbers.get(domain)!;
      }
      const safeConfirmations = config.chains[domain].confirmations ?? DEFAULT_SAFE_CONFIRMATIONS;
      const latestNonce = 0;

      subgraphQueryMetaParams.set(domain, {
        maxBlockNumber: latestBlockNumber - safeConfirmations,
        latestNonce: latestNonce == 0 ? 0 : latestNonce + 1, // queries at >= latest nonce, so use 1 larger than whats in the cache
        destinationDomains,
        orderDirection: "asc",
      });
    } catch (err: unknown) {
      console.log(`Error getting the latestBlockNumber, domain: ${domain}}`, jsonifyError(err as Error));
    }
  }

  if ([...subgraphQueryMetaParams.keys()].length > 0) {
    await subgraphReader.getOriginXCalls(subgraphQueryMetaParams);
  }
};

const bindSubgraph = async (_pollInterval?: number) => {
  interval(async (_, stop) => {
    try {
      await getXCalls();
    } catch (e: unknown) {
      console.log("Error getting xcalls, waiting for next loop", jsonifyError(e as Error));
      stop();
    }
  }, 3000);
};

bindSubgraph();
