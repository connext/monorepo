import { providers, BigNumber, Contract, constants, utils } from "ethers";

import { ERC20Abi } from "./basic";
import { ChainData, getChainData } from "./chainData";

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
  chainData?: Map<string, ChainData>,
): Promise<number> => {
  if (chainData) {
    const chainInfo = chainData.get(chainId.toString());
    const decimals = chainInfo?.assetId[assetId]?.decimals;
    if (decimals) {
      return decimals;
    }
  }
  if (assetId === constants.AddressZero) {
    return 18;
  }
  const contract = new Contract(assetId, ERC20Abi, provider);
  return await contract.decimals();
};

export const getMainnetEquivalent = async (
  chainId: number,
  assetId: string,
  chainData?: Map<string, ChainData>,
): Promise<string | undefined> => {
  const chaindata = chainData ?? (await getChainData());

  const chainInfo = chaindata?.get(chainId.toString());

  const equiv = chainInfo
    ? chainInfo.assetId[utils.getAddress(assetId)] ??
      chainInfo.assetId[assetId.toLowerCase()] ??
      chainInfo.assetId[assetId.toUpperCase()] ??
      chainInfo.assetId[assetId]
    : undefined;

  if (!equiv || !equiv.mainnetEquivalent) {
    return undefined;
  }

  return utils.getAddress(equiv.mainnetEquivalent);
};
