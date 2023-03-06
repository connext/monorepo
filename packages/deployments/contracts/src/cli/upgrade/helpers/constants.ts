export const SUPPORTED_CHAINS = {
  mainnet: [1, 10, 56, 100, 137, 42161],
  testnet: [5, 420, 80001, 421613],
};

// // These are the blocks to fork from in the forge tests.
// // NOTE: This MUST be updated when contracts are deployed or upgraded for the upgrade
// // tests to succeed. This value should be after the contracts are configured, and at least
// // a week prior to the current block.

// Last updated: March 6 2023
export const FORK_BLOCKS = {
  // MAINNETS
  1: 16712100,
  10: 77231000,
  56: 26039087,
  100: 26652258,
  137: 39744675,
  42161: 65091853,
  // TESTNETS
  5: 8567059,
  420: 6013059,
  80001: 32490486,
  421613: 9301718,
};
