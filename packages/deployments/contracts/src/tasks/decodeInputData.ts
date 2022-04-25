import { Interface } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../utils";

type TaskArgs = {
  inputData: string;
  type: "execute";
  env?: Env;
};

export default task("decode-input-data", "Decodes input data")
  .addParam("inputData", "Input data")
  .addParam("type", "Function name to decode")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ inputData, type, env: _env }: TaskArgs, { deployments }) => {
    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("inputData: ", inputData);
    console.log("type: ", type);

    const connextDeployment = await deployments.get(getDeploymentName("Connext", env));
    const connextInterface = new Interface(connextDeployment.abi);

    if (type === "execute") {
      const decoded = connextInterface.decodeFunctionData(type, inputData);
      console.log("decoded: ", decoded);
    }
  });
