import { createLoggingContext, RequestContext, StatusResponse } from "@connext/nxtp-utils";

import { getContext } from "../../router";
import { handlingTracker, activeTransactionsTracker } from "../../bindings/contractReader";
// @ts-ignore
import { version } from "../../../package.json";

export const getStatus = (_requestContext: RequestContext<string>): StatusResponse => {
  const { config, signerAddress, routerAddress } = getContext();

  const routerVersion = version;
  const trackerLength = handlingTracker.size;
  const activeTransactionsLength = activeTransactionsTracker.length;

  const chainAssetMap: Map<number, string[]> = new Map();
  config.swapPools.forEach((pool) => {
    pool.assets.forEach((asset) => {
      if (!chainAssetMap.get(asset.chainId)) {
        chainAssetMap.set(asset.chainId, []);
      }
      chainAssetMap.get(asset.chainId)?.push(asset.assetId);
    });
  });

  const supportedChains: number[] = [];
  Object.entries(config.chainConfig).forEach(([chainId]) => {
    const chainIdNumber = parseInt(chainId);
    supportedChains.push(chainIdNumber);
  });

  const _status: StatusResponse = {
    routerVersion,
    routerAddress,
    signerAddress,
    trackerLength,
    activeTransactionsLength,
    swapPools: chainAssetMap,
    supportedChains,
  };

  return _status;
};
