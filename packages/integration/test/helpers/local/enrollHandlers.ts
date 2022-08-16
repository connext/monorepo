import { TransactionService } from "@connext/nxtp-txservice";
import { createRequestContext } from "@connext/nxtp-utils";
import { canonizeId } from "@connext/nxtp-contracts";
import { BytesLike, utils } from "ethers";
import Router from "@connext/nxtp-contracts/artifacts/contracts/core/shared/Router.sol/Router.json";

export const enrollHandlers = async (
  handlers: {
    chain: number;
    domain: string;
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
        console.log("3", encoded);
        const [remote] = RouterInterface.decodeFunctionResult("remotes", encoded);
        console.log("4", remote, canonized);
        console.log((otherHandler as any)[handlerName]);
        console.log((handler as any)[handlerName]);

        // check if already registered
        if (remote !== canonized) {
          const data = RouterInterface.encodeFunctionData("enrollRemoteRouter", [otherHandler.domain, canonized]);
          // const wallet = Wallet.fromMnemonic(
          //   "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",
          // ).connect(new providers.JsonRpcProvider())

          await txService.sendTx(
            { chainId: handler.chain, to: (handler as any)[handlerName], data, value: 0 },
            requestContext,
          );
        }
      }
    }
  }
};
