import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
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

    const sendTxn = async (recipient: SignerWithAddress) => {
      const tx = await sender.sendTransaction({
        to: recipient.address,
        value: amount,
        gasLimit: 1_000_000,
      });
      const receipt = await tx.wait();
      return receipt.transactionHash;
    };

    // Send amount to each recipient
    for (let i = 0; i < recipients.length; i++) {
      await sendTxn(recipients[i]);
      console.log(`Sent ${amount} to ${recipients[i].address}`);
    }
  });
