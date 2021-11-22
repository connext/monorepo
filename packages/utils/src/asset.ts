import { providers, BigNumber, Contract, constants } from "ethers";

import { ERC20Abi } from "./basic";
import { ChainData } from "./chainData";

export const getOnchainBalance = async (
  assetId: string,
  address: string,
  provider: providers.Provider,
): Promise<BigNumber> => {
  return assetId === constants.AddressZero
    ? provider.getBalance(address)
    : new Contract(assetId, ERC20Abi, provider).balanceOf(address);
};

export const getDecimalsForAsset = async (
  assetId: string,
  chainId: number,
  provider: providers.Provider,
  chainData: Map<string, ChainData>,
): Promise<number> => {
  const chainInfo = chainData.get(chainId.toString());
  const decimals = chainInfo?.assetId[assetId]?.decimals;
  if (decimals) {
    return decimals;
  }
  const contract = new Contract(assetId, ERC20Abi, provider);
  return await contract.decimals();
};
