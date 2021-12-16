import { CancelParams, FulfillParams, PrepareParams, RequestContext } from "@connext/nxtp-utils";
import { BigNumber, providers } from "ethers/lib/ethers";

import {
  prepareTransactionManager,
  prepareRouterContract,
  fulfillTransactionManager,
  fulfillRouterContract,
  cancelRouterContract,
  cancelTransactionManager,
  removeLiquidityTransactionManager,
  addLiquidityForTransactionManager,
  migrateLiquidity,
  getRouterBalance,
  startContractListeners,
} from "./contract";

export type ContractWriter = {
  prepareTransactionManager: (
    chainId: number,
    prepareParams: PrepareParams,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  prepareRouterContract: (
    chainId: number,
    prepareParams: PrepareParams,
    routerContractAddress: string,
    signature: string,
    routerRelayerFeeAsset: string,
    routerRelayerFee: string,
    useRelayer: boolean,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  fulfillTransactionManager: (
    chainId: number,
    fulfillParams: FulfillParams,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  fulfillRouterContract: (
    chainId: number,
    fulfillParams: FulfillParams,
    routerContractAddress: string,
    signature: string,
    routerRelayerFeeAsset: string,
    routerRelayerFee: string,
    useRelayer: boolean,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  cancelTransactionManager: (
    chainId: number,
    cancelParams: CancelParams,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  cancelRouterContract: (
    chainId: number,
    cancelParams: CancelParams,
    routerContractAddress: string,
    signature: string,
    routerRelayerFeeAsset: string,
    routerRelayerFee: string,
    useRelayer: boolean,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  removeLiquidityTransactionManager: (
    chainId: number,
    amount: string,
    assetId: string,
    recipientAddress: string | undefined,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  addLiquidityForTransactionManager: (
    chainId: number,
    amount: string,
    assetId: string,
    routerAddress: string | undefined,
    requestContext: RequestContext,
  ) => Promise<providers.TransactionReceipt>;
  migrateLiquidity: (
    chainId: number,
    assetId: string,
    requestContext: RequestContext,
    routerAddress?: string,
    amount?: string,
  ) => Promise<{ removeLiqudityTx: providers.TransactionReceipt; addLiquidityForTx: providers.TransactionReceipt }>;
  getRouterBalance: (chainId: number, router: string, assetId: string) => Promise<BigNumber>;
};

export const contractWriter = (): ContractWriter => {
  startContractListeners();
  return {
    prepareTransactionManager,
    prepareRouterContract,
    fulfillTransactionManager,
    fulfillRouterContract,
    cancelRouterContract,
    cancelTransactionManager,
    removeLiquidityTransactionManager,
    addLiquidityForTransactionManager,
    migrateLiquidity,
    getRouterBalance,
  };
};
