import { domainToChainId } from "@connext/nxtp-contracts";
import { getDeployedConnextContract, getErc20Interface, TransactionService } from "@connext/nxtp-txservice";
import { getCanonicalHash, Logger, RequestContext } from "@connext/nxtp-utils";
import { BigNumber, utils } from "ethers";

type CallContext = {
  txservice: TransactionService;
  logger: Logger;
  _requestContext?: RequestContext;
  isStaging?: boolean;
};

export const totalMintedAssets = async (
  context: CallContext,
  assetKey: string,
  domains: string[],
): Promise<BigNumber> => {
  // const canonicalToRepresentationCalldata = getConnextInterface().encodeFunctionData("canonicalToRepresentation", [assetKey]);
  const erc20 = getErc20Interface();

  // Loop through all domains, adding up the minted amount for the asset on each one.
  let totalMintedAmount = BigNumber.from(0);
  for (const domain of domains) {
    const chainId = domainToChainId(+domain);
    const connext = getDeployedConnextContract(chainId, context.isStaging ? "Staging" : "");
    if (!connext) {
      // TODO: Custom errors for package
      throw new Error("Connext deployment not found!");
    }

    // 1. Get the representation asset address on each domain using the canonical key.
    const canonicalToRepresentationCalldata = new utils.Interface(connext.abi as string[]).encodeFunctionData(
      "canonicalToRepresentation",
      [assetKey],
    );
    const representation = await context.txservice.readTx({
      chainId,
      to: connext.address,
      data: canonicalToRepresentationCalldata,
    });

    // 2. Read total supply from the representation contract.
    const totalSupplyCalldata = erc20.encodeFunctionData("totalSupply");
    const totalSupplyRes = await context.txservice.readTx({
      chainId,
      to: representation,
      data: totalSupplyCalldata,
    });
    let totalSupply;
    try {
      totalSupply = BigNumber.from(totalSupplyRes);
    } catch (e: any) {
      throw new Error(
        "Failed to convert totalSupply response to BigNumber. " + `Received: ${totalSupplyRes}; Error: ${e.toString()}`,
      );
    }

    // 3. Add to total.
    totalMintedAmount = totalMintedAmount.add(totalSupply);
  }

  return totalMintedAmount;
};

export const totalLockedAssets = async (
  context: CallContext,
  asset: {
    canonicalId: string;
    canonicalDomain: string;
    address: string; // TODO: Remove this arg and parse out the address from canonical ID in method.
  },
): Promise<BigNumber> => {
  const chainId = domainToChainId(+asset.canonicalDomain);
  const connext = getDeployedConnextContract(chainId, context.isStaging ? "Staging" : "");
  if (!connext) {
    // TODO: Custom errors for package
    throw new Error("Connext deployment not found!");
  }

  const assetKey = getCanonicalHash(asset.canonicalDomain, asset.canonicalId);

  // 1. Call `getCustodiedAmount` (see: TokenFacet getters), will get `custodied` value from tokenConfig.
  const getCustodiedAmountCalldata = new utils.Interface(connext.abi as string[]).encodeFunctionData("getCustodied", [
    assetKey,
  ]);
  const amountRes = await context.txservice.readTx({
    chainId,
    to: connext.address,
    data: getCustodiedAmountCalldata,
  });
  try {
    return BigNumber.from(amountRes);
  } catch (e: any) {
    throw new Error(
      "Failed to convert getCustodiedAmount response to BigNumber. " + `Received: ${amountRes}; Error: ${e.toString()}`,
    );
  }
};
