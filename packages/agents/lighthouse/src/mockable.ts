import * as fs from "fs";

import { generateExitPayload as _generateExitPayload, getBestProvider as _getBestProvider } from "@connext/nxtp-utils";
import { getDeployedRootManagerContract as _getDeployedRootManagerContract } from "@connext/nxtp-txservice";
import { CrossChainMessenger as _OptimismCrossChainMessenger } from "@eth-optimism/sdk";
import { CrossChainMessenger as _MantleCrossChainMessenger } from "@mantleio/sdk";
import { sendWithRelayerWithBackup as _sendWithRelayerWithBackup } from "@connext/nxtp-adapters-relayer";
import { EventFetcher as _EventFetcher, L2TransactionReceipt as _L2TransactionReceipt } from "@arbitrum/sdk";
import { L1ToL2MessageGasEstimator } from "@arbitrum/sdk/dist/lib/message/L1ToL2MessageGasEstimator";
import { getBaseFee as _getBaseFee } from "@arbitrum/sdk/dist/lib/utils/lib";
import { LineaSDK as _LineaSDK } from "@consensys/linea-sdk";
import {
  RollupUserLogic__factory as _RollupUserLogic__factory,
  Outbox__factory as _Outbox__factory,
} from "@connext/smart-contracts";
import { Contract, ContractInterface, ethers, providers, utils } from "ethers";
import * as zk from "zksync-web3";

import { getMessagesByTransaction as _getMessagesByTransaction } from "./tasks/processFromRoot/helpers/metis/utils";

export const getDeployedRootManagerContract = _getDeployedRootManagerContract;

export const existsSync = fs.existsSync;

export const readFileSync = fs.readFileSync;

export const OptimismCrossChainMessenger = _OptimismCrossChainMessenger;
export const MantleCrossChainMessenger = _MantleCrossChainMessenger;

export const generateExitPayload = _generateExitPayload;

export const encodeProcessMessageFromRoot = (abi: any[], args: any[], functionName: string): string => {
  const encodedData = new utils.Interface(abi as string[]).encodeFunctionData(functionName, args);
  return encodedData;
};

export const sendWithRelayerWithBackup = _sendWithRelayerWithBackup;

export const EventFetcher = _EventFetcher;

export const L2TransactionReceipt = _L2TransactionReceipt;

export const RollupUserLogic__factory = _RollupUserLogic__factory;

export const Outbox__factory = _Outbox__factory;

export const JsonRpcProvider = providers.JsonRpcProvider;

export const ZkSyncWeb3Provider = zk.Provider;

export const LineaSDK = _LineaSDK;

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

export const getZkSyncWeb3Provider = (url: string): zk.Provider => {
  return new zk.Provider(url);
};

export const getL1ToL2MessageGasEstimator = (l2Provider: providers.JsonRpcProvider): L1ToL2MessageGasEstimator => {
  return new L1ToL2MessageGasEstimator(l2Provider);
};

export const getContract = (address: string, abi: ContractInterface, provider?: providers.JsonRpcProvider) =>
  new Contract(address, abi, provider);

export const getInterface = (abi: any[]) => new ethers.utils.Interface(abi);

export const getBaseFee = _getBaseFee;

export const getBestProvider = _getBestProvider;

export const getMessagesByTransaction = _getMessagesByTransaction;
