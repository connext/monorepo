import {
  createLoggingContext,
  ExecuteArgs,
  jsonifyError,
  NxtpError,
  formatUrl,
  convertFromDbTransfer,
  transfersCastForUrl,
} from "@connext/nxtp-utils";
import { constants } from "ethers";

import { CartoApiRequestFailed } from "../../../errors";
import { axiosGet } from "../../../mockable";
import { getContext } from "../executor";

import { execute } from "./execute";

export const pollCartographer = async () => {
  const { requestContext, methodContext } = createLoggingContext(pollCartographer.name);
  const { logger } = getContext();

  let offset = 0;
  const pageSize = 10;
  let nextPage = true;
  while (nextPage) {
    logger.debug(`Method start: ${pollCartographer.name}`, requestContext, methodContext, {
      offset,
      pageSize,
      nextPage,
    });
    const { data: reconciledTransactions, nextPage: _nextPage } = await getReconciledTransactions({ offset, pageSize });
    nextPage = _nextPage;
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

    offset += pageSize;
  }
};

export const getReconciledTransactions = async (param: {
  offset: number;
  pageSize: number;
}): Promise<{ data: any; nextPage: boolean }> => {
  const { requestContext, methodContext } = createLoggingContext(getReconciledTransactions.name);
  const { logger, config } = getContext();

  const { offset, pageSize } = param;
  let nextPage = true;
  let data: any[] = [];

  const statusIdentifier = `status=eq.Reconciled&${transfersCastForUrl}`;
  const rangeIdentifier = `&limit=${pageSize}&offset=${offset}`;
  const uri = formatUrl(config.cartographerUrl, "transfers?", statusIdentifier + rangeIdentifier);
  logger.debug("Getting transactions from URI", requestContext, methodContext, { uri });
  try {
    const response = await axiosGet(uri);
    if (response.data.length > 0) {
      data = [...data, ...response.data];
    } else {
      nextPage = false;
    }
  } catch (error: any) {
    nextPage = false;
    throw new CartoApiRequestFailed({ uri, error: jsonifyError(error as NxtpError) });
  }

  return { data, nextPage };
};
