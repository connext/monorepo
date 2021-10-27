import yamlToJson from "js-yaml";
import YAML from "yaml";
import { readFileSync, writeFileSync } from "fs";
import { safeJsonStringify } from "@connext/nxtp-utils";
import { exec as _exec } from "child_process";
import util from "util";

const exec = util.promisify(_exec);

export type Network = {
  subgraphName: string;
  network: string;
  address: string;
  startBlock: number;
};

const run = async () => {
  const cmdArg = process.argv.slice(2);

  // first argument is contract version: v0 | v1
  const contractVersion = cmdArg[0];

  // second argument is config file path: <config-file-name> local | prod | staging | v0
  const configFile = cmdArg[1];

  // third argument is network: all | <network-name>
  const cmdNetwork = cmdArg[2];

  // forth argument is access token: <subgraph deployer access token>
  const accessToken = cmdArg[3];

  if (!contractVersion) {
    console.log("please add contract version, checkout readme for more");
    return;
  }
  if (!configFile) {
    console.log("please add config file path name, checkout readme for more");
    return;
  }

  if (!cmdNetwork) {
    console.log("please add network or all, checkout readme for more");
    return;
  }

  if (!accessToken) {
    console.warn("graph access token missing...");
    // return;
  }

  const networks: Network[] = JSON.parse(readFileSync(`./config/${configFile}.json`, "utf8"));

  let networksToDeploy: Network[] = [];
  if (cmdNetwork.toUpperCase() === "ALL") {
    networksToDeploy = networks;
  } else {
    const res = networks.find((e) => e.network.toUpperCase() === cmdNetwork.toUpperCase());
    if (!res) {
      console.log("Network not found");
      return;
    }

    networksToDeploy.push(res);
  }

  const jsonFile: any = yamlToJson.load(readFileSync(`./src/${contractVersion}/subgraph.template.yaml`, "utf8"));

  for (const n of networksToDeploy) {
    console.log(n);

    /// prepare
    jsonFile.dataSources[0].network = n.network;
    jsonFile.dataSources[0].source.address = n.address;
    jsonFile.dataSources[0].source.startBlock = n.startBlock;

    const doc = new YAML.Document();
    const obj = JSON.parse(safeJsonStringify(jsonFile));
    doc.contents = obj;
    writeFileSync("./subgraph.yaml", doc.toString());

    console.log("Running Build command for " + n.network);
    const { stdout: out, stderr: err } = await exec(`yarn build`);

    console.log(`stdout: ${out}`);
    console.error(`stderr: ${err}`);

    /// deploy
    if (configFile !== "local") {
      console.log("Running Deployment command for " + n.network);
      const { stdout, stderr } = await exec(
        `graph deploy --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ ${n.subgraphName} --access-token ${accessToken}`,
      );

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  }
};
run();
