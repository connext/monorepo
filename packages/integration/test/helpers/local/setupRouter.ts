import { createRequestContext } from "@connext/nxtp-utils";
import { ConnextInterface } from "@connext/nxtp-contracts";
import { TransactionService } from "@connext/nxtp-txservice";

export const setupRouter = async (
  routerAddress: string,
  domains: { domain: string; Connext: string }[],
  txService: TransactionService,
) => {
  const requestContext = createRequestContext(setupRouter.name);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const data = ConnextInterface.encodeFunctionData("setupRouter" as any, [routerAddress, routerAddress, routerAddress]);
  for (const domain of domains) {
    let readData = ConnextInterface.encodeFunctionData("getRouterApproval", [routerAddress]);
    let encodedRes = await txService.readTx({
      chainId: +domain.domain,
      data: readData,
      to: domain.Connext,
    });
    const [approved] = ConnextInterface.decodeFunctionResult("getRouterApproval", encodedRes);

    readData = ConnextInterface.encodeFunctionData("getRouterOwner", [routerAddress]);
    encodedRes = await txService.readTx({
      chainId: +domain.domain,
      data: readData,
      to: domain.Connext,
    });
    const [owner] = ConnextInterface.decodeFunctionResult("getRouterOwner", encodedRes);

    readData = ConnextInterface.encodeFunctionData("getRouterRecipient", [routerAddress]);
    encodedRes = await txService.readTx({
      chainId: +domain.domain,
      data: readData,
      to: domain.Connext,
    });
    const [recipient] = ConnextInterface.decodeFunctionResult("getRouterRecipient", encodedRes);

    if (!approved || owner !== routerAddress || recipient !== routerAddress) {
      await txService.sendTx({ to: domain.Connext, data, value: 0, chainId: +domain.domain }, requestContext);
    }
  }
};
