import { createRequestContext } from "@connext/nxtp-utils";
import { ConnextHandlerInterface } from "@connext/nxtp-contracts";
import { TransactionService } from "@connext/nxtp-txservice";

export const addRelayer = async (
  domains: { domain: string; relayer: string; ConnextHandler: string }[],
  txService: TransactionService,
) => {
  const requestContext = createRequestContext(addRelayer.name);
  for (const domain of domains) {
    const relayerApprovedData = ConnextHandlerInterface.encodeFunctionData("approvedRelayers", [domain.relayer]);
    const encoded = await txService.readTx({
      chainId: +domain.domain,
      data: relayerApprovedData,
      to: domain.ConnextHandler,
    });
    const [isApproved] = ConnextHandlerInterface.decodeFunctionResult("approvedRelayers", encoded);
    console.log({ isApproved });
    if (!isApproved) {
      console.log(`Adding a relayer: ${domain.relayer}`);
      const approveRelayerData = ConnextHandlerInterface.encodeFunctionData("addRelayer", [domain.relayer]);
      await txService.sendTx(
        {
          chainId: +domain.domain,
          to: domain.ConnextHandler,
          data: approveRelayerData,
          value: 0,
        },
        requestContext,
      );
    } else {
      console.log("Already added. Skipping");
    }
  }
};
