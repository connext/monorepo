import {
  NxtpError,
  RouterPingMessage,
  RouterPingRequest,
  createLoggingContext,
  getNtpTimeSeconds,
  jsonifyError,
} from "@connext/nxtp-utils";

import { getContext } from "../publisher";
import { axiosPost } from "../../../mockable";

/**
 * Sends the active status to the sequencer for monitoring/alerting.
 */
export const sendStatusToSequencer = async (): Promise<void> => {
  const {
    adapters: { wallet },
    logger,
    routerAddress,
    config,
  } = getContext();

  const { requestContext, methodContext } = createLoggingContext(sendStatusToSequencer.name);
  logger.info(`Sending router status to the sequencer`, requestContext, methodContext);
  try {
    const curTime = getNtpTimeSeconds();
    const signMsg = await wallet.signMessage(`${RouterPingMessage}-${curTime}`);

    const response = await axiosPost<RouterPingRequest>(`${config.sequencerUrl}/router-ping`, {
      router: routerAddress,
      timestamp: curTime,
      signed: signMsg,
    });

    if (!response || !response.data) {
      logger.error("Sending status to the sequencer failed", requestContext, methodContext);
    } else {
      logger.info("Sent status to the sequencer", requestContext, methodContext, { data: response.data });
    }
  } catch (error: unknown) {
    logger.error(
      "Sending status to the sequencer failed",
      requestContext,
      methodContext,
      jsonifyError(error as NxtpError),
    );
  }
};
