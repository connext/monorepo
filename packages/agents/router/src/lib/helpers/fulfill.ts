import { Bid, RequestContext } from "@connext/nxtp-utils";
import { getContext } from "../../router";

export const sanityCheck = async (bid: Bid, requestContext: RequestContext): Promise<Boolean> => {
  console.log("HELLO??");
  console.log(getContext());
  const {
    config,
    adapters: { txservice, contracts },
    chainData,
  } = getContext();

  const destinationChainId = chainData.get(bid.data.params.destinationDomain)!.chainId;

  const encodedData = contracts.transactionManager.encodeFunctionData("fulfill", [bid.data]);
  const destinationTransactionManagerAddress =
    config.chains[bid.data.params.destinationDomain].deployments.transactionManager;

  // Validate the bid's fulfill call will succeed on chain.
  try {
    await txservice.getGasEstimate(Number(bid.data.params.destinationDomain), {
      chainId: destinationChainId,
      to: destinationTransactionManagerAddress,
      data: encodedData,
    });

    return true;
  } catch {
    return false;
  }
};
