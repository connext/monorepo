import { hexZeroPad } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { NOMAD_DEPLOYMENTS } from "../constants";

type TaskArgs = {
  handler: string;
  chain: string;
  local?: string;
};

export default task("enroll-handler", "Add a remote router")
  .addParam("handler", "Remote nomad handler address")
  .addParam("chain", "Chain of remote router")
  .addOptionalParam("local", "Override local router address")
  .setAction(async ({ handler, local: _local, chain }: TaskArgs, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("handler:", handler);
    console.log("chain:", chain);
    console.log("namedAccounts: ", namedAccounts);

    let local = _local;
    if (!local) {
      const localRouterDeployment = await deployments.get("BridgeRouterUpgradeBeaconProxy");
      local = localRouterDeployment.address;
    }
    console.log("local: ", local);

    const config = NOMAD_DEPLOYMENTS.get(parseInt(chain));
    if (!config) {
      throw new Error(`No nomad config found for ${chain}`);
    }

    const localRouter = await ethers.getContractAt((await deployments.getArtifact("BridgeRouter")).abi, local);
    const enrollTx = await localRouter.enrollRemoteRouter(config.domain, hexZeroPad(handler, 32));
    console.log("enroll tx:", enrollTx);
    const receipt = await enrollTx.wait();
    console.log("enroll tx mined:", receipt);
  });
