import { utils } from "ethers";
import { Interface } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { Env, mustGetEnv } from "../src/utils";

type TaskArgs = {
  message: string;
  connextAddress?: string;
  env?: Env;
  contract?: string;
};

export default task("debug-custom-error", "Debug revert data from connext contract")
  .addParam("message", "The data from the revert log")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "The environment for the contract")
  .addOptionalParam("contract", "The name for the contract")
  .setAction(
    async ({ message, connextAddress: _connextAddress, env: _env, contract: _contract }: TaskArgs, { deployments }) => {
      console.log("revert data: ", message);
      const env = mustGetEnv(_env);
      console.log("env:", env);

      const deployment = await deployments.getArtifact(_contract ?? "Connext");

      //"error":{"reason":"processing response error","code":"SERVER_ERROR","body":"{\"jsonrpc\":\"2.0\",\"id\":49,\"error\":{\"code\":-32603,\"message\":\"Error: Transaction reverted without a reason string\",\"data\":{\"message\":\"Error: Transaction reverted without a reason string\",\"data\":\"0x991634c4\"}}}","error":{"code":-32603,"data":{"message":"Error: Transaction reverted without a reason string","data":"0x991634c4"}},
      const iErrors = new Interface(deployment.abi);
      let parsed = "";
      if (!message) {
        parsed = "";
      }
      if (message.startsWith("0x08c379a0")) {
        // decode Error(string)

        const content = `0x${message.substring(10)}`;
        const reason = utils.defaultAbiCoder.decode(["string"], content);

        parsed = reason[0]; // reason: string; for standard revert error string
      }

      if (message.startsWith("0x4e487b71")) {
        // decode Panic(uint)
        const content = `0x${message.substring(10)}`;
        const code = utils.defaultAbiCoder.decode(["uint"], content);

        parsed = code[0];
      }

      try {
        const errDescription = iErrors.parseError(message);
        parsed = errDescription?.name;
      } catch (e: any) {
        console.error(e);
      }

      console.log("Parsed !!   ", parsed);
    },
  );
