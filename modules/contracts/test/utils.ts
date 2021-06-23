import { BigNumber, constants, Contract, providers } from "ethers/lib/ethers";
import { abi as Erc20Abi } from "../artifacts/contracts/test/TestERC20.sol/TestERC20.json";

export const getOnchainBalance = async (
  assetId: string,
  address: string,
  provider: providers.Provider,
): Promise<BigNumber> => {
  return assetId === constants.AddressZero
    ? provider.getBalance(address)
    : new Contract(assetId, Erc20Abi, provider).balanceOf(address);
};
