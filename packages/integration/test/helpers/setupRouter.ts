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
    let encodedRes = await txService.readTx({
      chainId: +domain.domain,
      data: readData,
      to: domain.ConnextHandler,
    });
    const [approved] = ConnextHandlerInterface.decodeFunctionResult("getRouterApproval", encodedRes);
    console.log("approved: ", approved);
    readData = ConnextHandlerInterface.encodeFunctionData("getRouterOwner", [routerAddress]);
    encodedRes = await txService.readTx({
      chainId: +domain.domain,
      data: readData,
      to: domain.ConnextHandler,
    });

    const [owner] = ConnextHandlerInterface.decodeFunctionResult("getRouterOwner", encodedRes);

    console.log("owner: ", owner);
    readData = ConnextHandlerInterface.encodeFunctionData("getRouterRecipient", [routerAddress]);
    encodedRes = await txService.readTx({
      chainId: +domain.domain,
      data: readData,
      to: domain.ConnextHandler,
    });
    const [recipient] = ConnextHandlerInterface.decodeFunctionResult("getRouterRecipient", encodedRes);
    console.log("recipient: ", recipient);
    console.log("routerAddress: ", routerAddress);
    if (!approved || owner !== routerAddress || recipient !== routerAddress) {
      console.log("sending setupRouter tx...");
      await txService.sendTx({ to: domain.ConnextHandler, data, value: 0, chainId: +domain.domain }, requestContext);
    }
  }
};
