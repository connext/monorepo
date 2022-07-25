import { utils } from "ethers";
import { task } from "hardhat/config";

type TaskArgs = {
  amount: string;
};

export default task("dust", "Dust other accounts on a wallet")
  .addParam("amount", "Amount to dust (real units)")
  .setAction(async ({ amount: _amount }: TaskArgs, hre) => {
    const [sender, ...accounts] = await hre.ethers.getSigners();
    const amount = _amount;
    console.log(`Sender: ${sender.address}`);
    console.log(`Number of accounts: ${accounts.length}`);
    const balanceNeeded = utils.parseUnits(amount, 18).mul(accounts.length);
    console.log(`Amount to distribute each: ${amount} (total: ${utils.formatEther(balanceNeeded)})`);

    // Check sender has enough to send to all accounts
    const balance = await hre.ethers.provider.getBalance(sender.address);
    if (balance.lt(balanceNeeded)) {
      throw new Error(
        `Sender balance (${utils.formatEther(balance)}) is less than total needed (>${utils.formatEther(
          balanceNeeded,
        )})`,
      );
    }

    const sendTxn = async (recipient: string) => {
      const tx = await sender.sendTransaction({
        to: recipient,
        value: utils.parseUnits(amount, 18),
        gasLimit: 1_000_000,
      });
      const receipt = await tx.wait();
      console.log(`Sent ${amount} to ${recipient}`);
      console.log(`  Tx: ${receipt.transactionHash}`);
      const balance = utils.formatEther(await hre.ethers.provider.getBalance(recipient));
      console.log("  New balance: ", balance);
      return receipt.transactionHash;
    };

    // Send amount to each recipient
    for (let i = 0; i < accounts.length; i++) {
      await sendTxn(accounts[i].address);
    }
  });
