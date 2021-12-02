import { task } from "hardhat/config";
import { utils } from "ethers";

export default task("deploy-router-factory", "deploy router factory contract")
  .addParam("signer", "The router's signer address")
  .addParam("recipient", "recipient address")
  .setAction(async ({ signer, recipient }, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("signer: ", signer);
    console.log("recipient: ", recipient);

    console.log("namedAccounts: ", namedAccounts);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { address, deploy } = await deployments.deterministic("RouterFactory", {
      from: namedAccounts.deployer,
      salt: utils.keccak256(namedAccounts.deployer),
      args: [namedAccounts.deployer],
      log: true,
    });

    const routerFactoryAddress = address;
    console.log("routerFactoryAddress: ", routerFactoryAddress);
    const deployment = await deploy();

    console.log("router factory deployment: ", {
      newlyDeployed: deployment.newlyDeployed,
      address: deployment.address,
      transactionHash: deployment.transactionHash,
    });

    const routerFactory = await ethers.getContractAt("RouterFactory", routerFactoryAddress);

    const transactionManagerDeployment = await deployments.get("TransactionManager");
    const transactionManagerAddress = transactionManagerDeployment.address;

    const txManager = await ethers.getContractAt("TransactionManager", transactionManagerAddress);
    const chainId = await txManager.getChainId();

    console.log({ transactionManagerAddress, chainId });

    const tx = await routerFactory.init(transactionManagerAddress, { from: namedAccounts.deployer });
    console.log("router factory init tx: ", tx);
    const receipt = await tx.wait();
    console.log("router factory init tx mined: ", receipt.transactionHash);
  });
