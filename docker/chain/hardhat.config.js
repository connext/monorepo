const mnemonic =
  process.env.SUGAR_DADDY ||
  process.env.MNEMONIC ||
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.14",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      chainId: Number(process.env.CHAIN_ID),
      accounts: { mnemonic },
      mining: { auto: false, interval: 1000 },
      loggingEnabled: true,
    },
  },
};
