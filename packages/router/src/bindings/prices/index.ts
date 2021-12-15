import { BigNumber, constants } from "ethers";
import { createLoggingContext, getNtpTimeSeconds, jsonifyError } from "@connext/nxtp-utils";
import { cachedPriceMap } from "@connext/nxtp-txservice";

import { getDeployedPriceOracleContract } from "../../config";
import { getContext } from "../../router";
import { getMainnetEquivalent, getTokenPriceFromOnChain, multicall } from "../../lib/helpers/shared";

const PRICE_LOOP_INTERVAL = 15_000;
export const getPriceLoopInterval = () => PRICE_LOOP_INTERVAL;

export const bindPrices = async () => {
  const { logger, config } = getContext();
  const { requestContext, methodContext } = createLoggingContext("bindPrices");

  setInterval(async () => {
    const chainAssetMap: Map<number, string[]> = new Map();
    for (let swapPoolIdx = 0; swapPoolIdx < config.swapPools.length; swapPoolIdx++) {
      const pool = config.swapPools[swapPoolIdx];
      for (let assetIdx = 0; assetIdx < pool.assets.length; assetIdx++) {
        const asset = pool.assets[assetIdx];
        const cachingAssetIdOnMainnet = await getMainnetEquivalent(asset.assetId, asset.chainId);
        const cachingTokenChainId = cachingAssetIdOnMainnet ? 1 : asset.chainId;
        const cachingTokenAssetId = cachingAssetIdOnMainnet ? cachingAssetIdOnMainnet : asset.assetId;
        if (!chainAssetMap.has(cachingTokenChainId)) {
          chainAssetMap.set(cachingTokenChainId, []);
        }
        chainAssetMap.get(cachingTokenChainId)!.push(cachingTokenAssetId);
      }
    }

    const curTimeInSecs = await getNtpTimeSeconds();
    let keys = chainAssetMap.keys();

    // check native tokens are already queued.
    for (const key of keys) {
      const chainId = key;

      const cachingNativeAssetIdOnMainnet = await getMainnetEquivalent(constants.AddressZero, chainId);
      const cachingNativeTokenChainId = cachingNativeAssetIdOnMainnet ? 1 : chainId;
      const cachingNativeTokenAssetId = cachingNativeAssetIdOnMainnet
        ? cachingNativeAssetIdOnMainnet
        : constants.AddressZero;

      const assetIds = chainAssetMap.get(cachingNativeTokenChainId);
      if (assetIds) {
        if (!assetIds.includes(cachingNativeTokenAssetId)) {
          assetIds.push(cachingNativeTokenAssetId);
        }
      } else {
        chainAssetMap.set(cachingNativeTokenChainId, [cachingNativeTokenAssetId]);
      }
    }

    keys = chainAssetMap.keys();
    try {
      for (const key of keys) {
        const chainId = key;
        const assetIds = chainAssetMap.get(chainId);
        const priceOracleContract = getDeployedPriceOracleContract(chainId);
        if (assetIds && priceOracleContract && priceOracleContract.address) {
          const multicallAddress = config.chainConfig[chainId]?.multicallAddress;
          if (multicallAddress) {
            // if multicall address is given, we use multicall contract to fetch token price
            logger.debug("fetching token prices using multicall", requestContext, methodContext, {
              multicallAddress,
              chainId,
              assetIds,
            });
            const calls = assetIds.map((assetId) => {
              return {
                address: priceOracleContract.address,
                name: "getTokenPrice",
                params: [assetId],
              };
            });
            const randomRpcUrl =
              config.chainConfig[chainId].providers[
                Math.floor(Math.random() * (config.chainConfig[chainId].providers.length - 1))
              ];
            const tokenPrices = await multicall(priceOracleContract.abi, calls, multicallAddress, randomRpcUrl);
            logger.debug("fetching token prices using multicall done", requestContext, methodContext, {
              multicallAddress,
              assetIds,
              tokenPrices,
            });
            for (let idx = 0; idx < assetIds.length; idx++) {
              const priceCacheKey = chainId.toString().concat("-").concat(assetIds[idx]);
              cachedPriceMap.set(priceCacheKey, {
                timestamp: curTimeInSecs,
                price: BigNumber.from(tokenPrices[idx].toString()),
              });
            }
          } else {
            // if multicall address isn't given, we use Promise.all to fetch token price
            logger.debug("fetching token prices using Promise", requestContext, methodContext, {
              chainId,
              assetIds,
            });

            const tokenPrices = await Promise.all(
              assetIds.map(async (assetId) => {
                const tokenPrice = await getTokenPriceFromOnChain(chainId, assetId, requestContext);
                const priceCacheKey = chainId.toString().concat("-").concat(assetId);
                cachedPriceMap.set(priceCacheKey, {
                  timestamp: curTimeInSecs,
                  price: BigNumber.from(tokenPrice),
                });
                return tokenPrice;
              }),
            );

            logger.info("fetching token prices using Promise done", requestContext, methodContext, {
              chainId,
              assetIds,
              tokenPrices,
            });
          }
        }
      }
    } catch (err: any) {
      logger.error(
        "Error getting token prices, waiting for next loop",
        requestContext,
        methodContext,
        jsonifyError(err),
      );
      return;
    }
  }, getPriceLoopInterval());
};
