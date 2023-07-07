import { AssetPrice, createLoggingContext, getNtpTimeSeconds, jsonifyError, NxtpError } from "@connext/nxtp-utils";

import { getContext } from "../../shared";
import { axiosGet } from "../../mockable";

const ASSET_PRICE_START_TIMESTAMP = 1671660155;

export const updateAssetPrices = async () => {
  const {
    adapters: { database },
    logger,
    chainData,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateAssetPrices.name);

  const assets = await database.getAssets();
  if (!assets.length) {
    logger.error("Error getting the assets. Empty Assets!!", requestContext, methodContext, undefined);
    return;
  }

  const canonicalDomain = assets[0].canonicalDomain;
  const assetsOnCanonical = assets
    .filter((a) => a.domain === canonicalDomain)
    .map((a) => {
      const assetIds = Object.fromEntries(
        Object.entries(chainData.get(canonicalDomain)!.assetId).map(([addr, value]) => [addr.toLowerCase(), value]),
      );

      const coingeckoId = assetIds[a.adoptedAsset.toLowerCase()]?.coingeckoId;
      return { ...a, coingeckoId };
    })
    .filter((a) => !!a.coingeckoId);

  const coingeckoIds = assetsOnCanonical.map((a) => a.coingeckoId).join(",");
  let response: any;
  try {
    response = await axiosGet("https://api.coingecko.com/api/v3/simple/price", {
      params: { ids: coingeckoIds, vs_currencies: "usd" },
    });
    if (response && response.data) {
      logger.debug("Got prices from Coingecko API", requestContext, methodContext, {
        data: response.data,
      });

      const prices = response.data as unknown as Record<string, { [usd: string]: number }>;
      const curTimestamp = getNtpTimeSeconds();
      const assetPrices: AssetPrice[] = assetsOnCanonical.map((a) => {
        return {
          canonicalId: a.canonicalId,
          canonicalDomain: a.canonicalDomain,
          timestamp: curTimestamp,
          price: prices[a.coingeckoId!].usd,
        };
      });
      await database.saveAssetPrice(assetPrices);
      logger.debug("Saved Asset Prices", requestContext, methodContext, { assetPrices });
    }
  } catch (e: unknown) {
    logger.debug("Coingecko API not responding correctly", requestContext, methodContext, {
      res: response ? (response?.data ? response.data : response) : undefined,
      error: jsonifyError(e as NxtpError),
    });
  }
};

export const updateHistoricAssetPrices = async () => {
  const {
    adapters: { database },
    logger,
    chainData,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateHistoricAssetPrices.name);

  const assets = await database.getAssets();
  if (!assets.length) {
    logger.error("Error getting the assets. Empty Assets!!", requestContext, methodContext, undefined);
    return;
  }
  const canonicalDomain = assets[0].canonicalDomain;
  const assetsOnCanonical = assets
    .filter((a) => a.domain === canonicalDomain)
    .map((a) => {
      const assetIds = Object.fromEntries(
        Object.entries(chainData.get(canonicalDomain)!.assetId).map(([addr, value]) => [addr.toLowerCase(), value]),
      );

      const coingeckoId = assetIds[a.adoptedAsset.toLowerCase()]?.coingeckoId;
      return { ...a, coingeckoId };
    })
    .filter((a) => !!a.coingeckoId);

  const latestTimestamp =
    (await database.getCheckPoint("asset_price_timestamp_" + canonicalDomain)) || ASSET_PRICE_START_TIMESTAMP;
  const toTimestamp = Math.min(latestTimestamp + 90 * 24 * 3600, getNtpTimeSeconds());

  if (latestTimestamp < toTimestamp) {
    for (const asset of assetsOnCanonical) {
      let response: any;
      try {
        response = await axiosGet(`https://api.coingecko.com/api/v3/coins/${asset.coingeckoId}/market_chart/range`, {
          params: { from: latestTimestamp, to: toTimestamp, vs_currency: "usd" },
        });
        if (response && response.data) {
          logger.debug("Got historical prices from Coingecko API", requestContext, methodContext, {
            coingeckoId: asset.coingeckoId,
            from: latestTimestamp,
            to: toTimestamp,
            length: response.data.prices.length,
          });

          const prices = response.data.prices as unknown as [number, number][];
          const assetPrices: AssetPrice[] = prices.map(([timestamp, price]) => {
            return {
              canonicalId: asset.canonicalId,
              canonicalDomain: asset.canonicalDomain,
              timestamp: Math.floor(timestamp / 1000),
              price: price,
            };
          });

          await database.saveAssetPrice(assetPrices);
          await database.saveCheckPoint("asset_price_timestamp_" + canonicalDomain, toTimestamp);
          logger.debug("Saved Asset Prices", requestContext, methodContext, { assetPrices });
        }
      } catch (e: unknown) {
        logger.debug("Coingecko API not responding correctly", requestContext, methodContext, {
          res: response ? (response?.data ? response.data : response) : undefined,
          error: jsonifyError(e as NxtpError),
        });
      }
    }
  }
  for (const asset of assetsOnCanonical) {
    let response: any;
    try {
      response = await axiosGet(`https://api.coingecko.com/api/v3/coins/${asset.coingeckoId}/market_chart/range`, {
        params: { from: latestTimestamp, to: toTimestamp, vs_currency: "usd" },
      });
      if (response && response.data) {
        logger.debug("Got historical prices from Coingecko API", requestContext, methodContext, {
          coingeckoId: asset.coingeckoId,
          from: latestTimestamp,
          to: toTimestamp,
          length: response.data.prices.length,
        });

        const prices = response.data.prices as unknown as [number, number][];
        const assetPrices: AssetPrice[] = prices.map(([timestamp, price]) => {
          return {
            canonicalId: asset.canonicalId,
            canonicalDomain: asset.canonicalDomain,
            timestamp: Math.floor(timestamp / 1000),
            price: price,
          };
        });

        await database.saveAssetPrice(assetPrices);
        await database.saveCheckPoint("asset_price_timestamp_" + canonicalDomain, toTimestamp);
        logger.debug("Saved Asset Prices", requestContext, methodContext, { assetPrices });
      }
    } catch (e: unknown) {
      logger.debug("Coingecko API not responding correctly", requestContext, methodContext, {
        res: response ? (response?.data ? response.data : response) : undefined,
        error: jsonifyError(e as NxtpError),
      });
    }
  }
};
