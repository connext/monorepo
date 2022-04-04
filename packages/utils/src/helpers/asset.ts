import { providers, BigNumber, constants, utils } from "ethers";

import { ChainData, getChainData , getETHBalance, getTokenBalance, getTokenDecimals } from "..";

import { getDomainFromChainId } from "./nomad";

export const getOnchainBalance = async (
  assetId: string,
  address: string,
  provider: providers.Provider,
): Promise<BigNumber> => {
  return assetId === constants.AddressZero
    ? getETHBalance(provider, address)
    : getTokenBalance(assetId, address, provider);
};

export const getDecimalsForAsset = async (
  assetId: string,
  chainId: number,
  provider: providers.Provider,
  chainData?: Map<string, ChainData>,
): Promise<number> => {
  if (chainData) {
    const domainId = await getDomainFromChainId(chainId, chainData);
    const chainInfo = chainData.get(domainId);
    const decimals = chainInfo?.assetId[assetId]?.decimals;
    if (decimals) {
      return decimals;
    }
  }
  if (assetId === constants.AddressZero) {
    return 18;
  }
  return await getTokenDecimals(assetId, provider);
};

export const getMainnetEquivalent = async (
  chainId: number,
  assetId: string,
  chainData?: Map<string, ChainData>,
): Promise<string | undefined> => {
  const chaindata = chainData ?? (await getChainData());

  const domainId = await getDomainFromChainId(chainId, chainData);
  const chainInfo = chaindata?.get(domainId);
  const equiv = chainInfo
    ? chainInfo.assetId[utils.getAddress(assetId)] ??
      chainInfo.assetId[assetId.toLowerCase()] ??
      chainInfo.assetId[assetId.toUpperCase()]
    : undefined;

  if (!equiv || !equiv.mainnetEquivalent) {
    return undefined;
  }

  return utils.getAddress(equiv.mainnetEquivalent);
};
