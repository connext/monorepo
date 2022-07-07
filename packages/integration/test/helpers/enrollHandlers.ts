import { TransactionService } from "@connext/nxtp-txservice";
import { createRequestContext } from "@connext/nxtp-utils";
import { canonizeId, ConnextHandlerInterface } from "@connext/nxtp-contracts";
import { BytesLike, utils } from "ethers";

export const enrollHandlers = async (
  handlers: {
    domain: string;
    ConnextHandler: string;
    PromiseRouterUpgradeBeaconProxy: string;
    RelayerFeeRouterUpgradeBeaconProxy: string;
  }[],
  txService: TransactionService,
) => {
  const requestContext = createRequestContext(enrollHandlers.name);
  for (const handlerName of [
    "ConnextHandler",
    "PromiseRouterUpgradeBeaconProxy",
    "RelayerFeeRouterUpgradeBeaconProxy",
  ]) {
    for (const handler of handlers) {
      const otherHandlers = handlers.filter((h) => h.domain !== handler.domain);
      for (const otherHandler of otherHandlers) {
        const canonized = utils.hexlify(canonizeId((otherHandler as any)[handlerName] as BytesLike));
        const registeredData = ConnextHandlerInterface.encodeFunctionData("remotes", [otherHandler.domain]);
        const encoded = await txService.readTx({
          chainId: +handler.domain,
          data: registeredData,
          to: (handler as any)[handlerName],
        });

        const [remote] = ConnextHandlerInterface.decodeFunctionResult("remotes", encoded);
        // check if already registered
        if (remote !== canonized) {
          const data = ConnextHandlerInterface.encodeFunctionData("enrollRemoteRouter", [
            otherHandler.domain,
            canonized,
          ]);
          await txService.sendTx(
            { chainId: +handler.domain, to: (handler as any)[handlerName], data, value: 0 },
            requestContext,
          );
        }
      }
    }
  }
};
