import { TransactionService } from "@connext/nxtp-txservice";
import { ConnectorInterface, RootManagerInterface } from "@connext/nxtp-contracts";
import { createLoggingContext, Logger } from "@connext/nxtp-utils";

/**
 * SourceConnector.sol
 * Gets the latest outboundRoot and packages into a message
 */
export const send = async (domain: string, connector: string, txService: TransactionService, logger: Logger) => {
  const { requestContext, methodContext } = createLoggingContext(send.name);
  logger.info("Sending a transfer message to destination domain", requestContext, methodContext, { domain, connector });
  const sendFuncData = ConnectorInterface.encodeFunctionData("send");
  await txService.sendTx(
    {
      chainId: +domain,
      to: connector,
      data: sendFuncData,
      value: 0,
    },
    requestContext,
  );
};

/**
 * RootManager.sol
 * This is called by relayers to generate + send the mixed root from mainnet via AMB to spoke domains
 */
export const propagate = async (
  mainnetDomain: string,
  rootManager: string,
  txService: TransactionService,
  logger: Logger,
) => {
  const { requestContext, methodContext } = createLoggingContext(propagate.name);
  logger.info("Sending the mixed root from mainnet to destination domain", requestContext, methodContext, {
    mainnetDomain,
    rootManager,
  });
  const propagateFuncData = RootManagerInterface.encodeFunctionData("propagate");
  await txService.sendTx(
    {
      chainId: +mainnetDomain,
      to: rootManager,
      data: propagateFuncData,
      value: 0,
    },
    requestContext,
  );
};

/**
 * DestConnector.sol
 * This is called on the destination domain to handle incoming messages.
 */
export const proveAndProcess = async (
  domain: string,
  connector: string,
  data: {
    _message: string;
    _proof: string;
    _index: string;
  },
  txService: TransactionService,
  logger: Logger,
) => {
  const { requestContext, methodContext } = createLoggingContext(proveAndProcess.name);
  logger.info("Proving and processing incoming messages", requestContext, methodContext, { domain, connector, data });
  const proveAndProcessFuncData = ConnectorInterface.encodeFunctionData("proveAndProcess", [
    data._message,
    data._proof,
    data._index,
  ]);
  await txService.sendTx(
    {
      chainId: +domain,
      to: connector,
      data: proveAndProcessFuncData,
      value: 0,
    },
    requestContext,
  );
};
