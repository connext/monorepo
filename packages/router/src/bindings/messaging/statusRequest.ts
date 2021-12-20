import { createLoggingContext, NxtpErrorJson, RequestContext, StatusResponse } from "@connext/nxtp-utils";

import { getOperations } from "../../lib/operations";
import { getContext } from "../../router";

export const statusRequestBinding = async (
  from: string,
  inbox: string,
  data?: any,
  err?: NxtpErrorJson,
  _requestContext?: RequestContext<string>,
) => {
  const { logger, messaging } = getContext();
  const { getStatus } = getOperations();
  const { requestContext, methodContext } = createLoggingContext(statusRequestBinding.name, _requestContext, "");
  if (err) {
    logger.error("Error in status request", requestContext, methodContext, err, {
      data,
    });
    return;
  }

  const status: StatusResponse = getStatus(requestContext);

  await messaging.publishStatusResponse(from, inbox, status);
};
