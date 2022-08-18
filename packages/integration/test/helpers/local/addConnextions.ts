import { TransactionService } from "@connext/nxtp-txservice";
import { createLoggingContext, Logger } from "@connext/nxtp-utils";
import { ConnextHandlerInterface } from "@connext/nxtp-contracts";
import { BigNumber } from "ethers";

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
        const data = ConnextHandlerInterface.encodeFunctionData("connextion", [target.domain]);
        const result = await txService.readTx({
          chainId: source.chain,
          to: source.ConnextHandler,
          data,
        });
        const connextion: string = ConnextHandlerInterface.decodeFunctionResult("connextion", result)[0];

        if (connextion !== target.ConnextHandler) {
          logger.info("Adding connextion.", requestContext, methodContext, { source, target });
          const data = ConnextHandlerInterface.encodeFunctionData("addConnextion", [
            target.domain,
            target.ConnextHandler,
          ]);

          await txService.sendTx(
            { chainId: source.chain, to: source.ConnextHandler, data, value: BigNumber.from("0") },
            requestContext,
          );
        } else {
          logger.info("Connextion already configured!", requestContext, methodContext, { source, target, connextion });
        }
      }
    }),
  );
};
