import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const TEST_ROUTERS = [
  "0x9ADA6aa06eF36977569Dc5b38237809c7DF5082a", // live testnet router
  "0x0EC26F03e3dBA9bb5162D28fD5a3378A25f168d1", // rahul test router
  "0xDc150c5Db2cD1d1d8e505F824aBd90aEF887caC6", // ci/shared router
  "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", // local router
];

const SKIP_SETUP = [1, 56, 250, 137, 100, 1285, 42161, 43114];
const WRAPPED_ETH_MAP = new Map();
WRAPPED_ETH_MAP.set("1", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"); // mainnet WETH
WRAPPED_ETH_MAP.set("4", "0xc778417E063141139Fce010982780140Aa0cD5Ab"); // rinkeby WETH
WRAPPED_ETH_MAP.set("56", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"); // Binance Smart Chain WBNB
WRAPPED_ETH_MAP.set("137", "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"); // polygon WMATIC
WRAPPED_ETH_MAP.set("250", "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"); // fantom WFTM
WRAPPED_ETH_MAP.set("42161", "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"); // arbitrum WETH
WRAPPED_ETH_MAP.set("43114", "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"); // avalanche WAVAX

/**
 * Hardhat task defining the contract deployments for nxtp
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const chainId = await hre.getChainId();

  let deployer;
  ({ deployer } = await hre.getNamedAccounts());
  if (!deployer) {
    [deployer] = await hre.getUnnamedAccounts();
  }
  console.log("deployer: ", deployer);

  await hre.deployments.deploy("TransactionManager", {
    from: deployer,
    args: [chainId],
    log: true,
  });

  if (WRAPPED_ETH_MAP.has(chainId)) {
    console.log("Deploying ConnextPriceOracle to configured chain");
    await hre.deployments.deploy("ConnextPriceOracle", {
      from: deployer,
      args: [WRAPPED_ETH_MAP.get(chainId)],
      log: true,
    });
  }

  if (!SKIP_SETUP.includes(parseInt(chainId))) {
    console.log("Deploying test token on non-mainnet chain");
    await hre.deployments.deploy("TestERC20", {
      from: deployer,
      log: true,
    });

    console.log("Setting up test routers on chain", chainId);

    for (const router of TEST_ROUTERS) {
      await hre.run("setup-test-router", { router });
    }
  } else {
    console.log("Skipping test setup on chainId: ", chainId);
  }
};
export default func;
