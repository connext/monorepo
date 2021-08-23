import _contractDeployments from "@connext/nxtp-contracts/deployments.json";

export type ChainData = {
  name: string;
  chainId: number;
  confirmations: number;
  shortName: string;
  chain: string;
  network: string;
  networkId: number;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: string;
  };
  assetId: Record<
    string,
    {
      symbol: string;
      mainnetEquivalent?: string;
    }
  >;
  rpc: string[];
  faucets: string[];
  infoURL: string;
  explorers: {
    name: string;
    url: string;
    icon: string;
    standard: string;
  }[];
};

export const contractDeployments = _contractDeployments;

/**
 * Returns the address of the `TransactionManager` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedTransactionManagerContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = (contractDeployments as any)[String(chainId)] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }

  const contract = record[name]?.contracts?.TransactionManager;

  if (contract) {
    return { address: contract.address, abi: contract.abi };
  }

  return undefined;
};
