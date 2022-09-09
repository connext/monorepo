import { TransactionService } from "@connext/nxtp-txservice";
import { createRequestContext } from "@connext/nxtp-utils";
import { canonizeId, ConnextHandlerInterface } from "@connext/nxtp-contracts";
import { BigNumber, BytesLike, constants, utils } from "ethers";
import Router from "@connext/nxtp-contracts/artifacts/contracts/core/Router.sol/Router.json";

export const enrollHandlers = async (
  handlers: {
    chain: number;
    domain: string;
    ConnextHandler: string;
    BridgeRouterUpgradeBeaconProxy: string;
    PromiseRouterUpgradeBeaconProxy: string;
    RelayerFeeRouterUpgradeBeaconProxy: string;
  }[],
  txService: TransactionService,
) => {
  const requestContext = createRequestContext(enrollHandlers.name);
  const RouterInterface = new utils.Interface(Router.abi);
  for (const handlerName of [
    "BridgeRouterUpgradeBeaconProxy",
    "PromiseRouterUpgradeBeaconProxy",
    "RelayerFeeRouterUpgradeBeaconProxy",
  ]) {
    for (const handler of handlers) {
      const otherHandlers = handlers.filter((h) => h.domain !== handler.domain);
      for (const otherHandler of otherHandlers) {
        const canonized = utils.hexlify(canonizeId((otherHandler as any)[handlerName] as BytesLike));
        const registeredData = RouterInterface.encodeFunctionData("remotes", [otherHandler.domain]);
        console.log("Reading remotes for", handlerName, handler.domain, ">", otherHandler.domain);
        const encoded = await txService.readTx({
          chainId: handler.chain,
          data: registeredData,
          to: (handler as any)[handlerName],
        });
        const [remote] = RouterInterface.decodeFunctionResult("remotes", encoded);

        // check if already registered
        if (remote !== canonized) {
          const data = RouterInterface.encodeFunctionData("enrollRemoteRouter", [otherHandler.domain, canonized]);

          await txService.sendTx(
            { chainId: handler.chain, to: (handler as any)[handlerName], data, value: 0 },
            requestContext,
          );
        }
      }
    }
  }

  // TODO: If Connext === bridge router, this contract property will be removed; remove
  // the following code in that case!
  // Set the bridge router in Connext contract.
  for (const handler of handlers) {
    const chainId = handler.chain;
    const to = handler.ConnextHandler;
    const res = await txService.readTx({
      to,
      data: ConnextHandlerInterface.encodeFunctionData("bridgeRouter"),
      chainId,
    });
    const bridgeRouter = ConnextHandlerInterface.decodeFunctionResult("bridgeRouter", res)[0];

    // If bridge router is not set, we need to set it to be the BridgeRouterUpgradeBeaconProxy address.
    if (bridgeRouter === constants.AddressZero) {
      await txService.sendTx(
        {
          to,
          data: ConnextHandlerInterface.encodeFunctionData("setBridgeRouter", [handler.BridgeRouterUpgradeBeaconProxy]),
          chainId,
          value: BigNumber.from("0"),
        },
        requestContext,
      );
    }
  }
};
