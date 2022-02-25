const chainIdToDomainNameMapping: Map<number, string> = new Map([
  // TODO: chainId vs nomad name should be added for all the networks
  [1, "eth"], // Ethereum ('eth interpreted as int)
  [1284, "beam"], // Moonbeam ('beam interpreted as int)
]);

export const getChainIdFromDomain = (domainName: string): number => {
  // TODO: get chainId from domain name.
  const filtered = [...chainIdToDomainNameMapping.entries()].filter((it) => it[1] === domainName);
  if (!filtered || filtered.length != 1) throw new Error(`Duplicate domain name ${domainName}`);
  return filtered[0][0];
};

export const getDomainFromChainId = (chainId: number): string => {
  // TODO: get domain from chainId.
  // TODO: move this function in utils after cleanup
  const domainName = chainIdToDomainNameMapping.get(chainId);
  if (!domainName) throw new Error(`Cannot find corresponding Nomad domain for chainId ${chainId}`);

  return getHexDomainFromString(domainName);
};

/**
 * Converts a string (e.g. "eth" for Ethereum) to a decimal formatted Nomad
 * domain.
 * @dev Interprets string bytes as int.
 * @param name The chain string
 * @returns A Nomad domain number in decimal
 */
export function getDomainFromString(name: string): number {
  const buf = Buffer.alloc(4);
  const offset = 4 - name.length;
  buf.write(name, offset > 0 ? offset : 0, "utf8");
  return buf.readUInt32BE(0);
}

/**
 * Converts a string (e.g. "eth" for Ethereum) to a Nomad domain displayed as
 * a hex string.
 * @dev Interprets string bytes as int.
 * @param name The chain string
 * @returns A 0x prefixed Nomad domain in hex (string)
 */
export function getHexDomainFromString(name: string): string {
  const domain = getDomainFromString(name);
  return "0x" + domain.toString(16);
}
