import {
  BidStatusSchema,
  createMethodContext,
  domainToChainId,
  jsonifyError,
  RequestContext,
} from "@connext/nxtp-utils";
import { constants, utils } from "ethers";

import { SwitchResponse, Verifier } from "../types";

export class Switcher extends Verifier {
  /**
   *
   * @param reason
   * @param hubDomain
   * @returns object containing the information that indicates whether the switch to slow mode was successful in the hub domain.
   */
  public async switch(requestContext: RequestContext, reason: string, hubDomain: string): Promise<SwitchResponse> {
    const methodContext = createMethodContext(this.switch.name);
    const { logger, txservice } = this.context;

    try {
      logger.info(`Trying to switch to slow mode in the hub domain. Reason: ${reason}`, requestContext, methodContext, {
        reason,
      });

      const hubDomainChainId = domainToChainId(+hubDomain);
      const rootManager = this.getRootManagerDeployment(hubDomainChainId);

      const rootManagerInterface = new utils.Interface(rootManager.abi as string[]);

      // 1. First check if we are in optimistic mode
      const optimisticModeRes = await txservice.readTx({
        domain: +hubDomain,
        to: rootManager.address,
        data: rootManagerInterface.encodeFunctionData("optimisticMode"),
      });

      const [isOptimistic] = rootManagerInterface.decodeFunctionResult("optimisticMode", optimisticModeRes) as [
        boolean,
      ];

      // 2. If in slow mode, do nothing.
      if (!isOptimistic) {
        this.context.logger.debug("Already in slow mode", requestContext, methodContext, {
          hubDomain,
          hubDomainChainId,
          rootManager: rootManager.address,
          isOptimistic,
        });
        return {
          domain: hubDomain,
          switched: false,
          error: new Error("Already In Slow Mode"),
          relevantTransaction: "",
        };
      }

      // 3. If in optimistic mode, send the tx.
      const switchCallData = rootManagerInterface.encodeFunctionData("activateSlowMode");

      const gasPrice = await txservice.getGasPrice(+hubDomain, requestContext);

      const tx = {
        to: rootManager.address,
        data: switchCallData,
        value: constants.Zero,
        domain: +hubDomain,
        from: await txservice.getAddress(),
        gasPrice: gasPrice.mul(2),
      };
      logger.debug("Sending switch tx", requestContext, methodContext, {
        chain: hubDomainChainId,
        ...tx,
        value: tx.value.toString(),
        gasPrice: tx.gasPrice.toString(),
        price: gasPrice.toString(),
      });
      const receipt = await txservice.sendTx(tx, requestContext);
      return {
        domain: hubDomain,
        switched: !!receipt.status,
        error: !receipt.status ? "Transaction reverted" : "",
        relevantTransaction: receipt.transactionHash,
      };
    } catch (error: unknown) {
      logger.error(
        "Error when trying to switch to slow mode",
        requestContext,
        methodContext,
        jsonifyError(error as Error),
      );
      throw error;
    }
  }
}
