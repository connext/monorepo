import { Wallet, BigNumberish, Contract, BigNumber, constants, providers } from "ethers";

import { abi as Erc20Abi } from "@connext/nxtp-contracts/artifacts/contracts/test/TestERC20.sol/TestERC20.json";

export const approveTokens = async (spender: string, amount: BigNumberish, approver: Wallet, token: Contract) => {
  const approveTx = await token.connect(approver).approve(spender, amount);
  await approveTx.wait();
};

export const getOnchainBalance = async (
  assetId: string,
  address: string,
  provider: providers.Provider,
): Promise<BigNumber> => {
  return assetId === constants.AddressZero
    ? provider.getBalance(address)
    : new Contract(assetId, Erc20Abi, provider).balanceOf(address);
};
