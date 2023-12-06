// // These are the blocks to fork from in the forge tests.
// // NOTE: This MUST be updated when contracts are deployed or upgraded for the upgrade
// // tests to succeed. This value should be after the contracts are configured, and at least
// // a week prior to the current block.

// Last updated: March 23 2023
export const FORK_BLOCKS = {
  // MAINNETS
  1: 16812100,
  10: 80397361,
  56: 26402513,
  100: 26921868,
  137: 40197520,
  42161: 68999152,
  // TESTNETS
  5: 8622550, // goerli
  280: 2860225, // zksync2
  420: 6454570, // opt-goerli
  59140: 98565, // Linea goerli
  80001: 32886110, // mumbai
  421613: 10527175, // arbitrum-goerli
};
