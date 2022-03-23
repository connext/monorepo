import { BigNumber, constants, providers } from "ethers";
import { task } from "hardhat/config";

export default task("prepare", "Prepare a cross-chain tx")
  .addParam("transactingAssetId", "Transacting asset Id")
  .addParam("amount", "Amount to transfer")
  .addParam("to", "To address")
  .addParam("originDomain", "Origin domain")
  .addParam("destinationDomain", "Destination domain")
  .addOptionalParam("callData", "Data for external call")
  .addOptionalParam("connextAddress", "Override connext address")
  .setAction(
    async (
      { transactingAssetId, amount, connextAddress: _connextAddress, to, callData, originDomain, destinationDomain },
      { deployments, ethers },
    ) => {
      let tx: providers.TransactionResponse;
      const [sender] = await ethers.getSigners();
      console.log("sender: ", sender.address);

      console.log("transactingAssetId: ", transactingAssetId);
      console.log("amount: ", amount);
      console.log("callData: ", callData);
      console.log("originDomain: ", originDomain);
      console.log("to: ", to);
      console.log("destinationDomain: ", destinationDomain);

      let connextAddress = _connextAddress;
      if (!connextAddress) {
        const connextDeployment = await deployments.get("Connext_Proxy");
        connextAddress = connextDeployment.address;
      }
      console.log("connextAddress: ", connextAddress);

      let balance: BigNumber;
      if (transactingAssetId === constants.AddressZero) {
        balance = await ethers.provider.getBalance(sender.address);
      } else {
        const erc20 = await ethers.getContractAt("IERC20Minimal", transactingAssetId, sender);
        const allowance = await erc20.allowance(sender.address, connextAddress);
        if (allowance.lt(amount)) {
          console.log("Approving tokens");
          tx = await erc20.approve(connextAddress, constants.MaxUint256);
          console.log("approval tx sent: ", tx.hash);
          await tx.wait();
          console.log("approval tx mined", tx.hash);
        }
        balance = await erc20.balanceOf(sender.address);
      }
      if (balance.lt(amount)) {
        throw new Error(`Balance ${balance.toString()} is less than amount ${amount}`);
      }

      const connext = await ethers.getContractAt("Connext_Implementation", connextAddress);
      const args = [
        {
          params: {
            to,
            callData: callData ?? "0x",
            originDomain,
            destinationDomain,
          },
          transactingAssetId,
          amount,
        },
        { from: sender.address },
      ];
      console.log("xcall args", args);
      tx = await connext.functions.xcall(...args);
      console.log("tx sent! ", tx.hash);
      await tx.wait();
      console.log("tx mined! ", tx.hash);
    },
  );
