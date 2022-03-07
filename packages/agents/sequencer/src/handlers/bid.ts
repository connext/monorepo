import { utils as ethersUtils } from "ethers";
import {
  gelatoSend,
  isChainSupportedByGelato,
  SignedBid,
  jsonifyError,
  RequestContext,
  createLoggingContext,
} from "@connext/nxtp-utils";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts/typechain-types";

import { getContext } from "../sequencer";

export const handleBid = async (signedBid: SignedBid, _requestContext: RequestContext): Promise<any> => {
  const {
    logger,
    chainData,
    adapters: { chainreader },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(handleBid.name, _requestContext);
  logger.info("Method start: handleBid", requestContext, methodContext, { signedBid });

  const { bid } = signedBid;
  const chainId = chainData.get(bid.data.params.destinationDomain)!.chainId;

  const contractInterface = new ethersUtils.Interface(
    TransactionManagerArtifact.abi,
  ) as TTransactionManager["interface"];

  const encodedData = contractInterface.encodeFunctionData("fulfill", [bid.data]);
  logger.info("Encoded data", requestContext, methodContext, { encodedData });
  // const destinationTransactonManagerAddress =
  //   config.chains[bid.data.params.destinationDomain].deployments.transactionManager;
  // Validate the bid's fulfill call will succeed on chain.
  // try {
  //   await chainreader.getGasEstimate(chainId, {
  //     chainId: chainId,
  //     to: destinationTransactonManagerAddress,
  //     data: encodedData,
  //   });
  // } catch (error: any) {
  //   // TODO: Log error.
  //   logger.error("Error validating bid with getGasEstimate.", undefined, undefined, jsonifyError(error), { chainId });
  //   throw error;
  // }

  if (!isChainSupportedByGelato(chainId)) {
    throw new Error("Chain not supported by gelato.");
  }

  const txManagerAddress = config.chains[bid.data.params.destinationDomain].deployments.transactionManager;

  // TODO: In the future, this should update the cache with the bid, and we should be sending with gelato in a separate handler!
  const ret = await gelatoSend(
    chainId,
    txManagerAddress,
    encodedData,
    bid.data.local,
    bid.data.feePercentage,
  );
  console.log(ret);
};
