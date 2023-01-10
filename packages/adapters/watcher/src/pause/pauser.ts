import { domainToChainId, ConnextInterface } from "@connext/nxtp-contracts";
import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";
import { constants, utils } from "ethers";

import { PauseResponse, Verifier } from "../types";

export class Pauser extends Verifier {
  /**
   *
   * @param reason
   * @param domains
   * @returns boolean[] array mapped to domains[] indicating whether the pausing for each
   * domain was successful.
   */
  public async pause(reason: string, domains: string[]): Promise<PauseResponse[]> {
    const { requestContext, methodContext } = createLoggingContext(this.pause.name);
    const { logger, txservice } = this.context;

    const result: PauseResponse[] = [];
    for (const domain of domains) {
      try {
        logger.info(`Trying to pause for domain ${domain}. reason: ${reason}`, requestContext, methodContext, {
          domain,
        });

        const chainId = domainToChainId(+domain);
        const connext = this.getConnextDeployment(chainId);

        const connextInterface = new utils.Interface(connext.abi as string[]);

        // 1. First check if paused already
        const encoded = await txservice.readTx({
          domain: +domain,
          to: connext.address,
          data: connextInterface.encodeFunctionData("paused"),
        });
        const [paused] = ConnextInterface.decodeFunctionResult("paused", encoded);

        // 2. If not paused, call pause tx
        if (!paused) {
          const pauseCalldata = connextInterface.encodeFunctionData("pause");

          const from = await txservice.getAddress();

          try {
            // TODO: send at 1.5x estimate
            const receipt = await txservice.sendTx(
              {
                to: connext.address,
                data: pauseCalldata,
                value: constants.Zero,
                domain: +domain,
                from,
              },
              requestContext,
            );
            result.push({
              domain,
              paused: true,
              error: null,
              relevantTransaction: receipt.transactionHash,
            });
          } catch (error: unknown) {
            logger.warn("Pause Tx: Transaction Failed", requestContext, methodContext, {
              error: jsonifyError(error as Error),
              calldata: pauseCalldata,
            });
            result.push({
              domain,
              paused: false,
              error: error,
              relevantTransaction: "",
            });
          }
        } else {
          result.push({
            domain,
            paused: false,
            error: new Error("Already Paused"),
            relevantTransaction: "",
          });
        }
      } catch (error: unknown) {
        logger.warn(
          `Pause Tx: Iteration for domain ${domain} failed!`,
          requestContext,
          methodContext,
          jsonifyError(error as Error),
        );
        result.push({
          domain,
          paused: false,
          error: error,
          relevantTransaction: "",
        });
      }
    }
    return result;
  }
}
