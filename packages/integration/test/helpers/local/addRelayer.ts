import { createLoggingContext, Logger } from "@connext/nxtp-utils";
import { ConnextInterface } from "@connext/nxtp-contracts";
import { TransactionService } from "@connext/nxtp-txservice";

export const addRelayer = async (
  domains: { domain: string; relayer: string; Connext: string }[],
  txService: TransactionService,
  logger: Logger,
) => {
  const { requestContext, methodContext } = createLoggingContext(addRelayer.name);
  for (const domain of domains) {
    logger.info("addRelayer ", requestContext, methodContext, { domain });
    const relayerApprovedData = ConnextInterface.encodeFunctionData("approvedRelayers", [domain.relayer]);
    const encoded = await txService.readTx({
      chainId: +domain.domain,
      data: relayerApprovedData,
      to: domain.Connext,
    });
    const [isApproved] = ConnextInterface.decodeFunctionResult("approvedRelayers", encoded);
    logger.info("Check approved", requestContext, methodContext, { isApproved });
    if (!isApproved) {
      logger.info(`Adding a relayer`, requestContext, methodContext, { relayer: domain.relayer });
      const approveRelayerData = ConnextInterface.encodeFunctionData("addRelayer", [domain.relayer]);
      await txService.sendTx(
        {
          chainId: +domain.domain,
          to: domain.Connext,
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
