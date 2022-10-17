export interface Chain {
  id: string;
  chain_id: number;
  domain_id?: string;
  name: string;
  short_name: string;
  provider_params: ProviderParam[];
  explorer: Explorer;
  image: string;
  color: string;
  website?: string;
  coingecko_id?: string;
  group: string;
}

export enum ChainTerminus {
  origin = "Origin",
  destination = "Destination",
  none = "Chain",
}
export interface Explorer {
  name: string;
  url: string;
  icon: string;
  block_path: string;
  address_path: string;
  contract_path: string;
  contract_0_path: string;
  transaction_path: string;
}

export interface ProviderParam {
  chainId: string;
  chainName: string;
  rpcUrls: string[];
  nativeCurrency: NativeCurrency;
  blockExplorerUrls: string[];
}

export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}
