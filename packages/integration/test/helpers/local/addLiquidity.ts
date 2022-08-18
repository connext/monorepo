import { createLoggingContext, Logger } from "@connext/nxtp-utils";
import { ConnextHandlerInterface } from "@connext/nxtp-contracts";
import { getErc20Interface, TransactionService } from "@connext/nxtp-txservice";
import { BigNumber } from "ethers";

export const addLiquidity = async (
  domains: { domain: string; router: string; asset: string; amount: string; ConnextHandler: string }[],
  txService: TransactionService,
  logger: Logger,
) => {
  const { requestContext, methodContext } = createLoggingContext(addLiquidity.name);
  for (const domain of domains) {
    logger.info("addLiquidity", requestContext, methodContext, { domain });
    const allowanceData = getErc20Interface().encodeFunctionData("allowance", [domain.router, domain.ConnextHandler]);
    const encoded = await txService.readTx({ chainId: +domain.domain, data: allowanceData, to: domain.asset });
    const [allowance] = getErc20Interface().decodeFunctionResult("allowance", encoded);

    if (BigNumber.from(allowance.toString()).lt(domain.amount)) {
      const approveData = getErc20Interface().encodeFunctionData("approve", [domain.ConnextHandler, domain.amount]);
      await txService.sendTx(
        { chainId: +domain.domain, to: domain.asset, data: approveData, value: 0 },
        requestContext,
      );
    }

    const addLiquidityData = ConnextHandlerInterface.encodeFunctionData("addRouterLiquidityFor", [
      domain.amount,
      domain.asset,
      domain.router,
    ]);

    await txService.sendTx(
      {
        chainId: +domain.domain,
        to: domain.ConnextHandler,
        data: addLiquidityData,
        value: 0,
      },
      requestContext,
    );
  }
};
