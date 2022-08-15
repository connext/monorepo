import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber } from "ethers";

import { AMBContractInfo, OPTIMISM_AMB } from "../deployConfig/shared";

const HUB_CHAIN = 1337;
const ACCEPTABLE_TEST_CHAINS = [1337, 1338];

/**
 * Hardhat task for deploying the AMB Messaging Layer contracts.
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const chain = await hre.getChainId();
  if (!ACCEPTABLE_TEST_CHAINS.includes(+chain)) {
    console.log(`Skipping mainnet fork deployment step for chain ${chain}: only intended for local test environment.`);
    return;
  }

  console.log("\n============================= Mainnet Fork: Testbed Setup ===============================");

  // const infoFile = fs.readFileSync("../deployConfig/fork/OptimismAMB.json", "utf-8").toString();
  const contract: AMBContractInfo = +chain === HUB_CHAIN ? OPTIMISM_AMB.hub : OPTIMISM_AMB.spoke;
  console.log("Retrieved AMB info.");

  // Set the code for the contract to the correct address.
  const success = await hre.network.provider.request({
    method: "hardhat_setCode",
    params: [contract.address, contract.code],
  });
  if (!success) {
    throw new Error(`RPC call \`hardhat_setCode\` failed for ${contract.address}`);
  }
  console.log("Set code for", contract.address);

  // Set the storage values indexed by storage position.
  for (let i = 0; i < contract.storage.length; i++) {
    const value = contract.storage[i];
    // Skip 0 values (everything will be 0x by default).
    if (value === "0x0000000000000000000000000000000000000000000000000000000000000000") {
      continue;
    }
    let index = BigNumber.from(i).toHexString();
    index = index === "0x00" ? "0x0" : index;
    const success = await hre.network.provider.request({
      method: "hardhat_setStorageAt",
      params: [contract.address, index, value],
    });
    if (!success) {
      throw new Error(`RPC call \`hardhat_setStorageAt\` failed for ${index}: ${value}`);
    }
    console.log("Set storage:", index, value);
  }

  // console.log(`Setting up mainnet fork for block ${MAINNET_FORK_BLOCK}.`);
  // hre.network.provider.request({
  //   method: "hardhat_reset",
  //   params: [
  //     {
  //       forking: {
  //         jsonRpcUrl:
  //           process.env.ETH_PROVIDER_URL || process.env.MAINNET_ETH_PROVIDER_URL || "https://cloudflare-eth.com",
  //         blockNumber: MAINNET_FORK_BLOCK,
  //       },
  //     },
  //   ],
  // });
  // console.log("Done.");

  console.log("Enabling automine...");
  hre.network.provider.request({
    method: "evm_setAutomine",
    params: [true],
  });
  console.log("Automine enabled.");
};

export default func;

func.tags = ["Fork", "prod", "local", "mainnet"];
func.dependencies = [];
