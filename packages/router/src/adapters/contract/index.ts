import { CancelParams, FulfillParams, PrepareParams, RequestContext } from "@connext/nxtp-utils";
import { BigNumber, providers } from "ethers/lib/ethers";

import { startContractListeners } from "../../lib/helpers";

import { prepare, fulfill, cancel, removeLiquidity, getRouterBalance } from "./contract";

export type ContractWriter = {
  prepare: (
    chainId: number,
    prepareParams: PrepareParams,
    routerRelayerFeeAsset: string,
    routerRelayerFee: string,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  fulfill: (
    chainId: number,
    fulfillParams: FulfillParams,
    routerRelayerFeeAsset: string,
    routerRelayerFee: string,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  cancel: (
    chainId: number,
    cancelParams: CancelParams,
    routerRelayerFeeAsset: string,
    routerRelayerFee: string,
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
};

export const contractWriter = (): ContractWriter => {
  startContractListeners();
  return {
    prepare,
    fulfill,
    cancel,
    removeLiquidity,
    getRouterBalance,
  };
};
