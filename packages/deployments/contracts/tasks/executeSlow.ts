import { ExecuteArgs } from "@connext/nxtp-utils";
import { constants } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  relayerAddress: string;
  connextAddress?: string;
  env?: Env;
};

export default task("execute-slow", "Execute slow")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ connextAddress: _connextAddress, env: _env }: TaskArgs, { deployments, ethers }) => {
    const env = mustGetEnv(_env);
    console.log("env:", env);
    const connextName = getDeploymentName("Connext", env);
    let connextAddress;
    if (!connextAddress) {
      const connextDeployment = await deployments.get(connextName);
      connextAddress = connextDeployment.address;
    }
    console.log("connextAddress: ", connextAddress);
    const connext = await ethers.getContractAt(connextName, connextAddress);

    const executeArgs: ExecuteArgs = {
      params: {
        originDomain: "1869640809",
        destinationDomain: "6648936",
        canonicalDomain: "6648936",
        to: "0x0d5dc686d0a2abbfdafdfb4d0533e886517d4e83",
        delegate: "0x0d5dc686d0a2abbfdafdfb4d0533e886517d4e83",
        receiveLocal: false,
        callData: "0x",
        slippage: "0",
        originSender: "0x7d6dadb31dbebc68c8a0b2ccfe5c1f26f24bd41d",
        bridgedAmt: "10000000000000000000",
        normalizedIn: "10000000000000000000",
        nonce: 4,
        canonicalId: "0x0000000000000000000000001ceb5cb57c4d4e2b2433641b95dd330a33185a44",
      },
      routers: [],
      routerSignatures: [],
      sequencer: constants.AddressZero,
      sequencerSignature: "0x",
    };

    const encodedData = connext.interface.encodeFunctionData("execute", [executeArgs]);
    console.log("encodedData: ", encodedData);
    console.log("connextAddress: ", connextAddress);
  });
