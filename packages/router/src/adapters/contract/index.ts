import { CancelParams, FulfillParams, PrepareParams, RequestContext } from "@connext/nxtp-utils";
import { providers } from "ethers/lib/ethers";

import { prepare, fulfill, cancel } from "./contract";

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
};

export const contractWriter = (): ContractWriter => {
  return {
    prepare,
    fulfill,
    cancel,
  };
};
