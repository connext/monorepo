import {
  AssetPrice,
  axiosGet,
  createLoggingContext,
  getNtpTimeSeconds,
  jsonifyError,
  NxtpError,
  RouterDailyTVL,
} from "@connext/nxtp-utils";

import { getContext } from "../../shared";

export const updateAssetPrices = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
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
