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
}[];
