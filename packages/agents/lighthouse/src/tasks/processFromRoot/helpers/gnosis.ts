import { createLoggingContext } from "@connext/nxtp-utils";
import { ethers } from "ethers";

import { getContext } from "../processFromRoot";

import { GetProcessArgsParams } from ".";

// https://gnosisscan.io/address/0x7d94ece17e81355326e3359115D4B02411825EdD
const AMB_HELPER_ADDRESS = "0x7d94ece17e81355326e3359115D4B02411825EdD";

const AMB_BRIDGE_HELPER_ABI = [
  {
    inputs: [{ internalType: "address", name: "_homeBridge", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AMBcontract",
    outputs: [{ internalType: "contract IHomeBridge", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "clean", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "bytes", name: "_message", type: "bytes" }],
    name: "getSignatures",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
];

export const getProcessFromGnosisRootArgs = async ({
  spokeChainId,
  spokeProvider,
  blockNumber,
  _requestContext,
}: GetProcessArgsParams): Promise<[string, string]> => {
  const {
    logger,
    config,
    adapters: { contracts },
  } = getContext();

  const { requestContext, methodContext } = createLoggingContext("getProcessFromGnosisRootArgs", _requestContext);
  logger.info("getProcessFromOptimismRootArgs method start", requestContext, methodContext);

  const spokeConnector = contracts.spokeConnector(
    spokeChainId ?? 0,
    "Gnosis",
    config.environment === "staging" ? "Staging" : "",
  );
  const rpcProvider = new ethers.providers.JsonRpcProvider(spokeProvider);
  const spokeConnectorContract = new ethers.Contract(
    spokeConnector!.address,
    spokeConnector!.abi as any[],
    rpcProvider,
  );

  const events = await spokeConnectorContract.queryFilter("UserRequestForSignature", blockNumber, blockNumber);
  const userRequestForSignatureEvt = events[0];
  const txnReceipt = await userRequestForSignatureEvt.getTransactionReceipt();
  const eventLog = txnReceipt.logs[1];
  const log = spokeConnectorContract.interface.parseLog(eventLog);
  const { encodedData } = log.args;

  const helperContract = new ethers.Contract(AMB_HELPER_ADDRESS, AMB_BRIDGE_HELPER_ABI, rpcProvider);
  const signature = await helperContract.getSignatures(encodedData);

  return [encodedData, signature];
};
