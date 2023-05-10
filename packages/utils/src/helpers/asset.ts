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
  decimalsCallback: () => Promise<number> = () => Promise.resolve(18),
): Promise<number> => {
  if (chainData) {
    const domainId = chainIdToDomain(chainId);
    const assetRecord = getAssetEntryFromChaindata(assetId, domainId, chainData);
    const decimals = assetRecord?.decimals;
    if (decimals) {
      return decimals;
    }
  }
  if (assetId === constants.AddressZero) {
    return 18;
  }
  if (provider) {
    return await getTokenDecimals(assetId, provider);
  }
  return await decimalsCallback();
};

export const getAssetEntryFromChaindata = (
  assetId: string,
  domainId: number | string,
  chainData: Map<string, ChainData>,
) => {
  let checksummedAssetId = assetId;
  try {
    checksummedAssetId = utils.getAddress(assetId);
  } catch (e: unknown) {
    // NOTE: this could fail, i.e. if the asset starts with "0X" or is an invalid address
  }
  const chainInfo = chainData.get(domainId.toString());
  const assetRecord = chainInfo
    ? chainInfo.assetId[assetId] ??
      chainInfo.assetId[checksummedAssetId] ??
      chainInfo.assetId[assetId.toLowerCase()] ??
      chainInfo.assetId[assetId.toUpperCase()]
    : undefined;
  return assetRecord;
};

export const getMainnetEquivalent = async (
  chainId: number,
  assetId: string,
  _chainData?: Map<string, ChainData>,
): Promise<string | undefined> => {
  const chainData = _chainData ?? (await getChainData());

  const domainId = chainIdToDomain(chainId);
  const record = getAssetEntryFromChaindata(assetId, domainId, chainData);

  if (!record || !record.mainnetEquivalent) {
    return undefined;
  }

  return utils.getAddress(record.mainnetEquivalent);
};
