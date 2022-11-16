import { createStubInstance } from "sinon";
import { BigNumber, utils } from "ethers";
import { mock } from "@connext/nxtp-utils";

import { ChainReader } from "../src";

export const mockChainReader = (): ChainReader => {
  const chainreader = createStubInstance(ChainReader);
  chainreader.getBalance.resolves(utils.parseEther("1"));

  chainreader.getDecimalsForAsset.resolves(18);
  chainreader.getBlockTime.resolves(Math.floor(Date.now() / 1000));
  chainreader.getTokenPrice.resolves(BigNumber.from(1));
  chainreader.getGasEstimate.resolves(BigNumber.from(24001));
  chainreader.getGasEstimateWithRevertCode.resolves(BigNumber.from(1));
  chainreader.getGasPrice.resolves(BigNumber.from(42));

  const mockReceipt = mock.ethers.receipt();
  chainreader.getTransactionReceipt.resolves(mockReceipt);
  return chainreader;
};
