import { createLoggingContext } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { utils } from "zksync-web3";
import { getAddress, hexDataSlice } from "ethers/lib/utils";

import { getContract, JsonRpcProvider, ZkSyncWeb3Provider } from "../../../mockable";
import { NoRootAvailable } from "../errors";
import { getContext } from "../processFromRoot";

import { GetProcessArgsParams } from ".";

export const getProcessFromZkSyncRootArgs = async ({
  spokeChainId,
  hubChainId,
  hubProvider,
  spokeProvider,
  message,
  sendHash,
  _requestContext,
}: GetProcessArgsParams): Promise<[BigNumber, BigNumber, BigNumber, string, string[]]> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(getProcessFromZkSyncRootArgs.name, _requestContext);
  logger.info("Method start", requestContext, methodContext);
  // When processing from root on zksync, you need the following information:
  // // zkSync block number in which the message was sent
  // uint256 _l2BlockNumber,
  // // Message index, that can be received via API
  // uint256 _index,
  // // The tx number in block
  // uint16 _l2TxNumberInBlock,
  // // The message that was sent from l2
  // bytes calldata _message,
  // // Merkle proof for the message
  // bytes32[] calldata _proof

  // create L1, L2 provider
  const l1Provider = new JsonRpcProvider(hubProvider);
  const l2Provider = new ZkSyncWeb3Provider(spokeProvider);

  // get transaction receipt from hash on l2
  const txReceipt = await l2Provider.getTransactionReceipt(sendHash);
  if (!txReceipt) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext, {
      error: "Not found tx receipt",
    });
  }

  const { l2ToL1Logs, l1BatchNumber, l1BatchTxIndex } = txReceipt;
  const l2Tol1Log = l2ToL1Logs?.find((l) => l.transactionHash === sendHash);
  if (!l2Tol1Log) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext, {
      error: "Not found  l2ToL1 Log",
    });
  }

  // Getting L2 message proof for block
  const l2MessageProof = await l2Provider.getLogProof(sendHash);
  // if l2MessageProof == null. no such message
  if (!l2MessageProof) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext, {
      error: "Not found Message Proof",
    });
  }

  // check L2Message Inclusion
  const zkAddress = await l2Provider.getMainContractAddress();
  const mailboxL1Contract = getContract(
    zkAddress,
    [
      ...utils.ZKSYNC_MAIN_ABI.format(),
      {
        inputs: [],
        name: "getTotalBatchesExecuted",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    l1Provider,
  );
  // all the information of the message sent from L2
  const messageInfo = {
    txNumberInBlock: l1BatchTxIndex,
    sender: getAddress(hexDataSlice(l2Tol1Log.key, 12)),
    data: message,
  };

  const totalBatchExecuted = await mailboxL1Contract.getTotalBatchesExecuted();
  if (l1BatchNumber > totalBatchExecuted) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext, {
      error: `L1 batch number (${l1BatchNumber}) > totalBatchesExecuted (${totalBatchExecuted})`,
    });
  }

  const inclusion = await mailboxL1Contract.proveL2MessageInclusion(
    l1BatchNumber,
    l2MessageProof.id,
    messageInfo,
    l2MessageProof.proof,
  );
  logger.info("Prove L2 Message Inclusion from zksync", requestContext, methodContext, {
    l1BatchNumber,
    index: l2MessageProof.id,
    messageInfo,
    proof: l2MessageProof.proof,
    inclusion,
  });
  if (!inclusion) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext, {
      error: "Not included",
    });
  }

  logger.info("Got proof from zksync", requestContext, methodContext, {
    sendHash,
    l2ToL1Logs,
    l1BatchNumber,
    l1BatchTxIndex,
    l2MessageProof,
  });

  return [
    BigNumber.from(l1BatchNumber),
    BigNumber.from(l2MessageProof.id),
    BigNumber.from(l1BatchTxIndex),
    message,
    l2MessageProof.proof,
  ];
};
