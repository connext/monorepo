import { Bid, RequestContext, createLoggingContext } from "@connext/nxtp-utils";
import { AxiosError } from "axios";

import { GelatoSendFailed } from "../errors";
import { getContext } from "../../sequencer";
import { gelatoSend, isChainSupportedByGelato } from "../helpers/relayer";

export const sendToRelayer = async (bid: Bid, _requestContext: RequestContext) => {
  const {
    logger,
    chainData,
    adapters: { contracts },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(sendToRelayer.name, _requestContext);
  logger.info(`Method start: ${sendToRelayer.name}`, requestContext, methodContext, { bid });

  const destinationChainId = chainData.get(bid.data.params.destinationDomain)!.chainId;

  const destinationConnextAddress = config.chains[bid.data.params.destinationDomain].deployments.connext;

  const encodedData = contracts.connext.encodeFunctionData("execute", [bid.data]);

  if (!isChainSupportedByGelato(destinationChainId)) {
    throw new Error("Chain not supported by gelato.");
  }

  logger.info("Sending to Gelato network", requestContext, methodContext, {
    encodedData,
    destinationConnextAddress,
    domain: bid.data.params.destinationDomain,
  });
  const result = await gelatoSend(
    destinationChainId,
    destinationConnextAddress,
    encodedData,
    bid.data.local,
    bid.data.feePercentage,
  );
  if ((result as AxiosError).isAxiosError) {
    throw new GelatoSendFailed({ result });
  } else {
    logger.info("Sent to Gelato network", requestContext, methodContext, {
      result,
      taskId: result.taskId,
      // response: response.data,
    });
  }

  // const response = await axios.get(formatUrl(gelatoRelayEndpoint, "tasks", result.taskId));
  // TODO: check response, if it didn't work, send the next!
};
