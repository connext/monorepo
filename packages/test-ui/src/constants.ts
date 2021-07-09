export const providerUrls: Record<number, string> = JSON.parse(process.env.REACT_APP_CHAIN_PROVIDERS!);

// arrays of "swap pools"
export const swapConfig: { name: string; assets: { [chainId: number]: string } }[] = JSON.parse(
  process.env.REACT_APP_SWAP_CONFIG!,
);
