import { createRequestContext } from "@connext/nxtp-utils";
import { ConnextInterface } from "@connext/smart-contracts";
import { TransactionService } from "@connext/nxtp-txservice";
import { constants } from "ethers";

export const setupRouter = async (
  routerAddress: string,
  domains: { domain: string; Connext: string }[],
  txService: TransactionService,
) => {
  const requestContext = createRequestContext(setupRouter.name);
  const configData = ConnextInterface.encodeFunctionData("initializeRouter", [routerAddress, routerAddress]);
  const addData = ConnextInterface.encodeFunctionData("approveRouter", [routerAddress]);
  for (const domain of domains) {
    // 1. Check to ensure router needs to be updated
    let readData = ConnextInterface.encodeFunctionData("getRouterApproval", [routerAddress]);
    let encodedRes = await txService.readTx({
      domain: +domain.domain,
      data: readData,
      to: domain.Connext,
    });
    const [approved] = ConnextInterface.decodeFunctionResult("getRouterApproval", encodedRes);

    // 2. Check to ensure router is configured correctly
    readData = ConnextInterface.encodeFunctionData("getRouterOwner", [routerAddress]);
    encodedRes = await txService.readTx({
      domain: +domain.domain,
      data: readData,
      to: domain.Connext,
    });
    const [owner] = ConnextInterface.decodeFunctionResult("getRouterOwner", encodedRes);

    readData = ConnextInterface.encodeFunctionData("getRouterRecipient", [routerAddress]);
    encodedRes = await txService.readTx({
      domain: +domain.domain,
      data: readData,
      to: domain.Connext,
    });
    const [recipient] = ConnextInterface.decodeFunctionResult("getRouterRecipient", encodedRes);

    if (!approved) {
      // Must approve router
      await txService.sendTx({ to: domain.Connext, data: addData, value: 0, domain: +domain.domain }, requestContext);
    }

    if (owner === constants.AddressZero && recipient === constants.AddressZero) {
      // Must initialize router
      await txService.sendTx(
        { to: domain.Connext, data: configData, value: 0, domain: +domain.domain },
        requestContext,
      );
    } else if (owner !== routerAddress || recipient !== routerAddress) {
      throw new Error(
        `Router misconfigured; script only setup for initializing. router: ${routerAddress}, owner: ${owner}, recipient: ${recipient}`,
      );
    }
  }
};
