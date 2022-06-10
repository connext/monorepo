import { TransactionService } from "@connext/nxtp-txservice";
import { createRequestContext } from "@connext/nxtp-utils";
import { canonizeId } from "@connext/nxtp-contracts";
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
        const data = new utils.Interface([
          "function enrollRemoteRouter(uint32 _domain, bytes32 _router)",
        ]).encodeFunctionData("enrollRemoteRouter", [
          otherHandler.domain,
          utils.hexlify(canonizeId((otherHandler as any)[handlerName] as BytesLike)),
        ]);
        await txService.sendTx(
          { chainId: Number(handler.domain), to: (handler as any)[handlerName], data, value: 0 },
          requestContext,
        );
      }
    }
  }
};
