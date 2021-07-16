import { Wallet, BigNumberish, Contract } from "ethers";

export const approveTokens = async (spender: string, amount: BigNumberish, approver: Wallet, token: Contract) => {
  const approveTx = await token.connect(approver).approve(spender, amount);
  await approveTx.wait();
};
