import { createLoggingContext, Logger } from "@connext/nxtp-utils";
import { ConnextHandlerInterface } from "@connext/nxtp-contracts";
import { TransactionService } from "@connext/nxtp-txservice";

export const addRelayer = async (
  domains: { domain: string; relayer: string; ConnextHandler: string }[],
  txService: TransactionService,
  logger: Logger,
) => {
  const { requestContext, methodContext } = createLoggingContext(addRelayer.name);
  for (const domain of domains) {
    logger.info("addRelayer ", requestContext, methodContext, { domain });
    const relayerApprovedData = ConnextHandlerInterface.encodeFunctionData("approvedRelayers", [domain.relayer]);
    const encoded = await txService.readTx({
      chainId: +domain.domain,
      data: relayerApprovedData,
      to: domain.ConnextHandler,
    });
    const [isApproved] = ConnextHandlerInterface.decodeFunctionResult("approvedRelayers", encoded);
    logger.info("Check approved", requestContext, methodContext, { isApproved });
    if (!isApproved) {
      logger.info(`Adding a relayer`, requestContext, methodContext, { relayer: domain.relayer });
      const approveRelayerData = ConnextHandlerInterface.encodeFunctionData("addRelayer", [domain.relayer]);
      await txService.sendTx(
        {
          chainId: +domain.domain,
          to: domain.ConnextHandler,
          data: approveRelayerData,
          value: 0,
        },
        requestContext,
      );
    } else {
      logger.info("Already added. Skipping", requestContext, methodContext);
    }
  }
};
