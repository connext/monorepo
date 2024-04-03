import { createLoggingContext } from "@connext/nxtp-utils";
import { ethers } from "ethers";

import { axiosGet, getContract, sendWithRelayerWithBackup } from "../../../mockable";
import { NoRootAvailable } from "../errors";
import { getContext } from "../processFromRoot";

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

type Depoist = {
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

const getDeposits = async (apiUrl: string, address: string, limit = 100, offset = 0): Promise<Depoist[]> => {
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

export const getProcessFromXlayerRootArgs = async ({
  spokeChainId,
  hubChainId,
  spokeDomainId,
  hubDomainId,
  spokeProvider,
  hubProvider,
  message: _message,
  sendHash: _sendHash,
  _requestContext,
}: GetProcessArgsParams): Promise<[]> => {
  const {
    logger,
    config,
    adapters: { contracts, relayers, chainreader },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(getProcessFromXlayerRootArgs.name, _requestContext);
  logger.info("Method start", requestContext, methodContext);

  const xlayerBridgeApiEndpoint =
    hubChainId === 1 ? "https://testrpc.x1.tech/priapi/v1/ob/bridge" : "https://testrpc.x1.tech/priapi/v1/ob/bridge";

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

  const spokeDeposits = await getDeposits(xlayerBridgeApiEndpoint, spokeConnector!.address);
  const hubDeposits = await getDeposits(xlayerBridgeApiEndpoint, hubConnector!.address);
  const claimableDeposits = spokeDeposits
    .concat(hubDeposits)
    .filter((d: any) => d.ready_for_claim && d.claim_tx_hash === "");

  if (!claimableDeposits.length) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext, {
      error: `Claimable desposits don't exist!`,
    });
  }

  const hubRpcProvider = new ethers.providers.JsonRpcProvider(hubProvider);
  const hubConnectorContract = getContract(hubConnector!.address, hubConnector!.abi as any[], hubRpcProvider);
  const hubAMBAddress: string = await hubConnectorContract.AMB();
  const spokeRpcProvider = new ethers.providers.JsonRpcProvider(spokeProvider);
  const spokeConnectorContract = getContract(spokeConnector!.address, spokeConnector!.abi as any[], spokeRpcProvider);
  const spokeAMBAddress: string = await spokeConnectorContract.AMB();

  for (const deposit of claimableDeposits) {
    const proof = await getMerkleProof(xlayerBridgeApiEndpoint, deposit.deposit_cnt, deposit.network_id);
    if (!proof) {
      continue;
    }

    console.log(deposit, proof);
    console.log("Claiming message", deposit.orig_net, deposit.dest_net, deposit.tx_hash, deposit.metadata);

    const args = [
      proof.merkle_proof,
      proof.rollup_merkle_proof,
      deposit.global_index,
      proof.main_exit_root,
      proof.rollup_exit_root,
      deposit.orig_net,
      deposit.orig_addr,
      deposit.dest_net,
      deposit.dest_addr,
      deposit.amount,
      deposit.metadata,
    ];
    const encodedData = new ethers.utils.Interface(PolygonZkEVMBridgeV2ABI).encodeFunctionData("claimMessage", args);

    logger.info("Sending process message from root tx", requestContext, methodContext, {
      args,
      encodedData,
      spokeChain: spokeChainId,
      hubChain: hubChainId,
    });

    const isClaimOnL2 = deposit.dest_net === 1;
    const { taskId } = await sendWithRelayerWithBackup(
      isClaimOnL2 ? spokeChainId : hubChainId,
      isClaimOnL2 ? spokeDomainId : hubDomainId,
      isClaimOnL2 ? spokeAMBAddress : hubAMBAddress,
      encodedData,
      relayers,
      chainreader,
      logger,
      requestContext,
    );

    logger.info("Sent X Layer claim tx to relayer", requestContext, methodContext, { taskId });
  }

  return [];
};
