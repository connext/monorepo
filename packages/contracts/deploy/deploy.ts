import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { constants } from "ethers";

import { getHexDomainFromString } from "../src/nomad";

const TEST_ROUTERS = [
  "0x9ADA6aa06eF36977569Dc5b38237809c7DF5082a", // live testnet router
  "0x0EC26F03e3dBA9bb5162D28fD5a3378A25f168d1", // rahul test router
  "0xDc150c5Db2cD1d1d8e505F824aBd90aEF887caC6", // ci/shared router
  "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", // local router
];

const SKIP_SETUP = [1, 10, 56, 250, 137, 100, 122, 1285, 42161, 43114, 1284];
const WRAPPED_ETH_MAP = new Map();
WRAPPED_ETH_MAP.set("1", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"); // mainnet WETH
WRAPPED_ETH_MAP.set("4", "0xc778417E063141139Fce010982780140Aa0cD5Ab"); // rinkeby WETH
WRAPPED_ETH_MAP.set("42", "0xd0A1E359811322d97991E03f863a0C30C2cF029C"); // kovan WETH
WRAPPED_ETH_MAP.set("10", "0x4200000000000000000000000000000000000006"); // optimism WETH
WRAPPED_ETH_MAP.set("56", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"); // Binance Smart Chain WBNB
WRAPPED_ETH_MAP.set("137", "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"); // polygon WMATIC
WRAPPED_ETH_MAP.set("250", "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"); // fantom WFTM
WRAPPED_ETH_MAP.set("42161", "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"); // arbitrum WETH
WRAPPED_ETH_MAP.set("43114", "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"); // avalanche WAVAX
WRAPPED_ETH_MAP.set("100", "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d"); // xdai wxDAI
WRAPPED_ETH_MAP.set("1285", "0x98878B06940aE243284CA214f92Bb71a2b032B8A"); // moonriver wMOVR
WRAPPED_ETH_MAP.set("1284", "0xAcc15dC74880C9944775448304B263D191c6077F"); // moonbeam wGLMR

const chainIdToNomad: Map<number, { name: string; bridgeRouter: string; tokenRegistry: string; wrappedEth: string }> =
  new Map([
    [
      4,
      {
        name: "rin",
        bridgeRouter: "0xeACafFb9fBCe3d4c4C5D07AF5DFa51CcF5a348b7",
        tokenRegistry: "0x885A8bd4be130422AEB1Eb9Eeb9513a5D2102cad",
        wrappedEth: WRAPPED_ETH_MAP.get("4"),
      },
    ],
    [
      42,
      {
        name: "kov",
        bridgeRouter: "0xa50E2db92c48f1c20C42338e6091E6B73da376a4",
        tokenRegistry: "0x7fe65Cd0b589B39E7744DE73ad225085F0FE7f39",
        wrappedEth: WRAPPED_ETH_MAP.get("42"),
      },
    ],
    [
      31337,
      {
        name: "local31337",
        bridgeRouter: constants.AddressZero,
        tokenRegistry: constants.AddressZero,
        wrappedEth: constants.AddressZero,
      },
    ],
    [
      1337,
      {
        name: "local1337",
        bridgeRouter: constants.AddressZero,
        tokenRegistry: constants.AddressZero,
        wrappedEth: constants.AddressZero,
      },
    ],
    [
      1338,
      {
        name: "local1338",
        bridgeRouter: constants.AddressZero,
        tokenRegistry: constants.AddressZero,
        wrappedEth: constants.AddressZero,
      },
    ],
  ]);

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

  const nomadConfig = chainIdToNomad.get(Number(chainId));
  if (!nomadConfig) {
    throw new Error(`No mapping exists for chain ${chainId}`);
  }
  console.log("nomadConfig: ", nomadConfig);
  const domain = getHexDomainFromString(nomadConfig.name);

  let dep = await hre.deployments.deterministic("TransactionManager", {
    from: deployer,
    args: [domain, nomadConfig.bridgeRouter, nomadConfig.tokenRegistry, nomadConfig.wrappedEth],
    log: true,
  });
  let deployment = await dep.deploy();

  const txManagerAddress = deployment.address;
  console.log("txManagerAddress: ", txManagerAddress);

  if (WRAPPED_ETH_MAP.has(chainId)) {
    console.log("Deploying ConnextPriceOracle to configured chain");

    let deployedPriceOracleAddress;
    try {
      deployedPriceOracleAddress = (await hre.deployments.get("ConnextPriceOracle")).address;
    } catch (e) {
      console.log("ConnextPriceOracle not deployed yet");
    }
    await hre.deployments.deploy("ConnextPriceOracle", {
      from: deployer,
      args: [WRAPPED_ETH_MAP.get(chainId)],
      log: true,
    });

    const priceOracleDeployment = await hre.deployments.get("ConnextPriceOracle");
    const newPriceOracleAddress = priceOracleDeployment.address;
    if (deployedPriceOracleAddress && deployedPriceOracleAddress != newPriceOracleAddress) {
      console.log("Setting v1PriceOracle, v1PriceOracle: ", deployedPriceOracleAddress);
      const priceOracleContract = await hre.ethers.getContractAt("ConnextPriceOracle", newPriceOracleAddress);
      const tx = await priceOracleContract.setV1PriceOracle(deployedPriceOracleAddress, { from: deployer });
      console.log("setV1PriceOracle tx: ", tx);
      await tx.wait();
    }
  }

  console.log("Deploying multicall to configured chain");
  dep = await hre.deployments.deterministic("Multicall", {
    from: deployer,
    log: true,
  });
  await dep.deploy();

  if (!SKIP_SETUP.includes(parseInt(chainId))) {
    console.log("Deploying test token on non-mainnet chain");
    await hre.deployments.deterministic("TestERC20", {
      from: deployer,
      log: true,
    });
    deployment = await dep.deploy();
    console.log("TestERC20: ", deployment.address);

    // console.log("Deploying counter on non-mainnet chain");
    // await hre.deployments.deterministic("Counter", {
    //   from: deployer,
    //   log: true,
    // });
    // deployment = await dep.deploy();
    // console.log("Counter: ", deployment.address);

    if (!process.env.SKIP_SETUP) {
      console.log("Setting up test routers on chain", chainId);
      // for (const router of TEST_ROUTERS) {
      //   await hre.run("setup-test-router", { router });
      // }
    }
  } else {
    console.log("Skipping test setup on chainId: ", chainId);
  }
};
export default func;
