import { CancelParams, FulfillParams, PrepareParams, RequestContext, TransactionData } from "@connext/nxtp-utils";
import { BigNumber, providers } from "ethers/lib/ethers";

import { prepare, fulfill, cancel, removeLiquidity, getRouterBalance, sanitationCheck } from "./contract";

export type ContractWriter = {
  prepare: (
    chainId: number,
    prepareParams: PrepareParams,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  fulfill: (
    chainId: number,
    fulfillParams: FulfillParams,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  cancel: (
    chainId: number,
    cancelParams: CancelParams,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  removeLiquidity: (
    chainId: number,
    amount: string,
    assetId: string,
    recipientAddress: string | undefined,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  getRouterBalance: (chainId: number, router: string, assetId: string) => Promise<BigNumber>;
  sanitationCheck: (
    chainId: number,
    transactionData: TransactionData,
    functionCall: "prepare" | "fulfill" | "cancel",
    _requestContext?: RequestContext<string>,
  ) => Promise<void>;
};

export const contractWriter = (): ContractWriter => {
  return {
    prepare,
    fulfill,
    cancel,
    removeLiquidity,
    getRouterBalance,
    sanitationCheck,
  };
};
