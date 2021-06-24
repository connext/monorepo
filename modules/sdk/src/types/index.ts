import { InvariantTransactionData } from "@connext/nxtp-utils";
import { Web3Provider } from "@ethersproject/providers";
import { BigNumberish } from "ethers";

export type PrepareParamType = {
  userWebProvider: Web3Provider; // This has to be sending chain
  routerAddress: string;
  sendingChainId: number;
  receivingChainId: number;
  sendingAssetId: string;
  receivingAssetId: string;
  receivingAddress: string;
  amount: BigNumberish;
  expiry: string;
  callData?: string;
};

export type ListenRouterPrepareParamType = {
  txData: InvariantTransactionData;
  userWebProvider: Web3Provider; // This has to be receiving chain
  relayerFee: BigNumberish;
};

export type ListenRouterFulfillParamType = {
  txData: InvariantTransactionData;
  userWebProvider: Web3Provider; // This has to be receiving chain
};

export type CrossChainParamType = {
  userWebProvider: Web3Provider; // This has to be receiving chain
  routerAddress: string;
  sendingChainId: number;
  receivingChainId: number;
  sendingAssetId: string;
  receivingAssetId: string;
  sendingRpcProvider: URL;
  receivingRpcProvider: URL;
  receivingAddress: string;
  amount: BigNumberish;
  expiry: string;
  callData?: string;
};
