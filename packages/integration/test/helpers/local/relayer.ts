import { TransactionService } from "@connext/nxtp-txservice";
import { Logger } from "@connext/nxtp-utils";

/**
 * SourceConnector.sol
 * Gets the latest outboundRoot and packages into a message
 */
export const send = async (domain: string, connector: string, txservice: TransactionService, logger: Logger) => {
  throw new Error("Not implemented yet");
};

/**
 * RootManager.sol
 * This is called by relayers to generate + send the mixed root from mainnet via AMB to spoke domains
 */
export const propagate = async (domain: string, rootManager: string, txservice: TransactionService, logger: Logger) => {
  throw new Error("Not implemented yet");
};

/**
 * DestConnector.sol
 * This is called on the destination domain to handle incoming messages.
 */
export const proveAndProcess = async (
  domain: string,
  connector: string,
  txservice: TransactionService,
  logger: Logger,
) => {
  throw new Error("Not implemented yet");
};
