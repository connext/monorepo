import { task } from "hardhat/config";

type TaskArgs = {
  router: string;
  amount: string;
  asset: string;
};

export default task("remove-relayer-fee", "remove relayer fee from router contract")
  .addParam("router", "The Router.sol contract address")
  .addParam("amount", "amount")
  .addParam("asset", "asset")
  .setAction(async ({ router, amount, asset }: TaskArgs, { ethers }) => {
    const deployer = await ethers.getNamedSigner("deployer");

    console.log("router: ", router);
    console.log("amount: ", amount);
    console.log("asset: ", asset);

    console.log("deployer: ", deployer.address);

    if (!router) {
      console.log("router address missing");
      return;
    }

    const routerInstance = await ethers.getContractAt("Router", router);

    const ownerAddress = await routerInstance.owner();
    console.log("ownerAddress: ", ownerAddress);

    const tx = await routerInstance.removeRelayerFee(amount, asset, { from: deployer.address });
    console.log("removeRelayerFee tx: ", tx);
    const receipt = await tx.wait();
    console.log("removeRelayerFee tx mined: ", receipt.transactionHash);
  });
