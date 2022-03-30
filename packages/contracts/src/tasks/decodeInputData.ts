import { Interface } from "ethers/lib/utils";
import { task } from "hardhat/config";

export default task("decode-input-data", "Decodes input data")
  .addParam("inputData", "Input data")
  .addParam("type", "Input data")
  .setAction(async ({ inputData, type }, { deployments }) => {
    console.log("inputData: ", inputData);
    console.log("type: ", type);

    const txManagerDeployment = await deployments.get("TransactionManager");
    const txMinterface = new Interface(txManagerDeployment.abi);

    if (type === "fulfill") {
      const decoded = txMinterface.decodeFunctionData("fulfill", inputData);
      console.log("decoded: ", decoded);
    } else if (type === "prepare") {
      const decoded = txMinterface.decodeFunctionData("prepare", inputData);
      console.log("decoded: ", decoded);
    }
  });
