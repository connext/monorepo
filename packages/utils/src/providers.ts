import { ethers } from "ethers";

export const getSimpleRPCPRovider = (rpcUrl: string) => {
  return new ethers.providers.StaticJsonRpcProvider(rpcUrl);
};

export type RawProviders = string | string[] | { url: string; user?: string; password?: string }[];
export type ProviderConnectionInfo = { url: string; user?: string; password?: string }[];

// Parse providers into correct format. Used to ensure backwards compatibility.
export const parseProviders = (providers: RawProviders): ProviderConnectionInfo => {
  return typeof providers === "string"
    ? [{ url: providers }]
    : providers.map((provider) =>
        typeof provider === "string"
          ? {
              url: provider,
            }
          : provider,
      );
};

// Convenience method for chain config parsing with nested RawProviders.
export const parseProvidersInChainConfig = <T>(chainConfig: {
  [chainId: number]: { providers: RawProviders } & T;
}): { [chainId: number]: { providers: ProviderConnectionInfo } & T } => {
  const newChainConfig: { [chainId: number]: { providers: ProviderConnectionInfo } & T } = {};
  Object.keys(chainConfig).forEach((_chainId) => {
    const chainId = parseInt(_chainId);
    const config = chainConfig[chainId];
    newChainConfig[chainId] = {
      ...config,
      providers: parseProviders(config.providers),
    };
  });
  return newChainConfig;
};
