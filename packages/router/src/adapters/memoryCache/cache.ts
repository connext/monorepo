import { BigNumber, constants } from "ethers/lib/ethers";

import {
  GetOutstandingLiquidityParams,
  StoreOutstandingLiquidityParams,
  RemoveOutstandingLiquidityParams,
} from "../../lib/entities";

const outstandingLiquidity = new Map<
  { assetId: string; chainId: number },
  { amount: BigNumber; transactionId: string }[]
>();

export const getOutstandingLiquidity = async (g: GetOutstandingLiquidityParams): Promise<BigNumber> => {
  const { assetId, chainId } = g;
  const outstandingLiquidityForAsset = outstandingLiquidity.get({ assetId, chainId });
  return outstandingLiquidityForAsset?.reduce((acc, { amount }) => acc.add(amount), constants.Zero) ?? constants.Zero;
};

// TODO: racy
export const storeOutstandingLiquidity = async (s: StoreOutstandingLiquidityParams): Promise<void> => {
  const { assetId, chainId, amount, transactionId } = s;
  const outstandingLiquidityForAsset = outstandingLiquidity.get({ assetId, chainId }) ?? [];
  outstandingLiquidity.set({ assetId, chainId }, [...outstandingLiquidityForAsset, { amount, transactionId }]);
};

export const removeOutstandingLiquidity = async (r: RemoveOutstandingLiquidityParams): Promise<void> => {
  const { assetId, chainId, transactionId } = r;
  const outstandingLiquidityForAsset = outstandingLiquidity.get({ assetId, chainId }) ?? [];
  outstandingLiquidity.set(
    { assetId, chainId },
    outstandingLiquidityForAsset.filter(({ transactionId: txId }) => txId !== transactionId),
  );
};
