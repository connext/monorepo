import { CrossChainTx, RequestContext } from "@connext/nxtp-utils";

export const sanitationCheck = async (
  transactionData: CrossChainTx,
  functionCall: "prepare" | "fulfill" | "reconcile",
  _requestContext?: RequestContext<string>,
) => {
  // TODO: Not implemented yet
};

/**
 * Returns transacting asset address on destination domain corresponding to transacting asset on origin domain
 *
 * @param originDomain The domain for sending chain
 * @param originTransactingAsset The asset the caller sent with the transaction
 * @param destinationDomain The domain for receiving chain
 * @returns
 */
export const getDestinationTransactingAsset = async (
  originDomain: string,
  originTransactingAsset: string,
  destinationDomain: string,
): Promise<string> => {
  // TODO: Not implemented yet
  return originTransactingAsset;
};

/**
 * Returns local asset address on destination domain corresponding to local asset on origin domain
 *
 * @param originDomain
 * @param originLocalAsset The asset sent over the bridge
 * @param destinationDomain
 * @returns
 */
export const getDestinationLocalAsset = async (
  originDomain: string,
  originLocalAsset: string,
  destinationDomain: string,
): Promise<string> => {
  // TODO: Not implemented yet
  return originLocalAsset;
};

/**
 * Returns input amount to get `amountOut` in `outputAsset` on `domain` through stable swap
 *
 * @param amountOut The output amount to get
 * @param domain The domain that we're getting tokens on
 * @param outputAsset The output asset address
 * @param inputAsset The input asset address
 */
export const getAmountIn = async (
  amountOut: string,
  domain: string,
  outputAsset: string,
  inputAsset: string,
): Promise<string> => {
  // TODO: moved to utils after everything done correctly
  return amountOut;
};

/**
 * Returns output amount in `outputAsset` to get by swapping `amountIn` input asset through stable swap
 *
 * @param amountIn The input amount to swap
 * @param domain The domain that we're getting tokens on
 * @param outputAsset The output asset address
 * @param inputAsset The input asset address
 * @returns
 */
export const getAmountOut = async (
  amountIn: string,
  domain: string,
  outputAsset: string,
  inputAsset: string,
): Promise<string> => {
  // TODO: moved to utils after everything done correctly
  return amountIn;
};
