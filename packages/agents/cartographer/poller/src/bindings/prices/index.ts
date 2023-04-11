import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";

import { AppContext } from "../../shared";
import { updateAssetPrices, updateHistoricAssetPrices } from "../../lib/operations";

export const bindPrices = async (context: AppContext) => {
  const { logger } = context;
  const { requestContext, methodContext } = createLoggingContext(bindPrices.name);
  try {
    logger.debug("Bind asset usd prices polling loop start", requestContext, methodContext);
    await updateAssetPrices();
    await updateHistoricAssetPrices();
    logger.debug("Bind asset usd prices polling loop complete", requestContext, methodContext);
  } catch (err: unknown) {
    logger.error(
      "Error getting txs, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }
};
