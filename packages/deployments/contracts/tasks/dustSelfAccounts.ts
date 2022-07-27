import { BigNumber, utils } from "ethers";
import { task } from "hardhat/config";

type TaskArgs = {
  amount: string;
  minimumOnly?: string;
};

export default task("dust", "Dust other accounts on a wallet")
  .addParam("amount", "Amount to dust (real units)")
  .addOptionalParam("minimumOnly", "Whether to skip accounts that already have enough")
  .setAction(async ({ amount, minimumOnly: _minimumOnly }: TaskArgs, hre) => {
    const minimumOnly = _minimumOnly === "true" ? true : false;
    const [sender, ...accounts] = await hre.ethers.getSigners();
    const amountBase = utils.parseUnits(amount, 18);
    console.log(`Sender: ${sender.address}`);

    const balances: Map<string, BigNumber> = await hre.run("read-balances");

    // Check sender has enough to send to all accounts
    let senderBalanceNeeded = BigNumber.from(0);

    const toSend: Map<string, BigNumber> = new Map();
    if (minimumOnly) {
      for (const account of accounts) {
        const balance = balances.get(account.address)!;
        if (balance.lt(amountBase)) {
          const diff: BigNumber = amountBase.sub(balance);
          toSend.set(account.address, diff);
          senderBalanceNeeded = senderBalanceNeeded.add(diff);
          console.log(`Account ${account.address} needs ${utils.formatEther(diff)} more`);
        }
      }
      console.log(`Total amount to distribute: ${utils.formatEther(senderBalanceNeeded)}`);
    } else {
      senderBalanceNeeded = amountBase.mul(accounts.length);
      console.log(`Amount to distribute each: ${amount} (total: ${utils.formatEther(senderBalanceNeeded)})`);
    }

    const balance = await hre.ethers.provider.getBalance(sender.address);
    if (balance.lt(senderBalanceNeeded)) {
      throw new Error(
        `Sender balance (${utils.formatEther(balance)}) is less than total needed (>${utils.formatEther(
          senderBalanceNeeded,
        )})`,
      );
    }

    // Send amount to each recipient
    const sendTxn = async (recipient: string, amt: BigNumber) => {
      const tx = await sender.sendTransaction({
        to: recipient,
        value: amt,
        gasLimit: 1_000_000,
      });
      const receipt = await tx.wait();
      console.log(`Sent ${utils.formatEther(amt)} to ${recipient}`);
      console.log(`  Tx: ${receipt.transactionHash}`);
      const balance = utils.formatEther(await hre.ethers.provider.getBalance(recipient));
      console.log("  New balance: ", balance);
      return receipt.transactionHash;
    };

    for (let i = 0; i < accounts.length; i++) {
      if (minimumOnly) {
        if (toSend.has(accounts[i].address)) {
          await sendTxn(accounts[i].address, toSend.get(accounts[i].address)!);
        }
      } else {
        await sendTxn(accounts[i].address, amountBase);
      }
    }
  });
