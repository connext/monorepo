import { createLoggingContext, ExecuteArgs, jsonifyError, NxtpError, formatUrl } from "@connext/nxtp-utils";
import axios from "axios";
import interval from "interval-promise";
import { constants } from "ethers";

import { getOperations } from "../../lib/operations";
import { getContext } from "../../lighthouse";

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindBackend = async (_pollInterval: number) => {
  const { config } = getContext();
  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      await pollBackend();
    }
  }, _pollInterval);
};

export const pollBackend = async () => {
  const { requestContext, methodContext } = createLoggingContext(pollBackend.name);
  const { logger } = getContext();
  const { execute } = getOperations();

  const reconciledTransactions = await getReconciledTransactions();

  reconciledTransactions.map(async (transaction: any) => {
    // console.log(transaction);

    try {
      const executeParams: ExecuteArgs = {
        params: {
          originDomain: transaction.origin_domain,
          destinationDomain: transaction.destination_domain,
          to: transaction.to,
          callData: transaction.call_data,
        },
        local: transaction.destination_local_asset,
        routers: [constants.AddressZero],
        routerSignatures: ["0x"],
        amount: transaction.destination_local_amount.toString(),
        nonce: transaction.nonce,
        originSender: transaction.xcall_caller,
      };

      const transferId = transaction.trasfer_id as string;
      await execute(executeParams, transferId);
    } catch (error: any) {
      logger.error("Error executing", requestContext, methodContext, jsonifyError(error as NxtpError), { transaction });
    }
  });
};

export const getReconciledTransactions = async (): Promise<any> => {
  const { requestContext, methodContext } = createLoggingContext(getReconciledTransactions.name);
  const {
    // adapters: {},
    logger,
    config,
  } = getContext();

  const statusIdentifier = `status=eq.Reconciled&`;
  const uri = formatUrl(config.backendUrl, "transfers?", statusIdentifier);
  try {
    const response = await axios.get(uri);
    return response.data;
  } catch (error: any) {
    logger.error(
      "Backend api request failed, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(error as NxtpError),
      { uri },
    );
  }
};
