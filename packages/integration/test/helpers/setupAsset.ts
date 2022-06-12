import { createRequestContext } from "@connext/nxtp-utils";
import { canonizeId, ConnextHandlerAbi } from "@connext/nxtp-contracts";
import { constants, utils } from "ethers";
import { TransactionService } from "@connext/nxtp-txservice";

export const setupAsset = async (
  canonical: { tokenAddress: string; domain: string },
  domains: { domain: string; ConnextHandler: string; adopted: string; pool?: string }[],
  txService: TransactionService,
) => {
  const requestContext = createRequestContext(setupAsset.name);
  const canonicalId = utils.hexlify(canonizeId(canonical.tokenAddress));
  for (const domain of domains) {
    const data = new utils.Interface(ConnextHandlerAbi as string[]).encodeFunctionData("setupAsset", [
      canonicalId,
      domain.adopted,
      domain.pool ?? constants.AddressZero,
    ]);
    await txService.sendTx({ to: domain.ConnextHandler, data, value: 0, chainId: +domain }, requestContext);
  }
};
