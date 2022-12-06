import { domainToChainId, ConnextInterface } from "@connext/nxtp-contracts";
import { getDeployedConnextContract } from "@connext/nxtp-txservice";
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
    const { logger, isStaging, txservice } = this.context;

    const result: PauseResponse[] = [];
    for (const domain of domains) {
      try {
        logger.info(`Trying to pause for domain ${domain}. reason: ${reason}`, requestContext, methodContext, {
          domain,
        });

        const chainId = domainToChainId(+domain);
        const connext = getDeployedConnextContract(chainId, isStaging ? "Staging" : "");
        if (!connext) {
          // TODO: Custom errors for package
          throw new Error("Connext deployment not found!");
        }

        const connextInterface = new utils.Interface(connext.abi as string[]);

        // 1. First check if paused already
        const encoded = await txservice.readTx({
          chainId,
          to: connext.address,
          data: connextInterface.encodeFunctionData("paused", []),
        });
        const paused = ConnextInterface.decodeFunctionResult("paused", encoded)[0];

        // 2. If not paused, call pause tx
        if (!paused) {
          const pauseCalldata = connextInterface.encodeFunctionData("pause", []);

          try {
            const receipt = await txservice.sendTx(
              { to: connext.address, data: pauseCalldata, value: constants.Zero, chainId },
              requestContext,
            );
            result.push({
              domain,
              paused: true,
              error: null,
              relevantTransaction: receipt.transactionHash,
            });
          } catch (error: unknown) {
            logger.warn("Pause Tx: Transaction Failed", requestContext, methodContext, jsonifyError(error as Error));
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
