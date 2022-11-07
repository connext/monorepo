import * as fs from "fs";

import { generateExitPayload as _generateExitPayload } from "@connext/nxtp-utils";
import { CrossChainMessenger as _CrossChainMessenger } from "@eth-optimism/sdk";
import axios from "axios";
import { Interface } from "ethers/lib/utils";
import { sendWithRelayerWithBackup as _sendWithRelayerWithBackup } from "@connext/nxtp-adapters-relayer";
import { EventFetcher as _EventFetcher, L2TransactionReceipt as _L2TransactionReceipt } from "@arbitrum/sdk";
import {
  RollupUserLogic__factory as _RollupUserLogic__factory,
  Outbox__factory as _Outbox__factory,
} from "@connext/nxtp-contracts";
import { providers } from "ethers";

export const existsSync = fs.existsSync;

export const readFileSync = fs.readFileSync;

// eslint-disable-next-line @typescript-eslint/unbound-method
export const axiosGet = axios.get;

export const CrossChainMessenger = _CrossChainMessenger;

export const generateExitPayload = _generateExitPayload;

export const encodeProcessMessageFromRoot = (abi: any[], args: any[], functionName: string): string => {
  const encodedData = new Interface(abi as string[]).encodeFunctionData(functionName, args);
  return encodedData;
};

export const sendWithRelayerWithBackup = _sendWithRelayerWithBackup;

export const EventFetcher = _EventFetcher;

export const L2TransactionReceipt = _L2TransactionReceipt;

export const RollupUserLogic__factory = _RollupUserLogic__factory;

export const Outbox__factory = _Outbox__factory;

export const JsonRpcProvider = providers.JsonRpcProvider;
