import { convertFromDbTransfer, createLoggingContext, XTransfer, XTransferStatus } from "@connext/nxtp-utils";
import { SdkBase, SdkUtils, SdkXCallParams } from "@connext/sdk-core";
import { pollSomething } from "../../helpers/shared";
import { PARAMETERS as _PARAMETERS, SUBG_POLL_PARITY } from "../../constants/local";
import { logger } from "./logger";

const { requestContext, methodContext } = createLoggingContext("e2e");

export const getTransferByTransactionHash = async (
  sdkUtils: SdkUtils,
  domain: string,
  transactionHash: string,
): Promise<XTransfer> => {
  logger.info(`Fetching the origin transfer using sdk...`, requestContext, methodContext, {
    domain,
    txHash: transactionHash,
  });

  const startTime = Date.now();
  const xTransfer: XTransfer | undefined = await pollSomething({
    // Attempts will be made for 2 minutes.
    attempts: Math.floor(120_000 / SUBG_POLL_PARITY),
    parity: SUBG_POLL_PARITY,
    method: async () => {
      try {
        const dbTransfer = await sdkUtils.getTransfers({ transactionHash });
        if (dbTransfer.length === 0) {
          logger.info("No results! Waiting for next loop...");
          return undefined;
        }
        const transfer = convertFromDbTransfer(dbTransfer[0]);
        logger.info("Transfer found!", undefined, undefined, { transfer });
        if (transfer.origin!.xcall!.transactionHash) {
          return transfer;
        }
        return undefined;
      } catch (e: unknown) {
        console.warn(e);
        logger.info("Waiting for next loop...");
      }
      return undefined;
    },
  });
  const endTime = Date.now();

  if (!xTransfer) {
    logger.info("Failed to retrieve xcalled transfer from the cartographer-api.", requestContext, methodContext, {
      domain: domain,
      etc: {
        polled: `${(endTime - startTime) / 1_000}s.`,
      },
    });
    throw new Error("Failed to retrieve xcalled transfer from the cartographer-api.");
  }

  logger.info("XCall retrieved.", requestContext, methodContext, {
    domain,
    etc: {
      took: `${endTime - startTime}ms.`,
      transferID: xTransfer?.transferId,
      xTransfer,
    },
  });
  return xTransfer;
};

export const getTransferById = async (
  sdkUtils: SdkUtils,
  domain: string,
  transferId: string,
  targetStatus?: XTransferStatus,
): Promise<XTransfer> => {
  logger.info("Fetching the destination transfer using sdk...", requestContext, methodContext, {
    domain,
    transferId,
    targetStatus,
  });

  const startTime = Date.now();
  const xTransfer: XTransfer | undefined = await pollSomething({
    // Attempts will be made for 3 minutes.
    attempts: Math.floor(180_000 / SUBG_POLL_PARITY),
    parity: SUBG_POLL_PARITY,
    method: async () => {
      try {
        const dbTransfer = await sdkUtils.getTransfers({ transferId });
        if (dbTransfer.length === 0) {
          logger.info("No results! Waiting for next loop...");
          return undefined;
        }

        const transfer = convertFromDbTransfer(dbTransfer[0]);
        if (transfer.destination?.status) {
          if (!targetStatus || (targetStatus && transfer.destination.status == targetStatus)) {
            logger.info("Destination transfer found", requestContext, methodContext, {
              domain,
              status: transfer.destination.status,
              targetStatus,
            });
            return transfer;
          }
        }
      } catch (e: unknown) {
        console.warn(e);
        logger.info("Waiting for next loop...");
      }
      return undefined;
    },
  });
  const endTime = Date.now();

  if (!xTransfer) {
    logger.info("Failed to retrieve execute transfer from the cartographer-api.", requestContext, methodContext, {
      domain,
      etc: {
        polled: `${(endTime - startTime) / 1_000}s`,
      },
    });
    throw new Error("Failed to retrieve execute transfer from the cartographer-api.");
  }

  logger.info("Execute transaction found.", requestContext, methodContext, {
    domain,
    hash: xTransfer.destination?.execute?.transactionHash,
    etc: {
      took: `${(endTime - startTime) / 1_000}s`,
    },
  });
  return xTransfer;
};
