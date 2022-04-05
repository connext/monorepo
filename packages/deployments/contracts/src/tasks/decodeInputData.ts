import { Interface } from "ethers/lib/utils";
import { task } from "hardhat/config";

type TaskArgs = {
  inputData: string;
  type: "execute";
};

export default task("decode-input-data", "Decodes input data")
  .addParam("inputData", "Input data")
  .addParam("type", "Function name to decode")
  .setAction(async ({ inputData, type }: TaskArgs, { deployments }) => {
    console.log("inputData: ", inputData);
    console.log("type: ", type);

    const connextDeployment = await deployments.get("Connext");
    const connextMinterface = new Interface(connextDeployment.abi);

    if (type === "execute") {
      const decoded = connextMinterface.decodeFunctionData(type, inputData);
      console.log("decoded: ", decoded);
    }
  });
