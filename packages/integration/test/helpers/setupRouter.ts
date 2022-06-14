import { createRequestContext } from "@connext/nxtp-utils";
import { ConnextHandlerInterface } from "@connext/nxtp-contracts";
import { TransactionService } from "@connext/nxtp-txservice";

export const setupRouter = async (
  routerAddress: string,
  domains: { domain: string; ConnextHandler: string }[],
  txService: TransactionService,
) => {
  const requestContext = createRequestContext(setupRouter.name);
  const data = ConnextHandlerInterface.encodeFunctionData("setupRouter", [routerAddress, routerAddress, routerAddress]);
  for (const domain of domains) {
    console.log("domain: ", domain);
    let readData = ConnextHandlerInterface.encodeFunctionData("getRouterApproval", [routerAddress]);
    const approved = await txService.readTx({
      chainId: +domain.domain,
      data: readData,
      to: domain.ConnextHandler,
    });
    readData = ConnextHandlerInterface.encodeFunctionData("getRouterOwner", [routerAddress]);
    const owner = await txService.readTx({
      chainId: +domain.domain,
      data: readData,
      to: domain.ConnextHandler,
    });
    readData = ConnextHandlerInterface.encodeFunctionData("getRouterRecipient", [routerAddress]);
    const recipient = await txService.readTx({
      chainId: +domain.domain,
      data: readData,
      to: domain.ConnextHandler,
    });
    if (!approved || owner !== routerAddress || recipient !== routerAddress) {
      await txService.sendTx({ to: domain.ConnextHandler, data, value: 0, chainId: +domain.domain }, requestContext);
    }
  }
};
