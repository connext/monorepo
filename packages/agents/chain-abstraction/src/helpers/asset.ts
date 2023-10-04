import { jsonifyError } from "@connext/nxtp-utils";
import { BigNumberish, ethers } from "ethers";

import { axiosGet } from "../mockable";
import { UniswapToken, Asset, HoneyswapToken, coingeckoTokenType } from "../types";
import { HONEYSWAP_TOKENS, UNISWAP_GATEWAY } from "../helpers/api";

/**
 * Returns the `supportedAsset` which will be specific to chain ID
 * in form of array to be used on client side.
 */
export const getSupportedAssets = async (chainID: number): Promise<Asset[] | null> => {
  try {
    if (chainID === 100) {
      // get token from honeyswap for gnosis
      const res = await axiosGet(HONEYSWAP_TOKENS);
      if (!res) {
        throw new Error("HONEY_SWAP API failing");
      }
      const { tokens } = res.data;
      const supportedAssetForChain: [Asset] = tokens
        .filter((token: HoneyswapToken) => token.chainId === chainID)
        .map((token: HoneyswapToken) => ({
          name: token.name,
          chainId: chainID,
          symbol: token.symbol,
          logoURI: token.logoURI,
          address: token.address,
        }));
      return supportedAssetForChain.length ? supportedAssetForChain : null;
    } else {
      const res = await axiosGet(UNISWAP_GATEWAY);
      if (!res) {
        throw new Error("UNISWAP Gateway failing");
      }
      const { tokens } = res.data;
      const supportedTokens: Asset[] = tokens.map((token: UniswapToken) => {
        if (token.chainId === chainID) {
          const asset: Asset = {
            name: token.name,
            symbol: token.symbol,
            logoURI: token.logoURI,
            address: token.address,
            chainId: chainID,
          };
          return asset;
        } else {
          if (token.extensions && token.extensions.bridgeInfo[chainID.toString()]) {
            const asset: Asset = {
              name: token.name,
              symbol: token.symbol,
              logoURI: token.logoURI,
              address: token.extensions.bridgeInfo[chainID.toString()].tokenAddress,
              chainId: chainID,
            };
            return asset;
          } else false;
          return false;
        }
      });
      const filteredAssets = supportedTokens.filter((item) => typeof item === "object");
      return filteredAssets.length ? filteredAssets : null;
    }
  } catch (error: unknown) {
    throw new Error(`Getting supportedAsset from SDK failed, e: ${jsonifyError(error as Error).message}`);
  }
};

export const getCoingeckoIDs = async (tokenAddresses: string[]): Promise<Record<string, string>> => {
  try {
    const response = await axiosGet("https://api.coingecko.com/api/v3/coins/list?include_platform=true");
    const tokens = response.data;
    const ids: Record<string, string> = {};

    tokens.forEach((token: coingeckoTokenType) => {
      tokenAddresses.forEach((address) => {
        if (Object.values(token.platforms).includes(address.toLowerCase())) {
          ids[address] = token.id;
        }
      });
    });

    if (Object.keys(ids).length === 0) {
      throw new Error("No tokens found");
    }
    return ids;
  } catch (err: unknown) {
    throw Error(`Error in fetching Coingecko token IDs: ${(err as Error).message}`);
  }
};

export const getTokenPricesInUsd = async (
  coingeckoIds: string[],
  amounts: BigNumberish[],
  decimals: number[],
): Promise<number[]> => {
  try {
    const response = await axiosGet("https://api.coingecko.com/api/v3/simple/price", {
      params: { ids: coingeckoIds.join(","), vs_currencies: "usd" },
    });

    return coingeckoIds.map((coingeckoId, index) => {
      const priceInUSD: number = response.data[coingeckoId].usd;
      const _amount = parseFloat(ethers.utils.formatUnits(amounts[index].toString(), decimals[index]));
      return priceInUSD * _amount;
    });
  } catch (err: unknown) {
    throw Error(`Failed to get fetch the USD price ${(err as Error).message}`);
  }
};
