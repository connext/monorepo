// // These are the blocks to fork from in the forge tests.
// // NOTE: This MUST be updated when contracts are deployed or upgraded for the upgrade
// // tests to succeed. This value should be after the contracts are configured, and at least
// // a week prior to the current block.

// Last updated: March 23 2023
export const FORK_BLOCKS = {
  // MAINNETS
  1: 16712100,
  10: 77231000,
  56: 26039087,
  100: 26652258,
  137: 39744675,
  42161: 65091853,
  // TESTNETS
  5: 8622550, // goerli
  280: 2860225, // zksync2
  420: 6454570, // opt-goerli
  59140: 98565, // consensys zkevm
  80001: 32886110, // mumbai
  421613: 10527175, // arbitrum-goerli
};
