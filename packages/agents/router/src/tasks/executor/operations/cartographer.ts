import {
  createLoggingContext,
  ExecuteArgs,
  jsonifyError,
  NxtpError,
  formatUrl,
  convertFromDbTransfer,
  transfersCastForUrl,
} from "@connext/nxtp-utils";
import axios from "axios";
import { constants } from "ethers";

import { CartoApiRequestFailed } from "../../../errors";
import { getContext } from "../executor";

import { execute } from "./execute";

export const pollCartographer = async () => {
  const { requestContext, methodContext } = createLoggingContext(pollCartographer.name);
  const { logger } = getContext();

  logger.debug(`Method start: ${pollCartographer.name}`, requestContext, methodContext, {});
  const reconciledTransactions = await getReconciledTransactions();
  logger.debug("Get reconciled transactions", requestContext, methodContext, { reconciledTransactions });

  await Promise.all(
    reconciledTransactions.map(async (transaction: any) => {
      try {
        const xTransfer = convertFromDbTransfer(transaction);

        const executeParams: ExecuteArgs = {
          params: xTransfer.xparams,
          routers: [],
          routerSignatures: [],
          sequencer: constants.AddressZero,
          sequencerSignature: "0x",
        };

        const transferId = xTransfer.transferId;

        execute(executeParams, transferId);
      } catch (error: any) {
        logger.error("Error Cartographer Binding", requestContext, methodContext, jsonifyError(error as NxtpError), {
          transaction,
        });
      }
    }),
  );
};

export const getReconciledTransactions = async (): Promise<any> => {
  const { requestContext, methodContext } = createLoggingContext(getReconciledTransactions.name);
  const { logger, config } = getContext();

  // Paginate through all reconciled transactions
  let offset = 0;
  const pageSize = 100;
  let nextPage = true;
  let data: any[] = [];

  while (nextPage) {
    const statusIdentifier = `status=eq.Reconciled&${transfersCastForUrl}`;
    const rangeIdentifier = `&limit=${pageSize}&offset=${offset}`;
    const uri = formatUrl(config.cartographerUrl, "transfers?", statusIdentifier + rangeIdentifier);
    logger.debug("Getting transactions from URI", requestContext, methodContext, { uri });
    try {
      const response = await axios.get(uri);
      if (response.data.length > 0) {
        data = [...data, ...response.data];
      } else {
        nextPage = false;
        return data;
      }
    } catch (error: any) {
      nextPage = false;
      throw new CartoApiRequestFailed({ uri, error: jsonifyError(error as NxtpError) });
    }
    offset += pageSize;
  }
};
