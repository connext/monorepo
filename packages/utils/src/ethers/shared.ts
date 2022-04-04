import { BigNumber, providers, Contract, utils } from "ethers";

import { ERC20Abi } from "..";

export const getETHBalance = async (provider: providers.Provider, address: string): Promise<BigNumber> => {
  return provider.getBalance(address);
};

export const getTokenBalance = async (
  assetId: string,
  address: string,
  provider: providers.Provider,
): Promise<BigNumber> => {
  return new Contract(assetId, ERC20Abi, provider).balanceOf(address);
};

export const getTokenDecimals = async (assetId: string, provider: providers.Provider): Promise<number> => {
  return new Contract(assetId, ERC20Abi, provider).decimals();
};

export const fetchJson = utils.fetchJson;
