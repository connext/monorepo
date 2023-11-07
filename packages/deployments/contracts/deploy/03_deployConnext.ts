import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { constants, Contract, Wallet } from "ethers";
import { DeploymentSubmission } from "hardhat-deploy/dist/types";
import { chainIdToDomain } from "@connext/nxtp-utils";

import { SKIP_SETUP } from "../src/constants";
import { getConnectorName, getDeploymentName, getProtocolNetwork, getRelayerProxyConfig } from "../src/utils";
import { FacetOptions, getProposedFacetCuts, getUpgradedAbi } from "../deployHelpers";
import { MESSAGING_PROTOCOL_CONFIGS, getFacetsToDeploy } from "../deployConfig/shared";

const KEEP3R_ADDRESSES: Record<number, string> = {
  1: "0xeb02addCfD8B773A5FFA6B9d1FE99c566f8c44CC",
  5: "0x85063437C02Ba7F4f82F898859e4992380DEd3bb",
};

const PROPAGATE_COOLDOWN = 60 * 30; // 30 minutes
const AUTONOLAS_PRIORITY = 0;

/**
 * Hardhat task defining the contract deployments for Connext
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const chainId = await hre.getChainId();

  const acceptanceDelay = SKIP_SETUP.includes(parseInt(chainId)) ? 604800 : 0; // 604800 = 7 days

  let _deployer: any;
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("\n============================= Deploying Connext Contracts ===============================");
  console.log("deployer: ", deployer.address);

  console.log("acceptance delay: ", acceptanceDelay);

  const network = await hre.ethers.provider.getNetwork();
  console.log("network: ", network);
  const domain = chainIdToDomain(network.chainId);
  console.log("domain: ", domain);
  const price = await hre.ethers.provider.getGasPrice();
  console.log("price: ", price.toString());
  const zksync = hre.network.config.zksync || false;
  console.log("zksync: ", zksync);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("balance: ", balance.toString());

  // Get connector manager
  const messagingNetwork = getProtocolNetwork(chainId);
  const protocol = MESSAGING_PROTOCOL_CONFIGS[messagingNetwork];

  if (!protocol.configs[protocol.hub.chain]) {
    throw new Error(`Network ${messagingNetwork} is not supported! (no messaging config)`);
  }

  const connectorName = getConnectorName(protocol, +chainId);
  const connectorManagerDeployment = await hre.deployments.getOrNull(
    getDeploymentName(connectorName, undefined, protocol.configs[Number(chainId)].networkName),
  );
  if (!connectorManagerDeployment) {
    throw new Error(`${connectorName} not deployed`);
  }

  const lpTokenDeployment = await hre.deployments.deploy("LPToken", {
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  if (lpTokenDeployment.newlyDeployed) {
    await hre.deployments.execute(
      "LPToken",
      { from: deployer.address, log: true },
      "initialize",
      "Connext Stable LP Token",
      "ConnextStableLPToken",
    );
  }

  // Deploy connext diamond contract
  console.log("Deploying connext diamond...");
  const isDiamondUpgrade = !!(await hre.deployments.getOrNull(getDeploymentName("Connext")));

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

  let connext;
  if (isDiamondUpgrade) {
    console.log("proposing upgrade...");

    connext = (await hre.deployments.getOrNull(getDeploymentName("Connext")))!;
    const currentConnext = new Contract(connext.address, connext.abi, deployer);

    const cuts = await getProposedFacetCuts(facets, currentConnext);
    if (cuts.length) {
      // There is a proposal needed
      console.log(`Proposal needed, proposing upgrade`);
      const proposalTx = await currentConnext.proposeDiamondCut(cuts, constants.AddressZero, "0x");
      console.log(`Proposal tx:`, proposalTx.hash);
      const receipt = await proposalTx.wait();
      console.log(`Upgrade to diamond proposed`, receipt.transactionHash);
    } else {
      console.log(`No upgrade needed, using previous deployment`);
    }

    // Fallthrough after proposal, will either work or fail depending on delay
    try {
      if (cuts.length) {
        const contract = new Contract(connext.address, connext.abi, deployer);
        const acceptanceTime = (await contract.getAcceptanceTime(cuts, constants.AddressZero, "0x")).toNumber();
        const currentTimeStamp = Math.floor(Date.now() / 1000);
        if (acceptanceTime > currentTimeStamp) {
          console.log(`delay not elapsed. still wait for ${acceptanceTime - currentTimeStamp} sec`);
        } else {
          const upgradeTx = await contract.diamondCut(cuts, constants.AddressZero, "0x");
          console.log("upgrade transaction", upgradeTx.hash);
          const receipt = await upgradeTx.wait();
          console.log("upgrade receipt", receipt);

          // Save updated abi to Connext Deployment if cuts were performed
          const diamondDeployment: DeploymentSubmission = {
            ...connext,
            abi: cuts.length ? getUpgradedAbi(facets, connext.abi) : connext.abi,
          };

          await hre.deployments.save(getDeploymentName("Connext"), diamondDeployment);
          console.log("upgraded abi");
        }
      }
    } catch (e: any) {
      console.log(`upgrade failed`, e);
    }
  } else {
    connext = await hre.deployments.diamond.deploy(getDeploymentName("Connext"), {
      from: deployer.address,
      owner: deployer.address,
      log: true,
      facets: facetsToDeploy.filter((f) => !f.name.includes("LoupeFacet")),
      diamondContract: "ConnextDiamond",
      defaultOwnershipFacet: false,
      defaultCutFacet: false,
      execute: isDiamondUpgrade
        ? undefined
        : {
            contract: "DiamondInit",
            methodName: "init",
            args: [domain, connectorManagerDeployment.address, acceptanceDelay, lpTokenDeployment.address],
          },
    });
  }

  // const connext = (await hre.deployments.getOrNull(getDeploymentName("Connext")))!;
  const connextAddress = connext.address;
  console.log("connextAddress: ", connextAddress);

  console.log("Deploying Relayer Proxy...");

  const { feeCollector, gelatoRelayer } = getRelayerProxyConfig(chainId);
  const spokeConnector = await hre.ethers.getContract(
    getDeploymentName(getConnectorName(protocol, +chainId), undefined, protocol.configs[Number(chainId)].networkName),
  );

  const { configs } = protocol;

  if (protocol.hub.chain === network.chainId) {
    const chains = [];
    const hubConnectors = [];
    for (const spokeChain of Object.keys(configs)) {
      const contract = getConnectorName(protocol, +spokeChain, protocol.hub.chain);
      const deploymentName = getDeploymentName(contract, undefined, protocol.configs[+spokeChain].networkName);
      const hubConnector = await hre.ethers.getContract(deploymentName);
      chains.push(+spokeChain);
      hubConnectors.push(hubConnector.address);
    }
    const rootManager = await hre.ethers.getContract(getDeploymentName("RootManager"));
    const relayerProxyHub = await hre.deployments.deploy(getDeploymentName("RelayerProxyHub"), {
      from: deployer.address,
      log: true,
      contract: "RelayerProxyHub",
      args: [
        {
          connext: connextAddress,
          spokeConnector: spokeConnector.address,
          gelatoRelayer: gelatoRelayer,
          feeCollector: feeCollector,
          keep3r: KEEP3R_ADDRESSES[network.chainId],
          rootManager: rootManager.address,
          autonolas: constants.AddressZero,
          propagateCooldown: PROPAGATE_COOLDOWN,
          finalizeCooldown: PROPAGATE_COOLDOWN,
          proposeAggregateRootCooldown: PROPAGATE_COOLDOWN,
          hubConnectors: hubConnectors,
          hubConnectorChains: chains,
        },
      ],
    });

    console.log("relayerProxyHub: ", relayerProxyHub.address);
  } else {
    const relayerProxy = await hre.deployments.deploy(getDeploymentName("RelayerProxy"), {
      from: deployer.address,
      log: true,
      contract: "RelayerProxy",
      args: [
        {
          connext: connextAddress,
          spokeConnector: spokeConnector.address,
          gelatoRelayer: gelatoRelayer,
          feeCollector: feeCollector,
          keep3r: KEEP3R_ADDRESSES[network.chainId] ?? constants.AddressZero,
          proposeAggregateRootCooldown: PROPAGATE_COOLDOWN,
        },
      ],
    });

    console.log("relayerProxy: ", relayerProxy.address);
  }

  if (!SKIP_SETUP.includes(parseInt(chainId))) {
    console.log("Deploying test token on non-mainnet chain...");
    // Note: NOT using special token for staging envs
    let deployment = await hre.deployments.deploy("TestERC20", {
      from: deployer.address,
      log: true,
      skipIfAlreadyDeployed: true,
      args: ["Test Token", "TEST"],
    });
    console.log("TestERC20: ", deployment.address);

    deployment = await hre.deployments.deploy("TestAdopted", {
      contract: "TestERC20",
      from: deployer.address,
      log: true,
      skipIfAlreadyDeployed: true,
      args: ["Test Adopted", "TEST2"],
    });

    deployment = await hre.deployments.deploy("TestWETH", {
      contract: "TestERC20",
      from: deployer.address,
      log: true,
      skipIfAlreadyDeployed: true,
      args: ["Test Wrapped Ether", "TWETH"],
    });

    console.log("TestERC20: ", deployment.address);
  } else {
    console.log("Skipping test setup on chainId: ", chainId);
  }
};

export default func;

func.tags = ["Connext", "prod", "local", "mainnet"];
// func.dependencies = ["Messaging", "Facets"];
