import { domainToChainId } from "@connext/nxtp-contracts";
import { getDeployedConnextContract } from "@connext/nxtp-txservice";
import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";
import { constants, utils } from "ethers";

import { Verifier } from "../types";

export class Pauser extends Verifier {
  /**
   *
   * @param reason
   * @param domains
   * @returns boolean[] array mapped to domains[] indicating whether the pausing for each
   * domain was succesful.
   */
  public async pause(reason: string, domains: string[]): Promise<boolean[]> {
    const { requestContext, methodContext } = createLoggingContext(this.pause.name);
    const { logger, isStaging, txservice } = this.context;

    const success: boolean[] = [];
    for (const domain of domains) {
      try {
        logger.info("pause", requestContext, methodContext, { domain });

        const chainId = domainToChainId(+domain);
        const connext = getDeployedConnextContract(chainId, isStaging ? "Staging" : "");
        if (!connext) {
          // TODO: Custom errors for package
          throw new Error("Connext deployment not found!");
        }

        const connextInterface = new utils.Interface(connext.abi as string[]);

        // 1. First check if paused already
        const paused = await txservice.readTx({
          chainId,
          to: connext.address,
          data: connextInterface.encodeFunctionData("paused", []),
        });

        // 2. If not paused, call pause tx
        if (!paused) {
          const pauseCalldata = connextInterface.encodeFunctionData("pause", []);

          try {
            await txservice.sendTx(
              { to: connext.address, data: pauseCalldata, value: constants.Zero, chainId },
              requestContext,
            );
            success.push(true);
          } catch (error: unknown) {
            logger.warn("Pause Tx: Transaction Failed", requestContext, methodContext, jsonifyError(error as Error));
            success.push(false);
          }
        }
      } catch (error: unknown) {
        logger.warn(
          `Pause Tx: Iteration for domain ${domain} failed!`,
          requestContext,
          methodContext,
          jsonifyError(error as Error),
        );
        success.push(false);
      }
    }
    return success;
  }
}
