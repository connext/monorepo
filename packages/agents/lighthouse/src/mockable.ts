import * as fs from "fs";

import { generateExitPayload as _generateExitPayload } from "@connext/nxtp-utils";
import { CrossChainMessenger as _CrossChainMessenger } from "@eth-optimism/sdk";
import { sendWithRelayerWithBackup as _sendWithRelayerWithBackup } from "@connext/nxtp-adapters-relayer";
import { providers, utils } from "ethers";
import { L1ToL2MessageGasEstimator } from "@arbitrum/sdk";

export const existsSync = fs.existsSync;

export const readFileSync = fs.readFileSync;

export const CrossChainMessenger = _CrossChainMessenger;

export const generateExitPayload = _generateExitPayload;

export const encodeProcessMessageFromRoot = (abi: any[], args: any[], functionName: string): string => {
  const encodedData = new utils.Interface(abi as string[]).encodeFunctionData(functionName, args);
  return encodedData;
};

export const sendWithRelayerWithBackup = _sendWithRelayerWithBackup;

export const encodePropagate = (abi: any[], args: any[]): string => {
  const encodedData = new utils.Interface(abi as string[]).encodeFunctionData("propagate", args);
  return encodedData;
};

export const getJsonRpcProvider = (url: string): providers.JsonRpcProvider => {
  return new providers.JsonRpcProvider(url);
};

export const getL1ToL2MessageGasEstimator = (l2Provider: providers.JsonRpcProvider): L1ToL2MessageGasEstimator => {
  return new L1ToL2MessageGasEstimator(l2Provider);
};
