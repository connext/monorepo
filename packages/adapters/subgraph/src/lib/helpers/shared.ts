import { getMeshOptions as _getMeshOptions, getBuiltGraphClient as _getBuiltGraphClient } from "../../../.graphclient";
import { getContext } from "../../reader";

export const getMeshOptions = _getMeshOptions;

export const getBuiltGraphClient = _getBuiltGraphClient;

/**
 * Gets the prefix by domain
 * @param domain The domain you're going to get the prefix by
 */
export const getPrefixByDomain = (domain: string): string | undefined => {
  const { config } = getContext();
  if (Object.keys(config.sources).includes(domain)) return config.sources[domain].prefix;
  else return undefined;
};

/**
 * Gets the domain by prefix
 * @param prefix The prefix you're going to get by domain
 */
export const getDomainByPrefix = (prefix: string): string | undefined => {
  const { config } = getContext();
  for (const entry of Object.values(config.sources)) {
    if (entry.prefix === prefix) return entry.domain;
  }
  return undefined;
};
