import { createLoggingContext, Logger } from "@connext/nxtp-utils";
import { canonizeId, ConnextInterface } from "@connext/nxtp-contracts";
import { constants, utils } from "ethers";
import { TransactionService } from "@connext/nxtp-txservice";

export const setupAsset = async (
  canonical: { tokenAddress: string; domain: string },
  domains: { domain: string; Connext: string; adopted: string; pool?: string; local: string; cap?: string }[],
  txService: TransactionService,
  logger: Logger,
) => {
  const { requestContext, methodContext } = createLoggingContext(setupAsset.name);
  const canonicalId = utils.hexlify(canonizeId(canonical.tokenAddress) as Uint8Array);
  const payload = utils.defaultAbiCoder.encode(
    ["tuple(bytes32 canonicalId,uint32 canonicalDomain)"],
    [{ canonicalId, canonicalDomain: canonical.domain }],
  );
  const key = utils.solidityKeccak256(["bytes"], [payload]);
  for (const domain of domains) {
    logger.info("setupAsset", requestContext, methodContext, { domain });
    const readData = ConnextInterface.encodeFunctionData("canonicalToAdopted(bytes32)", [key]);
    let needsSetup = false;
    try {
      const encoded = await txService.readTx({ chainId: +domain.domain, data: readData, to: domain.Connext });
      const [adopted] = ConnextInterface.decodeFunctionResult("canonicalToAdopted(bytes32)", encoded);
      needsSetup = adopted !== domain.adopted;
    } catch {
      //Needs to setup the asset from scratch
      needsSetup = true;
    }
    // const [adopted] = ConnextInterface.decodeFunctionResult("canonicalToAdopted(bytes32)", encoded);
    // Check if Canonical

    if (needsSetup) {
      // @ts-ignore
      if (canonical.domain === +domain.domain) {
        //TODO: Get representation

        const data = ConnextInterface.encodeFunctionData("setupAsset", [
          [canonical.domain, canonicalId],
          domain.local,
          domain.adopted,
          domain.pool ?? constants.AddressZero,
          domain.cap ?? "0",
        ]);

        await txService.sendTx(
          { to: domain.Connext, data, value: constants.Zero, chainId: +domain.domain },
          requestContext,
        );
      } else {
        const data = ConnextInterface.encodeFunctionData("setupAssetWithDeployedRepresentation", [
          [canonical.domain, canonicalId],
          domain.local,
          domain.adopted,
          domain.pool ?? constants.AddressZero,
        ]);

        await txService.sendTx(
          { to: domain.Connext, data, value: constants.Zero, chainId: +domain.domain },
          requestContext,
        );
      }
    }
  }
};
