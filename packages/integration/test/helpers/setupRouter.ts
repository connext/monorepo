import { createRequestContext } from "@connext/nxtp-utils";
import { ConnextHandlerAbi } from "@connext/nxtp-contracts";
import { utils } from "ethers";
import { TransactionService } from "@connext/nxtp-txservice";

export const setupRouter = async (
  routerAddress: string,
  domains: { domain: string; ConnextHandler: string }[],
  txService: TransactionService,
) => {
  const requestContext = createRequestContext(setupRouter.name);
  const data = new utils.Interface(ConnextHandlerAbi as string[]).encodeFunctionData("setupRouter", [
    routerAddress,
    routerAddress,
    routerAddress,
  ]);
  for (const domain of domains) {
    await txService.sendTx({ to: domain.ConnextHandler, data, value: 0, chainId: +domain }, requestContext);
  }
};
