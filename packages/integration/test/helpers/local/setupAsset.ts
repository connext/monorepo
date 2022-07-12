import { createRequestContext } from "@connext/nxtp-utils";
import { canonizeId, ConnextHandlerInterface } from "@connext/nxtp-contracts";
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
    const readData = ConnextHandlerInterface.encodeFunctionData("canonicalToAdopted", [canonicalId]);
    const encoded = await txService.readTx({ chainId: +domain.domain, data: readData, to: domain.ConnextHandler });
    const [adopted] = ConnextHandlerInterface.decodeFunctionResult("canonicalToAdopted", encoded);

    if (adopted !== domain.adopted) {
      // @ts-ignore
      const data = ConnextHandlerInterface.encodeFunctionData("setupAsset", [
        [domain.domain, canonicalId],
        domain.adopted,
        domain.pool ?? constants.AddressZero,
      ]);

      await txService.sendTx({ to: domain.ConnextHandler, data, value: 0, chainId: +domain.domain }, requestContext);
    }
  }
};
