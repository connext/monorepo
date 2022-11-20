import * as fs from "fs";

import { generateExitPayload as _generateExitPayload } from "@connext/nxtp-utils";
import { CrossChainMessenger as _CrossChainMessenger } from "@eth-optimism/sdk";
import { GelatoRelaySDK } from "@gelatonetwork/relay-sdk";
import { sendWithRelayerWithBackup as _sendWithRelayerWithBackup } from "@connext/nxtp-adapters-relayer";
import {
  EventFetcher as _EventFetcher,
  L2TransactionReceipt as _L2TransactionReceipt,
  L1ToL2MessageGasEstimator,
} from "@arbitrum/sdk";
import {
  RollupUserLogic__factory as _RollupUserLogic__factory,
  Outbox__factory as _Outbox__factory,
} from "@connext/nxtp-contracts";
import { Contract, ContractInterface, providers, utils } from "ethers";

export const existsSync = fs.existsSync;

export const readFileSync = fs.readFileSync;

export const CrossChainMessenger = _CrossChainMessenger;

export const generateExitPayload = _generateExitPayload;

export const encodeProcessMessageFromRoot = (abi: any[], args: any[], functionName: string): string => {
  const encodedData = new utils.Interface(abi as string[]).encodeFunctionData(functionName, args);
  return encodedData;
};

export const sendWithRelayerWithBackup = _sendWithRelayerWithBackup;
export const getEstimatedFee = GelatoRelaySDK.getEstimatedFee;

export const EventFetcher = _EventFetcher;

export const L2TransactionReceipt = _L2TransactionReceipt;

export const RollupUserLogic__factory = _RollupUserLogic__factory;

export const Outbox__factory = _Outbox__factory;

export const JsonRpcProvider = providers.JsonRpcProvider;

export const encodePropagate = (abi: any[], args: any[]): string => {
  const encodedData = new utils.Interface(abi as string[]).encodeFunctionData("propagate", args);
  return encodedData;
};

export const encodePropagateForRelayerProxy = (abi: any[], args: any[]): string => {
  const encodedData = new utils.Interface(abi as string[]).encodeFunctionData("propagate", args);
  return encodedData;
};

export const getJsonRpcProvider = (url: string): providers.JsonRpcProvider => {
  return new providers.JsonRpcProvider(url);
};

export const getL1ToL2MessageGasEstimator = (l2Provider: providers.JsonRpcProvider): L1ToL2MessageGasEstimator => {
  return new L1ToL2MessageGasEstimator(l2Provider);
};

export const getContract = (address: string, abi: ContractInterface, provider?: providers.JsonRpcProvider) =>
  new Contract(address, abi, provider);
