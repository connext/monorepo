import { createLoggingContext } from "@connext/nxtp-utils";

import { axiosGet } from "../../../mockable";
import { MultipleHashesDetected, NoProofForMessage, NoRootAvailable } from "../errors";
import { getContext } from "../processFromRoot";

import { GetProcessArgsParams } from ".";
import { WriteTransaction } from "@connext/nxtp-txservice";
import { NoHubConnector, NoSpokeConnector } from "../../propagate/errors";
import { Interface } from "ethers/lib/utils";

const PolygonZkEVMBridgeV2ABI = [
  {
    inputs: [
      {
        internalType: "bytes32[32]",
        name: "smtProofLocalExitRoot",
        type: "bytes32[32]",
      },
      {
        internalType: "bytes32[32]",
        name: "smtProofRollupExitRoot",
        type: "bytes32[32]",
      },
      {
        internalType: "uint256",
        name: "globalIndex",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "mainnetExitRoot",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "rollupExitRoot",
        type: "bytes32",
      },
      {
        internalType: "uint32",
        name: "originNetwork",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "originAddress",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "destinationNetwork",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "destinationAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "metadata",
        type: "bytes",
      },
    ],
    name: "claimMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

type Deposit = {
  leaf_type: number;
  orig_net: number;
  orig_addr: string;
  amount: string;
  dest_net: number;
  dest_addr: string;
  block_num: string;
  deposit_cnt: string;
  network_id: number;
  tx_hash: string;
  claim_tx_hash: string;
  metadata: string;
  ready_for_claim: boolean;
  global_index: string;
};

const getDeposits = async (apiUrl: string, address: string, limit = 100, offset = 0): Promise<Deposit[]> => {
  try {
    const res = await axiosGet(`${apiUrl}/bridges/${address}?limit=${limit}&offset=${offset}`);
    return res.data.deposits !== undefined ? res.data.deposits : [];
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const getMerkleProof = async (apiUrl: string, depositCount: string, networkId: number) => {
  try {
    const res = await axiosGet(`${apiUrl}/merkle-proof?deposit_cnt=${depositCount}&net_id=${networkId}`);
    return res.data.proof;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const getProcessFromXlayerRootWriteTransaction = async ({
  spokeChainId,
  hubChainId,
  spokeDomainId,
  hubDomainId,
  sendHash,
  _requestContext,
}: GetProcessArgsParams): Promise<WriteTransaction> => {
  const {
    logger,
    config,
    adapters: { contracts, chainreader },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(
    getProcessFromXlayerRootWriteTransaction.name,
    _requestContext,
  );
  logger.info("Method start", requestContext, methodContext);

  const xlayerBridgeApiEndpoint =
    hubChainId === 1 ? "https://rpc.xlayer.tech/priapi/v1/ob/bridge/" : "https://testrpc.x1.tech/priapi/v1/ob/bridge";

  const spokeConnector = contracts.spokeConnector(
    spokeChainId ?? 0,
    "Xlayer",
    config.environment === "staging" ? "Staging" : "",
  );

  const hubConnector = contracts.hubConnector(
    hubChainId ?? 0,
    "Xlayer",
    config.environment === "staging" ? "Staging" : "",
  );

  if (!hubConnector) {
    throw new NoHubConnector(hubChainId, requestContext, methodContext);
  }

  if (!spokeConnector) {
    throw new NoSpokeConnector(spokeChainId, requestContext, methodContext);
  }

  // TODO: add chain of message to params instead of concatenating
  const spokeDeposits = await getDeposits(xlayerBridgeApiEndpoint, spokeConnector!.address);
  const hubDeposits = await getDeposits(xlayerBridgeApiEndpoint, hubConnector!.address);
  const claimableMessage = spokeDeposits
    .concat(hubDeposits)
    .filter((d: any) => d.ready_for_claim && d.tx_hash.toLowerCase() === sendHash.toLowerCase());

  if (!claimableMessage.length) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext, {
      error: `Claimable desposits don't exist!`,
      sendHash,
    });
  }

  if (claimableMessage.length > 1) {
    throw new MultipleHashesDetected(spokeChainId, hubChainId, requestContext, methodContext, {
      messages: claimableMessage,
      sendHash,
    });
  }

  const [claimable] = claimableMessage;
  const proof = await getMerkleProof(xlayerBridgeApiEndpoint, claimable.deposit_cnt, claimable.network_id);
  if (!proof) {
    throw new NoProofForMessage(spokeChainId, hubChainId, requestContext, methodContext, {
      claimable,
    });
  }

  const args = [
    proof.merkle_proof,
    proof.rollup_merkle_proof,
    claimable.global_index,
    proof.main_exit_root,
    proof.rollup_exit_root,
    claimable.orig_net,
    claimable.orig_addr,
    claimable.dest_net,
    claimable.dest_addr,
    claimable.amount,
    claimable.metadata,
  ];

  const isSpokeClaim = claimable.orig_net === 0;
  const domain = isSpokeClaim ? +spokeDomainId : +hubDomainId;
  const connector = isSpokeClaim ? hubConnector : spokeConnector;
  const iface = new Interface(connector.abi);
  const ret = await chainreader.readTx({
    domain,
    to: connector.address,
    data: iface.encodeFunctionData("AMB", []),
  });
  const [amb] = iface.decodeFunctionResult("AMB", ret);

  return {
    to: amb,
    data: new Interface(PolygonZkEVMBridgeV2ABI).encodeFunctionData("claimMessage", args),
    value: "0",
    domain,
  };
};
