import { Bid, RequestContext } from "@connext/nxtp-utils";
import { getContext } from "../../router";

export const sanityCheck = async (bid: Bid, requestContext: RequestContext): Promise<Boolean> => {
  const {
    config,
    adapters: { txservice, contracts },
    chainData,
  } = getContext();
  const destinationChainId = chainData.get(bid.data.params.destinationDomain)!.chainId;

  const encodedData = contracts.connext.encodeFunctionData("execute", [bid.data]);
  const destinationConnextAddress = config.chains[bid.data.params.destinationDomain].deployments.connext;

  // Validate the bid's fulfill call will succeed on chain.
  try {
    await txservice.getGasEstimate(Number(bid.data.params.destinationDomain), {
      chainId: destinationChainId,
      to: destinationConnextAddress,
      data: encodedData,
    });

    return true;
  } catch {
    return false;
  }
};
