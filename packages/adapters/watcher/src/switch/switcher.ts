import { createMethodContext, domainToChainId, jsonifyError, RequestContext } from "@connext/nxtp-utils";
import { BigNumber, constants, utils, providers } from "ethers";

import { SwitchResponse, Verifier } from "../types";
import { TransactionService, WriteTransaction } from "@connext/nxtp-txservice";

export class Switcher extends Verifier {
  /**
   *
   * @param reason
   * @param hubDomain
   * @returns object containing the information that indicates whether the switch to slow mode was successful in the hub domain.
   */
  public async switch(requestContext: RequestContext, reason: string, hubDomain: number): Promise<SwitchResponse> {
    const methodContext = createMethodContext(this.switch.name);
    const { logger, txservice } = this.context;
    let receipt: providers.TransactionReceipt;

    try {
      logger.info(`Trying to switch to slow mode in the hub domain. Reason: ${reason}`, requestContext, methodContext, {
        reason,
      });

      const hubDomainChainId = domainToChainId(hubDomain);
      const rootManager = this.getRootManagerDeployment(hubDomainChainId);

      const rootManagerInterface = new utils.Interface(rootManager.abi as string[]);

      // 1. First check if we are in optimistic mode
      const inOptimisticMode = await this.checkIfInOptimisticMode(rootManagerInterface, rootManager.address, hubDomain);

      // 2. If in slow mode, do nothing.
      if (!inOptimisticMode) {
        this.context.logger.debug("Already in slow mode", requestContext, methodContext, {
          hubDomain,
          hubDomainChainId,
          rootManager: rootManager.address,
          inOptimisticMode,
        });
        return {
          domain: hubDomain,
          switched: false,
          error: new Error("Already In Slow Mode"),
          relevantTransaction: "",
        };
      }

      // 3. If in optimistic mode, send the tx.
      const gasPrice = await txservice.getGasPrice(hubDomain, requestContext);

      // 4. Populate switch transaction
      const tx = {
        to: rootManager.address,
        data: rootManagerInterface.encodeFunctionData("activateSlowMode"),
        value: constants.Zero,
        domain: hubDomain,
        from: await txservice.getAddress(),
        gasPrice: gasPrice.mul(2),
      };

      logger.debug("Sending switch tx", requestContext, methodContext, {
        chain: hubDomainChainId,
        ...tx,
        value: tx.value.toString(),
        gasPrice: tx.gasPrice!.toString(),
        price: gasPrice.toString(),
      });

      // 5. Send tx
      receipt = await txservice.sendTx(tx, requestContext);
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

      return {
        domain: hubDomain,
        switched: false,
        error: (error as Error).message ?? error,
        relevantTransaction: receipt!?.transactionHash ?? "", // in case tx was send correctly but after code had an error.
      };
    }
  }

  /**
   * @notice Checks if the root manager contract is in optimistic mode.
   * @param rootManagerInterface The interface of the RootManager
   * @param rootManagerAddress   The address of the RootManager contract
   * @param hubDomain            The hub domain
   * @returns inOptimisticMode - A boolean indicating whether the root manager is in optimistic mode or not.
   */
  private async checkIfInOptimisticMode(
    rootManagerInterface: utils.Interface,
    rootManagerAddress: string,
    hubDomain: number,
  ): Promise<boolean> {
    const optimisticModeRes = await this.context.txservice.readTx({
      domain: hubDomain,
      to: rootManagerAddress,
      data: rootManagerInterface.encodeFunctionData("optimisticMode"),
    });

    const [inOptimisticMode] = rootManagerInterface.decodeFunctionResult("optimisticMode", optimisticModeRes) as [
      boolean,
    ];
    return inOptimisticMode;
  }
}
