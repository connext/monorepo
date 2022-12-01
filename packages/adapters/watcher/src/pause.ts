import { domainToChainId } from "@connext/nxtp-contracts";
import { getDeployedConnextContract } from "@connext/nxtp-txservice";
import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";
import { constants, utils } from "ethers";

import { CallContext } from "./types";

export const pause = async (context: CallContext, reason: string, domains: string[]): Promise<boolean> => {
  const { requestContext, methodContext } = createLoggingContext(pause.name);
  const { logger } = context;

  for (const domain of domains) {
    logger.info("pause", requestContext, methodContext, { domain });

    const chainId = domainToChainId(+domain);
    const connext = getDeployedConnextContract(chainId, context.isStaging ? "Staging" : "");
    if (!connext) {
      // TODO: Custom errors for package
      throw new Error("Connext deployment not found!");
    }

    const connextInterface = new utils.Interface(connext.abi as string[]);

    // 1. First check if paused already
    const paused = await context.txservice.readTx({
      chainId,
      to: connext.address,
      data: connextInterface.encodeFunctionData("paused", []),
    });

    // 2. If not paused, call pause tx
    if (!paused) {
      const pauseCalldata = connextInterface.encodeFunctionData("pause", []);

      try {
        const receipt = await context.txservice.sendTx(
          { to: connext.address, data: pauseCalldata, value: constants.Zero, chainId },
          requestContext,
        );

        if (!receipt) {
        }
      } catch (error: unknown) {
        logger.debug(`Sending Pause Tx Get Error`, requestContext, methodContext, jsonifyError(error as Error));
      }
    }
  }
  return false;
};
