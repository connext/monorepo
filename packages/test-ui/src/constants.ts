export const providerUrls: Record<number, string> = JSON.parse(process.env.REACT_APP_CHAIN_PROVIDERS!);

// arrays of "swap pools"
console.log("process.env.REACT_APP_SWAP_CONFIG!: ", process.env.REACT_APP_SWAP_CONFIG!);
console.log(JSON.parse(process.env.REACT_APP_SWAP_CONFIG!));
export const swapConfig: { name: string; assets: { [chainId: number]: string } }[] = JSON.parse(
  process.env.REACT_APP_SWAP_CONFIG!,
);
