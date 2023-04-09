import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

import { config as dotenvConfig } from "dotenv";
import { Contract, Wallet, constants } from "ethers";
import { DeployFunction, DeploymentSubmission } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { getFacetsToDeploy } from "../deployConfig";
import { getProposedFacetCuts, FacetOptions, getUpgradedAbi } from "../deployHelpers";
import { getDeploymentName } from "../src";

dotenvConfig();

/**
 * Hardhat task defining the contract deployments for Connext
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  let _deployer: any;
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("\n============================= Proposing Execution Upgrade ===============================");
  console.log("deployer: ", deployer.address);

  const network = await hre.ethers.provider.getNetwork();
  console.log("network: ", network);

  const zksync = hre.network.config.zksync || false;
  console.log("zksync: ", zksync);

  // Get the current connext deployment
  const connextDeployment = await hre.deployments.getOrNull(getDeploymentName("Connext"));
  if (!connextDeployment) {
    throw new Error("Connext deployment not found, please deploy Connext first");
  }
  const connext = new Contract(connextDeployment.address, connextDeployment.abi, deployer);

  // Get all the facet options
  const facetsToDeploy = getFacetsToDeploy(zksync);

  const facets: (FacetOptions & { abi: any[] })[] = [];
  for (const facet of facetsToDeploy) {
    const deployment = await hre.deployments.getOrNull(facet.name);
    if (!deployment) {
      throw new Error(`Failed to get deployment for ${facet.name}`);
    }
    facets.push({
      abi: deployment.abi,
      name: facet.name,
      contract: new Contract(deployment.address, deployment.abi),
    });
  }

  // get excluded facets
  const excludedFacets = facets.filter((f) => f.name.includes("DiamondLoupeFacet")).map((c) => c.contract.address);

  // Determine the cuts
  const generated = await getProposedFacetCuts(facets, connext, excludedFacets);
  console.log("cuts: ", generated);

  if (!generated.length) {
    console.log(`No upgrade needed`);
    return;
  }

  // Automatically ensure these are the same as expected in `cuts.json`
  // and that there is a record of the upgrade test passing.
  const path = resolve(`./cuts.json`);
  if (!existsSync(path)) {
    throw new Error(`No upgrade test output found, please run "test:upgrade" command`);
  }
  const record = JSON.parse(readFileSync(path, "utf8") ?? "{}");
  if (!record?.passed) {
    throw new Error(`Could not find passing record of upgrade cut, please run "test:upgrade" command`);
  }
  // Ensure generated cuts are the same as the proposed cuts
  const { connext: testConnext, proposal } = record[network.chainId] ?? {};
  if (!testConnext || !proposal) {
    throw new Error(`Could not find proposed cuts for chainId: ${network.chainId} in upgrade test record`);
  }
  if (testConnext !== connextDeployment.address) {
    throw new Error(
      `No record of passing against currect connext deployment: ${connextDeployment.address}, please run "test:upgrade" command`,
    );
  }
  generated.forEach((cut) => {
    const matching = proposal.find((p: any) => p.action === cut.action && cut.name.includes(p.name as string));
    if (!matching) {
      throw new Error(`No matching cut found for ${cut.action} ${cut.facetAddress} in test record`);
    }
    // ensure the function signatures match
    if (matching.functionSelectors.join(",") !== cut.functionSelectors.join(",")) {
      throw new Error(`Function signatures do not match for ${cut.action} ${cut.facetAddress} in test record`);
    }
  });
  if (proposal.length !== generated.length) {
    throw new Error(`Cuts missing from generated cuts compared to test record`);
  }

  // Generate + submit the proposal
  let acceptanceTime = (await connext.getAcceptanceTime(generated, constants.AddressZero, "0x")).toNumber();
  if (acceptanceTime === 0) {
    // Has not yet been proposed, propose
    console.log(`Proposal needed, proposing upgrade`);
    console.log(`proposal tx:`, {
      to: connext.address,
      chain: network.chainId,
      data: connext.interface.encodeFunctionData("proposeDiamondCut", [generated, constants.AddressZero, "0x"]),
    });

    if ((await connext.owner()).toLowerCase() !== deployer.address.toLowerCase()) {
      console.log(`deployer is not owner, cannot submit txs`);
      return;
    }

    const proposalTx = await connext.proposeDiamondCut(generated, constants.AddressZero, "0x");
    console.log(`Proposal tx:`, proposalTx.hash);
    const proposal = await proposalTx.wait();
    console.log(`Upgrade to diamond proposed`, proposal.transactionHash);

    // Reset acceptance time
    acceptanceTime = (await connext.getAcceptanceTime(generated, constants.AddressZero, "0x")).toNumber();
  }

  // Check to see if the proposal should be accepted automatically
  const accept = process.env.ACCEPT_PROPOSAL === "true";
  const upgradeData = connext.interface.encodeFunctionData("diamondCut", [generated, constants.AddressZero, "0x"]);
  if (!accept) {
    console.log(`Not attempting upgrade acceptance. upgrade tx:`, {
      to: connext.address,
      data: upgradeData,
      from: deployer.address,
    });
    return;
  }

  // Attempt to accept the proposal if possible
  const currentTimeStamp = Math.floor(Date.now() / 1000);
  if (acceptanceTime > currentTimeStamp) {
    console.log(`delay not elapsed. still wait for ${acceptanceTime - currentTimeStamp} sec`);
    return;
  }
  const upgradeTx = await connext.diamondCut(generated, constants.AddressZero, "0x");
  console.log("upgrade transaction", upgradeTx.hash);
  const upgrade = await upgradeTx.wait();
  console.log("upgrade receipt", upgrade);

  // Save updated abi to Connext Deployment if cuts were performed
  const diamondDeployment: DeploymentSubmission = {
    ...connextDeployment,
    abi: generated.length ? getUpgradedAbi(facets, connextDeployment.abi) : connextDeployment.abi,
  };

  await hre.deployments.save(getDeploymentName("Connext"), diamondDeployment);
  console.log("upgraded abi");
};
func.dependencies = ["relayer-fee-upgrade"];
func.tags = ["propose-diamond-upgrade"];

export default func;
