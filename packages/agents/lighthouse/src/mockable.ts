import * as fs from "fs";

import { generateExitPayload as _generateExitPayload } from "@connext/nxtp-utils";
import { CrossChainMessenger as _CrossChainMessenger } from "@eth-optimism/sdk";
import axios from "axios";
import { Interface } from "ethers/lib/utils";
import { sendWithRelayerWithBackup as _sendWithRelayerWithBackup } from "@connext/nxtp-adapters-relayer";

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
