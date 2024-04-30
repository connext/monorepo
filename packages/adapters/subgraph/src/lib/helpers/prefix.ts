import { getContext } from "../../reader";
import { DomainInvalid } from "../errors";

/**
 * Finds the subgraph prefix for the given domain in the mesh config.
 *
 * @param domain - The domain whose prefix is desired.
 */
export const getPrefixForDomain = (domain: string): string => {
  const { config } = getContext();
  if (Object.keys(config.sources).includes(domain) && config.sources[domain].prefix)
    return config.sources[domain].prefix;
  else throw new DomainInvalid(domain);
};

/**
 * Finds the domain belonging to a given subgraph prefix in the mesh config.
 *
 * @param prefix - The prefix whose domain is desired.
 */
export const getDomainFromPrefix = (prefix: string): string | undefined => {
  const { config } = getContext();
  for (const entry of Object.values(config.sources)) {
    if (entry.prefix === prefix) return entry.domain;
  }
  return undefined;
};
