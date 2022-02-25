import { CrossChainTx, RequestContext } from "@connext/nxtp-utils";

export const sanitationCheck = async (
  transactionData: CrossChainTx,
  functionCall: "prepare" | "fulfill" | "reconcile",
  _requestContext?: RequestContext<string>,
) => {
  // TODO. Not implemented yet
};
