import { utils as ethersUtils } from "ethers";
import { gelatoSend, isChainSupportedByGelato, SignedBid, jsonifyError } from "@connext/nxtp-utils";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts/typechain-types";

import { AppContext } from "../context";

export const handleBid = async (context: AppContext, signedBid: SignedBid): Promise<any> => {
  const {
    logger,
    chainData,
    adapters: { chainreader },
    config,
  } = context;

  const { bid } = signedBid;
  const chainId = chainData.get(bid.data.params.destinationDomain)!.chainId;

  const contractInterface = new ethersUtils.Interface(
    TransactionManagerArtifact.abi,
  ) as TTransactionManager["interface"];

  const encodedData = contractInterface.encodeFunctionData("fulfill", [bid.data]);
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

  // TODO: In the future, this should update the cache with the bid, and we should be sending with gelato in a separate handler!
  const ret = await gelatoSend(
    chainId,
    bid.data.params.destinationDomain,
    encodedData,
    bid.data.local,
    bid.data.feePercentage,
  );
  console.log(ret);
};
