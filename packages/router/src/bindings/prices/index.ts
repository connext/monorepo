import { Contract, BigNumber, constants } from "ethers";
import {
  createLoggingContext,
  getNtpTimeSeconds,
  getSimpleRPCPRovider,
  jsonifyError,
  multicall,
  MulticallAbi,
} from "@connext/nxtp-utils";

import { getOracleContractAddress, getPriceOracleInterface } from "../../adapters/contract/contract";
import { getDeployedPriceOracleContract } from "../../config";
import { getContext } from "../../router";

const PRICE_LOOP_INTERVAL = 15_000;
export const getPriceLoopInterval = () => PRICE_LOOP_INTERVAL;
export const cachedPriceMap: Map<string, { timestamp: number; price: BigNumber }> = new Map();
export const bindPrices = async () => {
  const { logger, config, txService } = getContext();
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
            const multicallContract = new Contract(
              multicallAddress,
              MulticallAbi,
              getSimpleRPCPRovider(config.chainConfig[chainId].providers[0]),
            );
            const tokenPrices = await multicall(priceOracleContract.abi, calls, multicallContract);
            logger.info("fetching token prices using multicall done", requestContext, methodContext, {
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
            logger.info("fetching token prices using Promise", requestContext, methodContext, {
              chainId,
              assetIds,
            });

            const oracleContractAddress = getOracleContractAddress(chainId, requestContext);

            const tokenPrices = await Promise.all(
              assetIds.map(async (assetId) => {
                const encodedTokenPriceData = getPriceOracleInterface().encodeFunctionData("getTokenPrice", [assetId]);
                const tokenPriceRes = await txService.readTx({
                  chainId,
                  to: oracleContractAddress,
                  data: encodedTokenPriceData,
                });
                const tokenPrice = BigNumber.from(tokenPriceRes);
                const priceCacheKey = chainId.toString().concat("-").concat(assetId);
                cachedPriceMap.set(priceCacheKey, { timestamp: curTimeInSecs, price: tokenPrice });
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
