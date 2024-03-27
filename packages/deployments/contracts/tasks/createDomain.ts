import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";
import { getDomainFromString, getHexDomainFromString } from "../src";

type TaskArgs = {
  name: string;
};

export default task("create-domain", "Create domain hex string from chain name")
  .addParam("name", "Chain Name")
  .setAction(async ({ name }: TaskArgs, {}) => {
    console.log("doamin hex string:", getHexDomainFromString(name));
    console.log("doamin:", getDomainFromString(name));
  });
