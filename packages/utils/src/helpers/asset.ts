import { providers, BigNumber, constants, utils } from "ethers";

import { ChainData, chainIdToDomain, getChainData, getETHBalance, getTokenBalance, getTokenDecimals } from "..";

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
  provider?: providers.Provider,
  chainData?: Map<string, ChainData>,
): Promise<number> => {
  if (chainData) {
    const domainId = chainIdToDomain(chainId);
    const chainInfo = chainData.get(domainId.toString());
    const decimals = chainInfo?.assetId[assetId]?.decimals;
    if (decimals) {
      return decimals;
    }
  }
  if (assetId === constants.AddressZero) {
    return 18;
  }
  if (provider) return await getTokenDecimals(assetId, provider);
  else return 18;
};

export const getMainnetEquivalent = async (
  chainId: number,
  assetId: string,
  _chainData?: Map<string, ChainData>,
): Promise<string | undefined> => {
  const chainData = _chainData ?? (await getChainData());

  const domainId = chainIdToDomain(chainId);
  const chainInfo = chainData?.get(domainId.toString());
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
