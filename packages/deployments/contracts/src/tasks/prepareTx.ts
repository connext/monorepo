import { BigNumber, constants, providers } from "ethers";
import { task } from "hardhat/config";

export default task("prepare", "Prepare a cross-chain tx")
  .addParam("transactingAssetId", "Transacting asset Id")
  .addParam("amount", "Amount to transfer")
  .addParam("recipient", "Recipient address")
  .addParam("originDomain", "Origin domain")
  .addParam("destinationDomain", "Destination domain")
  .addOptionalParam("callTo", "Address of external call")
  .addOptionalParam("callData", "Data for external call")
  .addOptionalParam("txManagerAddress", "Override tx manager address")
  .setAction(
    async (
      {
        transactingAssetId,
        amount,
        txManagerAddress: _txManagerAddress,
        recipient,
        callTo,
        callData,
        originDomain,
        destinationDomain,
      },
      { deployments, ethers },
    ) => {
      let tx: providers.TransactionResponse;
      const [sender] = await ethers.getSigners();
      console.log("sender: ", sender.address);

      console.log("transactingAssetId: ", transactingAssetId);
      console.log("amount: ", amount);
      console.log("callTo: ", callTo);
      console.log("callData: ", callData);
      console.log("originDomain: ", originDomain);
      console.log("recipient: ", recipient);
      console.log("destinationDomain: ", destinationDomain);

      let txManagerAddress = _txManagerAddress;
      if (!txManagerAddress) {
        const txManagerDeployment = await deployments.get("TransactionManager");
        txManagerAddress = txManagerDeployment.address;
      }
      console.log("txManagerAddress: ", txManagerAddress);

      let balance: BigNumber;
      if (transactingAssetId === constants.AddressZero) {
        balance = await ethers.provider.getBalance(sender.address);
      } else {
        const erc20 = await ethers.getContractAt("IERC20Minimal", transactingAssetId, sender);
        const allowance = await erc20.allowance(sender.address, txManagerAddress);
        if (allowance.lt(amount)) {
          console.log("Approving tokens");
          tx = await erc20.approve(txManagerAddress, constants.MaxUint256);
          console.log("approval tx sent: ", tx.hash);
          await tx.wait();
          console.log("approval tx mined", tx.hash);
        }
        balance = await erc20.balanceOf(sender.address);
      }
      if (balance.lt(amount)) {
        throw new Error(`Balance ${balance.toString()} is less than amount ${amount}`);
      }

      const txManager = await ethers.getContractAt("TransactionManager", txManagerAddress);
      tx = await txManager.functions.send(
        {
          params: {
            recipient,
            callTo: callTo ?? constants.AddressZero,
            callData: callData ?? "0x",
            originDomain,
            destinationDomain,
          },
          transactingAssetId,
          amount,
        },
        { from: sender.address },
      );
      console.log("tx sent! ", tx.hash);
      await tx.wait();
      console.log("tx mined! ", tx.hash);
    },
  );
