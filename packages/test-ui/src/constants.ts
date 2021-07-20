export const chainConfig: Record<
  number,
  { provider: string[]; subgraph?: string; transactionManagerAddress?: string }
> = JSON.parse(process.env.REACT_APP_CHAIN_CONFIG!);

// arrays of "swap pools"
export type SwapConfig = { name: string; assets: { [chainId: number]: string } };
export const swapConfig: SwapConfig[] = JSON.parse(process.env.REACT_APP_SWAP_CONFIG!);
