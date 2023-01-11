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

    // helper function so we can send off all pausing simultaneously
    const pauseDomain = async (domain: string) => {
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
          const tx = {
            to: connext.address,
            data: pauseCalldata,
            value: constants.Zero,
            domain: +domain,
            from,
          };

          try {
            // Get gasPrice
            const price = await txservice.getGasPrice(tx.domain, requestContext);
            // send at 2x price
            const receipt = await txservice.sendTx(tx, requestContext, price.mul(2));
            return {
              domain,
              paused: true,
              error: null,
              relevantTransaction: receipt.transactionHash,
            };
          } catch (error: unknown) {
            logger.warn("Pause Tx: Transaction Failed", requestContext, methodContext, jsonifyError(error as Error));
            return {
              domain,
              paused: false,
              error: error,
              relevantTransaction: "",
              calldata: pauseCalldata,
            };
          }
        } else {
          return {
            domain,
            paused: false,
            error: new Error("Already Paused"),
            relevantTransaction: "",
          };
        }
      } catch (error: unknown) {
        logger.warn(`Pause Tx: Iteration failed!`, requestContext, methodContext, {
          domain,
          error: jsonifyError(error as Error),
        });
        return {
          domain,
          paused: false,
          error: error,
          relevantTransaction: "",
        };
      }
    };

    const result = await Promise.all(domains.map((d) => pauseDomain(d)));
    return result;
  }
}
