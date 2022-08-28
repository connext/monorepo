export interface Asset {
  id: string;
  symbol: string;
  name: string;
  is_stablecoin?: boolean;
  contracts: Contract[];
}

export interface Contract {
  contract_address?: string;
  chain_id?: number;
  contract_decimals?: number;
  symbol?: string;
  decimals?: number;
}
