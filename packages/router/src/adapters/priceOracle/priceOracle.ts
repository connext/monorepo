import { GAS_ESTIMATES, getUuid, InvariantTransactionData, RequestContext } from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";

import { NoMainnetEquivalent, NoChainDataAvailable } from "../../lib/errors";
import { getContext } from "../../router";

export const calculateRouterFulfillFee = async (
  input: InvariantTransactionData,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const method = "calculateRouterFulfillFee";
  const methodId = getUuid();
  const { logger, txService, chainData } = getContext();
  logger.info({ method, methodId, requestContext, input }, "Method start");

  const mainnetChainData = chainData.find((cd) => cd.chainId === 1);
  if (!mainnetChainData) {
    throw new NoChainDataAvailable(1, { method, methodId, requestContext });
  }

  // router will do a prepare on the receiver side which needs to be reimbursed
  const { receivingChainId, receivingAssetId } = input;
  const gasCostReceiving = BigNumber.from(GAS_ESTIMATES.fulfill);
  const gasPriceReceiving = await txService.getGasPrice(receivingChainId);
  const totalGasReceiving = gasCostReceiving.mul(gasPriceReceiving);

  // convert total gas to sending asset

  const receivingChainData = chainData.find((cd) => cd.chainId === receivingChainId);
  if (!receivingChainData) {
    throw new NoChainDataAvailable(receivingChainId, { method, methodId, requestContext });
  }

  // get gas amount in USD
  const mainnetEquivalentGasToken = receivingChainData?.assetId[constants.AddressZero];
  if (!mainnetEquivalentGasToken) {
    throw new NoMainnetEquivalent(constants.AddressZero, receivingChainId, { method, methodId, requestContext });
  }

  const mainnetEquivalent = Object.keys(receivingChainData?.assetId ?? {}).find((id) => id === receivingAssetId);
  if (!mainnetEquivalent) {
    throw new NoMainnetEquivalent(receivingAssetId, receivingChainId, { method, methodId, requestContext });
  }

  const mainnetToken = Object.keys(mainnetChainData?.assetId ?? {}).find((id) => id === mainnetEquivalent);
  if (!mainnetToken) {
    throw new NoMainnetEquivalent(receivingAssetId, receivingChainId, { method, methodId, requestContext });
  }
};
