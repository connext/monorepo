import { Interface } from "ethers/lib/utils";
import { task } from "hardhat/config";

export default task("decode-input-data", "Decodes input data")
  .addParam("inputData", "Input data")
  .setAction(async ({ inputData, type }, { deployments }) => {
    console.log("inputData: ", inputData);
    console.log("type: ", type);

    const connextDeployment = await deployments.get("Connext");
    const connextMinterface = new Interface(connextDeployment.abi);

    if (type === "execute") {
      const decoded = connextMinterface.decodeFunctionData("execute", inputData);
      console.log("decoded: ", decoded);
    }
  });
