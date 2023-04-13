import { ConnextInterface } from "@connext/smart-contracts";
import { createMethodContext, domainToChainId, jsonifyError, RequestContext } from "@connext/nxtp-utils";
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
  public async pause(requestContext: RequestContext, reason: string, domains: string[]): Promise<PauseResponse[]> {
    const methodContext = createMethodContext(this.pause.name);
    const { logger, txservice } = this.context;

    // helper function so we can send off all pausing simultaneously
    const pauseDomain = async (domain: string) => {
      try {
        logger.info(`Trying to pause for domain ${domain}. reason: ${reason}`, requestContext, methodContext, {
          domain,
          reason,
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

          // Get gas price
          const price = await txservice.getGasPrice(+domain, requestContext);

          try {
            const tx = {
              to: connext.address,
              data: pauseCalldata,
              value: constants.Zero,
              domain: +domain,
              from: await txservice.getAddress(),
              gasPrice: price.mul(2),
            };
            logger.debug("Sending pause tx", requestContext, methodContext, {
              chain: chainId,
              ...tx,
              value: tx.value.toString(),
              gasPrice: tx.gasPrice.toString(),
              price: price.toString(),
            });
            const receipt = await txservice.sendTx(
              {
                to: connext.address,
                data: pauseCalldata,
                value: constants.Zero,
                domain: +domain,
                from: await txservice.getAddress(),
                gasPrice: price.mul(2),
              },
              requestContext,
            );
            return {
              domain,
              paused: true,
              error: null,
              relevantTransaction: receipt.transactionHash,
            };
          } catch (error: unknown) {
            logger.error("Pause Tx: Transaction Failed", requestContext, methodContext, jsonifyError(error as Error));
            return {
              domain,
              paused: false,
              error: error,
              relevantTransaction: "",
            };
          }
        } else {
          this.context.logger.debug("Already paused", requestContext, methodContext, {
            domain,
            chainId,
            connext: connext.address,
            paused,
          });
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
