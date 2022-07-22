import { BigNumber } from "ethers";
import { task } from "hardhat/config";

type TaskArgs = {
  transactingAssetId?: string;
  to?: string;
  amount: string;
};

export default task("self-dust", "Dust other accounts on a given wallet")
  .addOptionalParam("amount", "Amount to transfer")
  .setAction(async ({ transactingAssetId: _transactingAssetId, amount: _amount }: TaskArgs, hre) => {
    const [sender, ...recipients] = await hre.ethers.getSigners();
    const amount = BigNumber.from(_amount);
    console.log(`Sender: ${sender.address}`);
    console.log(`Number of recipients: ${recipients.length}`);
    console.log(`Amount to distribute each: ${amount} (total: ${amount.mul(recipients.length)})`);

    // Check sender has enough to send to all recipients
    const balance = await hre.ethers.provider.getBalance(sender.address);
    if (balance.lt(amount.mul(recipients.length))) {
      throw new Error(`Sender balance ${balance} is less than total needed`);
    }

    // Send amount to each recipient
    const receipts = Promise.all(
      recipients.map(async (recipient) => {
        const tx = await sender.sendTransaction({
          to: recipient.address,
          value: amount,
          gasLimit: 1_000_000,
        });
        console.log(`Sent ${amount} to ${recipient.address}`);
        return tx.wait();
      }),
    );
    await receipts;
  });
