import { BigNumber, constants } from "ethers";
import { createLoggingContext, getNtpTimeSeconds, jsonifyError } from "@connext/nxtp-utils";
import { cachedPriceMap } from "@connext/nxtp-txservice";

import { getDeployedPriceOracleContract } from "../../config";
import { getContext } from "../../router";
import { getTokenPriceFromOnChain, multicall } from "../../lib/helpers/shared";

const PRICE_LOOP_INTERVAL = 15_000;
export const getPriceLoopInterval = () => PRICE_LOOP_INTERVAL;

export const bindPrices = async () => {
  const { logger, config } = getContext();
  const { requestContext, methodContext } = createLoggingContext("bindPrices");

  setInterval(async () => {
    const chainAssetMap: Map<number, string[]> = new Map();
    config.swapPools.forEach((pool) => {
      pool.assets.forEach((asset) => {
        if (!chainAssetMap.get(asset.chainId)) {
          chainAssetMap.set(asset.chainId, []);
        }
        chainAssetMap.get(asset.chainId)?.push(asset.assetId);
      });
    });
    const curTimeInSecs = await getNtpTimeSeconds();
    const keys = chainAssetMap.keys();
    try {
      for (const key of keys) {
        const chainId = key;
        const assetIds = chainAssetMap.get(chainId);
        const priceOracleContract = getDeployedPriceOracleContract(chainId);
        if (assetIds && priceOracleContract && priceOracleContract.address) {
          const multicallAddress = config.chainConfig[chainId].multicallAddress;
          if (!assetIds.includes(constants.AddressZero)) {
            assetIds.push(constants.AddressZero);
          }
          if (multicallAddress) {
            // if multicall address is given, we use multicall contract to fetch token price
            logger.info("fetching token prices using multicall", requestContext, methodContext, {
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
            logger.info("fetching token prices using multicall done", requestContext, methodContext, {
              multicallAddress,
              assetIds,
              tokenPrices: tokenPrices.map((p: BigNumber) => p.toString()),
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
            logger.info("fetching token prices using Promise", requestContext, methodContext, {
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
              tokenPrices: tokenPrices.map((p) => p.toString()),
            });
          }
        }
      }
    } catch (err) {
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
