import { BigNumber, constants, Contract, providers } from "ethers/lib/ethers";
import { GraphQLClient } from "graphql-request";

import { ActiveTransaction, SingleChainTransaction } from "../../lib/entities";
import { ContractReaderNotAvailableForChain } from "../../lib/errors/contractReader";
import { getContext } from "../../router";

import { getSdk, Sdk } from "./graphqlsdk";
import { getActiveTransactions, getAssetBalance, getTransactionForChain } from "./subgraph";

const ERC20Abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (boolean)",
  "function mint(address account, uint256 amount)",
];

export type ContractReader = {
  getActiveTransactions: () => Promise<ActiveTransaction<any>[]>;
  getTransactionForChain: (
    transactionId: string,
    user: string,
    chainId: number,
  ) => Promise<SingleChainTransaction | undefined>;

  /**
   *
   * Returns available liquidity for the given asset on the TransactionManager on the provided chain.
   *
   * @param assetId - The asset you want to determine router liquidity of
   * @param chainId - The chain you want to determine liquidity on
   * @returns The available balance
   */
  getAssetBalance: (assetId: string, chainId: number) => Promise<BigNumber>;

  /**
   * Returns decimals for given asset
   *
   * @param assetId - The asset you want to determine decimals of
   * @param chainId - The chain asset exists on
   * @returns The decimals of the asset
   */
  getAssetDecimals: (assetId: string, chainId: number) => Promise<number>;
};

const sdks: Record<number, Sdk> = {};

export const getSdks = (): Record<number, Sdk> => {
  if (Object.keys(sdks).length === 0) {
    throw new ContractReaderNotAvailableForChain(0);
  }
  return sdks;
};

export const subgraphContractReader = (): ContractReader => {
  const { config } = getContext();
  Object.entries(config.chainConfig).forEach(([chainId, { subgraph }]) => {
    const client = new GraphQLClient(subgraph);
    sdks[parseInt(chainId)] = getSdk(client);
  });

  // TODO: can this be made into a subgraph function?
  const getAssetDecimals = async (assetId: string, chainId: number): Promise<number> => {
    if (assetId === constants.AddressZero) {
      return 18;
    }
    // Get provider
    const { providers: _providers } = config.chainConfig[chainId] ?? {};
    if (!providers) {
      throw new ContractReaderNotAvailableForChain(chainId, { available: Object.keys(config.chainConfig) });
    }
    const provider =
      _providers.length === 1
        ? new providers.JsonRpcProvider(p)
        : new providers.FallbackProvider(
            _providers.map((p) => new providers.JsonRpcProvider(p)),
            1,
          );
    return (await new Contract(assetId, ERC20Abi, provider).decimals()).toNumber();
  };

  return {
    getActiveTransactions,
    getTransactionForChain,
    getAssetBalance,
    getAssetDecimals,
  };
};
