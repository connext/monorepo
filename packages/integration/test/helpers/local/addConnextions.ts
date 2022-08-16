import { TransactionService } from "@connext/nxtp-txservice";
import { createLoggingContext, Logger } from "@connext/nxtp-utils";
import { ConnextHandlerInterface } from "@connext/nxtp-contracts";

export const addConnextions = async (
  connextions: {
    chain: number;
    domain: string;
    ConnextHandler: string;
  }[],
  txService: TransactionService,
  logger: Logger,
) => {
  const { requestContext, methodContext } = createLoggingContext(addConnextions.name);

  await Promise.all(
    connextions.map(async (source) => {
      for (const target of connextions.filter((_c) => _c.domain !== source.domain)) {
        logger.info("Adding connextion", requestContext, methodContext, { source, target });
        const data = ConnextHandlerInterface.encodeFunctionData("addConnextion", [
          target.domain,
          target.ConnextHandler,
        ]);
        await txService.sendTx({ chainId: source.chain, to: source.ConnextHandler, data, value: 0 }, requestContext);
      }
    }),
  );
};
