// Hex domains calculated using `getHexDomainFromString`
// alternative: ethers.BigNumber.from(ethers.utils.toUtf8Bytes("some string")).toNumber()
export const chainIdToDomainMapping: Map<number, number> = new Map([
  // mainnets
  [1, 0x657468], // Ethereum ('eth interpreted as int) 6648936
  [10, 0x6f707469], // Optimism (opti interpreted as int) 1869640809
  [56, 0x626e62], // BNB Chain ('bnb interpreted as int) 6450786
  [100, 0x676e6f], // Gnosis Chain ('gno interpreted as int) 6778479
  [137, 0x706f6c79], // Polygon (poly interpreted as int) 1886350457
  [1284, 0x6265616d], // Moonbeam ('beam interpreted as int) 1650811245
  [42161, 0x6172626f], // Arbitrum One ('arbo interpreted as int) 1634886255
  [42170, 0x6172626e], // Arbitrum Nova ('arbn interpreted as int) 1634886262
  [324, 0x7a6b7363], // zkSync2 Mainnet ('zksc interpreted as int) 2053862243
  [1101, 0x707a6b6d], // Polygon zkEvm Mainnet (pzkm interpreted as int) 1887071085
  [59144, 0x6c696e6d], // Consensys Linea Mainnet ('linm' interpreted as int) 1818848877
  [8453, 0x6261736d], // Base Mainnet ('basm' interpreted as int) 1650553709
  [250, 0x66746d], // Fantom Opera (ftm interpreted as int) 6573045
  [43114, 0x61766178], // Avalanche C-Chain (avax interpreted as int) 1634886247
  [288, 0x626f6261], // Boba Mainnet (boba interpreted as int) 2053862243
  [25, 0x63726f], // Cronos Mainnet (cro interpreted as int) 6573045
  [9001, 0x65766d6f], // Evmos Mainnet (evmo interpreted as int) 6648936
  [122, 0x66757365], // Fuse Mainnet (fuse interpreted as int) 1802465399
  [192837465, 0x67617468], // Gather Mainnet (gath interpreted as int) 6778472
  [1666600000, 0x686d79], // Harmony Mainnet (hmy interpreted as int) 6778479
  [2001, 0x6d696c6b], // Milkomeda Mainnet (milk interpreted as int)
  [1285, 0x6d6f6f6e], // Moonriver Mainnet (moon interpreted as int)
  [5000, 0x6d6e74], // Mantle Mainnet (mnt interpreted as int) 7171700
  // testnets
  [42, 0x6b6f7661], // Kovan (kovan interpreted as int) 1802466913
  [5, 0x676f6572], // Goerli (goerli interpreted as int) 1735353714
  [420, 0x676f7074], // optimism-goerli (gopti interpreted as int) 1735356532
  [69, 0x6b6f7074], // optimism-kovan (kopti interpreted as int) 1802465396
  [80001, 0x2707], // mumbai 9991
  [421613, 0x67617262], // arbitrum-goerli (garb interpreted as int) 1734439522
  [10200, 0x63686961], // gnosis-chiado (chiado interpreted as int) 1667787105
  [97, 0x63686170], // chapel (chapel interpreted as int) 1667785072
  [280, 0x7a6b7374], // zkSync2 Testnet (zkst interpreted as int) 2053862260
  [59140, 0x636f6e74], // Consensys Linea goerli (cont interpreted as int) 1668247156
  [1442, 0x707a6b74], // Polygon zkEvm test (pzkt interpreted as int) 1887071092
  [84531, 0x62617367], // Base Goerli ('basg' interpreted as int) 1650553703
  [5001, 0x6d6e7474], // Mantle Testnet ('mntt' interpreted as int) 1835955316
  // local
  [1337, 133712],
  [1338, 133812],
  [13337, 13337],
  [13338, 13338],
  [31337, 31337],
  [31338, 31338],
  [31339, 31339],
]);

/**
 * Converts a chain id (listed at at chainlist.org) to a domain.
 *
 * @param chainId A chain id number
 * @returns A domain number in decimal
 */
export function chainIdToDomain(chainId: number): number {
  const domain = chainIdToDomainMapping.get(chainId);
  if (!domain) throw new Error(`Cannot find corresponding domain for chainId ${chainId}`);

  return domain;
}

/**
 * Converts a domain id  to a chain id. (listed at at chainlist.org)
 *
 * @param domainId A domain id number
 * @returns A chain id
 */
export function domainToChainId(domainId: number): number {
  const keys = chainIdToDomainMapping.keys();
  let chainId;
  for (const key of keys) {
    if (chainIdToDomainMapping.get(key) == domainId) chainId = key;
  }

  if (!chainId) {
    throw new Error(`Cannot find corresponding chainId for domain ${domainId}`);
  }

  return chainId;
}
