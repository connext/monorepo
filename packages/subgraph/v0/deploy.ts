import yamlToJson from "js-yaml";
import YAML from "yaml";
import { readFileSync, writeFileSync } from "fs";
import { safeJsonStringify } from "@connext/nxtp-utils";
import { exec as _exec } from "child_process";
import { Networks } from "./config";
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
  const cmdNetwork = cmdArg[0];

  if (!cmdNetwork) {
    console.log("please add network or all after the command");
    return;
  }

  let networksToDeploy: Network[] = [];
  if (cmdNetwork.toUpperCase() === "ALL") {
    networksToDeploy = Networks;
  } else {
    const res = Networks.find((e) => e.network.toUpperCase() === cmdNetwork.toUpperCase());
    if (!res) {
      console.log("Network not found");
      return;
    }

    networksToDeploy.push(res);
  }

  const jsonFile: any = yamlToJson.load(readFileSync("./v0/subgraph.template.yaml", "utf8"));

  for (const n of networksToDeploy) {
    console.log(n);

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

    console.log("Running Deployment command for " + n.network);
    const { stdout, stderr } = await exec(
      `graph deploy --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ ${n.subgraphName} --access-token 7472f2dc1bfc456583a126e09607f099`,
    );

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  }
};
run();
