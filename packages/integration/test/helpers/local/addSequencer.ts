import { createLoggingContext, Logger } from "@connext/nxtp-utils";
import { ConnextHandlerInterface } from "@connext/nxtp-contracts";
import { TransactionService } from "@connext/nxtp-txservice";

export const addSequencer = async (
  domains: { domain: string; sequencer: string; ConnextHandler: string }[],
  txService: TransactionService,
  logger: Logger,
) => {
  const { requestContext, methodContext } = createLoggingContext(addSequencer.name);
  for (const info of domains) {
    const { domain, sequencer, ConnextHandler } = info;
    const relayerApprovedData = ConnextHandlerInterface.encodeFunctionData("approvedSequencers", [sequencer]);
    const encoded = await txService.readTx({
      chainId: +domain,
      data: relayerApprovedData,
      to: ConnextHandler,
    });
    const [isApproved] = ConnextHandlerInterface.decodeFunctionResult("approvedSequencers", encoded);
    if (!isApproved) {
      logger.info("Whitelisting sequencer...", requestContext, methodContext, { domain, sequencer, isApproved });
      const approveRelayerData = ConnextHandlerInterface.encodeFunctionData("addSequencer", [sequencer]);
      await txService.sendTx(
        {
          chainId: +domain,
          to: ConnextHandler,
          data: approveRelayerData,
          value: 0,
        },
        requestContext,
      );
    } else {
      logger.info("Sequencer already whitelisted for this domain.", requestContext, methodContext, {
        domain,
        sequencer,
        isApproved,
      });
    }
  }
};
