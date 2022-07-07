import { createRequestContext } from "@connext/nxtp-utils";
import { ConnextHandlerInterface } from "@connext/nxtp-contracts";
import { getErc20Interface, TransactionService } from "@connext/nxtp-txservice";
import { BigNumber } from "ethers";

export const addLiquidity = async (
  domains: { domain: string; router: string; asset: string; amount: string; ConnextHandler: string }[],
  txService: TransactionService,
) => {
  const requestContext = createRequestContext(addLiquidity.name);
  for (const domain of domains) {
    const allowanceData = getErc20Interface().encodeFunctionData("allowance", [domain.router, domain.ConnextHandler]);
    let encoded = await txService.readTx({ chainId: +domain.domain, data: allowanceData, to: domain.asset });
    const [allowance] = getErc20Interface().decodeFunctionResult("allowance", encoded);

    const balanceData = getErc20Interface().encodeFunctionData("balanceOf", [domain.router]);
    encoded = await txService.readTx({ chainId: +domain.domain, data: balanceData, to: domain.asset });
    const [balance] = getErc20Interface().decodeFunctionResult("balanceOf", encoded);

    console.log("> domain: ", domain);
    console.log("> router balance: ", balance.toString());
    console.log("> allowance: ", allowance.toString());

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
