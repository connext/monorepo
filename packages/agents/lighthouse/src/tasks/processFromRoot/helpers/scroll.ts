import { createLoggingContext } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { axiosGet } from "../../../mockable";
import { AlreadyProcessed, NoRootAvailable } from "../errors";
import { getContext } from "../processFromRoot";

import { GetProcessArgsParams } from ".";

export const getProcessFromScrollRootArgs = async ({
  spokeChainId,
  hubChainId,
  message: _message,
  sendHash,
  _requestContext,
}: GetProcessArgsParams): Promise<
  [string, string, BigNumber, BigNumber, string, { batchIndex: BigNumber; merkleProof: string }]
> => {
  const {
    logger,
    config,
    adapters: { contracts },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(getProcessFromScrollRootArgs.name, _requestContext);
  logger.info("Method start", requestContext, methodContext);

  const scrollApiEndpoint =
    hubChainId === 1 ? "https://mainnet-api-bridge.scroll.io/api/" : " https://sepolia-api-bridge.scroll.io/api/";

  const spokeConnector = contracts.spokeConnector(
    spokeChainId ?? 0,
    "Scroll",
    config.environment === "staging" ? "Staging" : "",
  );

  // get Claimable messages
  const claimableRes = await axiosGet(
    `${scrollApiEndpoint}claimable?address=${spokeConnector!.address}&page_size=100&page=1`,
  );
  if (claimableRes.data.errcode !== 0 || claimableRes.data?.data?.result?.length === 0) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext, {
      error: `${sendHash} has no message sent`,
    });
  }
  const result = claimableRes.data.data.result as unknown as {
    hash: string;
    finalizeTx: {
      hash: string;
    };
    claimInfo: {
      from: string;
      to: string;
      value: string;
      nonce: string;
      batch_hash: string;
      message: string;
      proof: string;
      batch_index: string;
    };
  }[];
  const transaction = result.find((tx) => tx.hash.toLowerCase() === sendHash.toLowerCase());
  if (!transaction) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext, {
      error: `${sendHash} has no message sent`,
    });
  } else if (transaction.finalizeTx.hash) {
    throw new AlreadyProcessed(spokeChainId, hubChainId, requestContext, methodContext, {
      error: `${sendHash} already finalized. finalized tx: ${transaction.finalizeTx.hash}`,
    });
  }

  const claimInfo = transaction.claimInfo;
  logger.info("Got Claim Info from scroll api", requestContext, methodContext, {
    sendHash,
    transaction: transaction,
  });

  return [
    claimInfo.from,
    claimInfo.to,
    BigNumber.from(claimInfo.value),
    BigNumber.from(claimInfo.nonce),
    claimInfo.message,
    { batchIndex: BigNumber.from(claimInfo.batch_index), merkleProof: claimInfo.proof },
  ];
};
