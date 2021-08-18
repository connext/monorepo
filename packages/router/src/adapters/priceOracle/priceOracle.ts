import { GAS_ESTIMATES, getUuid, InvariantTransactionData, RequestContext } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { getContext } from "../../router";

/**
 * Foo
 */
export const calculateRouterFulfillFee = async (
  input: InvariantTransactionData,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const method = "calculateRouterFulfillFee";
  const methodId = getUuid();
  const { logger, txService, chainData } = getContext();
  logger.info({ method, methodId, requestContext, input }, "Method start");

  // router will do a prepare on the receiver side which needs to be reimbursed
  const { receivingChainId, receivingAssetId } = input;
  const gasCostReceiving = BigNumber.from(GAS_ESTIMATES.fulfill);
  const gasPriceReceiving = await txService.getGasPrice(receivingChainId);
  const totalGasReceiving = gasCostReceiving.mul(gasPriceReceiving);

  // convert total gas to sending asset
  const receivingChainData = chainData.find((cd) => cd.chainId === receivingChainId);
  const mainnetEquivalent = Object.keys(receivingChainData?.assetId ?? {}).find((id) => id === receivingAssetId);
  if (!mainnetEquivalent) {
  }
};
