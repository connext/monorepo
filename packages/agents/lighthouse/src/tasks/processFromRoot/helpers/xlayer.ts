import { RequestContext, RootMessage, createLoggingContext, domainToChainId } from "@connext/nxtp-utils";
import { WriteTransaction } from "@connext/nxtp-txservice";
import { Interface } from "ethers/lib/utils";

import { axiosGet, getInterface } from "../../../mockable";
import { NoProofForMessage, NoRootAvailable } from "../errors";
import { getContext } from "../processFromRoot";
import { NoHubConnector, NoSpokeConnector } from "../../propagate/errors";

import { GetProcessArgsParams } from ".";

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

export const getLatestXLayerSpokeMessage = async (
  hubDomainId: number,
  spokeDomainId: number,
  _requestContext: RequestContext,
): Promise<(RootMessage & Deposit) | undefined> => {
  const {
    logger,
    config,
    adapters: { contracts, chainreader },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(getLatestXLayerSpokeMessage.name, _requestContext);
  logger.info("Method start", requestContext, methodContext);

  const xlayerBridgeApiEndpoint =
    domainToChainId(hubDomainId) === 1
      ? "https://rpc.xlayer.tech/priapi/v1/ob/bridge"
      : "https://testrpc.x1.tech/priapi/v1/ob/bridge";

  const spokeConnector = contracts.spokeConnector(
    domainToChainId(spokeDomainId),
    "Xlayer",
    config.environment === "staging" ? "Staging" : "",
  );

  if (!spokeConnector) {
    throw new NoSpokeConnector(spokeDomainId, requestContext, methodContext);
  }

  const hubConnector = contracts.hubConnector(
    domainToChainId(hubDomainId),
    "Xlayer",
    config.environment === "staging" ? "Staging" : "",
  );
  if (!hubConnector) {
    throw new NoHubConnector(hubDomainId, requestContext, methodContext);
  }

  // spoke deposits go from L1 -> L2. On all chains but xlayer this happens automatically
  // from chain operator
  const spokeDeposits = await getDeposits(xlayerBridgeApiEndpoint, spokeConnector.address);

  const [latest] = spokeDeposits
    .filter((d) => d.ready_for_claim && d.dest_net === 3) // claim to spoke
    .sort((a, b) => +b.block_num - +a.block_num);

  if (!latest) {
    return undefined;
  }

  // if the latest deposit is proven, return undefined
  if (latest.claim_tx_hash) {
    return undefined;
  }

  // get the transaction on L1
  const tx = await chainreader.getTransactionReceipt(hubDomainId, latest.tx_hash);
  // get the block on L1
  const block = await chainreader.getBlock(hubDomainId, tx.blockNumber ?? 1);
  if (!block || !tx) {
    logger.warn("Failed to get block or tx for spoke message", requestContext, methodContext, {
      hubDomainId,
      spokeDomainId,
      block,
      tx,
      blockNumber: latest.block_num,
      hash: latest.tx_hash,
    });
    return undefined;
  }
  // get the root
  const iface = getInterface(hubConnector.abi as any[]);
  const [parsed] = tx.logs
    .filter((log) => log.address.toLowerCase() === hubConnector.address.toLowerCase())
    .map((log) => iface.parseLog(log));

  // return latest message
  return {
    ...latest,
    id: `${parsed.args.data}-${spokeDomainId}-spoke-claim`, // NOTE: suffix indicates not from subgraph
    spokeDomain: spokeDomainId.toString(),
    hubDomain: hubDomainId.toString(),
    root: parsed.args.data,
    caller: tx.from.toLowerCase(),
    transactionHash: latest.tx_hash.toLowerCase(),
    timestamp: block.timestamp,
    gasPrice: tx.effectiveGasPrice.toString(),
    gasLimit: tx.cumulativeGasUsed.toString(),
    blockNumber: block.number,
    processed: false,
    count: 0, // TODO: make more accurate
    // only defined if claim tx hash is defined
    sentTaskId: undefined,
    sentTimestamp: undefined,
    relayerType: undefined,
  };
};

export const getProcessFromXlayerRootWriteTransaction = async ({
  spokeChainId,
  hubChainId,
  spokeDomainId,
  hubDomainId,
  sendHash,
  isSpokeClaim,
  _requestContext,
}: GetProcessArgsParams): Promise<WriteTransaction | undefined> => {
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

  // get matching xlayer deposit record
  const [claimable] = (
    await getDeposits(xlayerBridgeApiEndpoint, isSpokeClaim ? spokeConnector.address : hubConnector.address)
  ).filter((x) => x.tx_hash.toLowerCase() === sendHash.toLowerCase());
  if (!claimable || !claimable.ready_for_claim) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext, {
      error: `Claimable desposits don't exist!`,
    });
  }

  if (claimable.claim_tx_hash) {
    // already claimed
    return undefined;
  }

  // get proof
  const proof = await getMerkleProof(xlayerBridgeApiEndpoint, claimable.deposit_cnt, claimable.network_id);

  // throw if unavailable
  if (!proof) {
    throw new NoProofForMessage(spokeChainId, hubChainId, requestContext, methodContext, {
      claimable,
    });
  }

  const iface = new Interface(spokeConnector.abi as string[]);
  const ambEncoded = await chainreader.readTx({
    domain: isSpokeClaim ? +spokeDomainId : +hubDomainId,
    to: isSpokeClaim ? spokeConnector.address : hubConnector.address,
    // NOTE: both abis have this property
    data: iface.encodeFunctionData("AMB", []),
  });
  const [amb] = iface.decodeFunctionResult("AMB", ambEncoded);

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

  return {
    to: amb,
    value: "0",
    domain: isSpokeClaim ? +spokeDomainId : +hubDomainId,
    data: new Interface(PolygonZkEVMBridgeV2ABI).encodeFunctionData("claimMessage", args),
  };
};
