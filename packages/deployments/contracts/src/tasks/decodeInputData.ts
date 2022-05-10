import { Interface } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { Env } from "../utils";

type TaskArgs = {
  inputData: string;
  type: "execute";
  env?: Env;
};

export default task("decode-input-data", "Decodes input data")
  .addParam("inputData", "Input data")
  .addOptionalParam("type", "Function name to decode", "execute")
  .setAction(async ({ inputData, type, env: _env }: TaskArgs, { deployments }) => {
    console.log("inputData: ", inputData);
    console.log("type: ", type);
    if (!["execute", "xcall"].includes(type)) {
      throw new Error("Unsupported type");
    }

    const connextDeployment = await deployments.getArtifact("ConnextHandler");
    const connextInterface = new Interface(connextDeployment.abi);

    const decoded = connextInterface.decodeFunctionData(type, inputData);
    console.log("decoded: ", decoded);
  });
