import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
import { BigNumber, Contract } from "ethers";
import { task } from "hardhat/config";
import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  env?: Env;
  amount: string;
};

export default task("mint-testtoken", "Mint TEST token")
  .addOptionalParam("amount", "Amount to mint")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ amount: _amount, env: _env }: TaskArgs, hre) => {
    const signers = await hre.ethers.getSigners();
    const amount = BigNumber.from(_amount);
    const env = mustGetEnv(_env);

    const testTokenName = getDeploymentName("TestERC20", env);
    const testTokenDeployment = await hre.deployments.get(testTokenName);
    const testTokenAddress = testTokenDeployment.address;
    const testToken = new Contract(testTokenAddress, testTokenDeployment.abi);

    const mintTxn = async (signer: SignerWithAddress) => {
      const tx = await testToken.populateTransaction.mint(signer.address, amount);
      const response = await signer.sendTransaction(tx);
      const receipt = await response.wait();
      return receipt.transactionHash;
    };

    for (let i = 0; i < signers.length; i++) {
      console.log(await mintTxn(signers[i]));
      console.log(`Minted ${amount} TEST for ${signers[i].address}`);
    }
  });
