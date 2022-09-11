import { readFileSync, writeFileSync } from "fs";
import { exec as _exec } from "child_process";
import util from "util";

import YAML from "yaml";
import yamlToJson from "js-yaml";

// import ConnextHandler_DiamondProxy_1337 from "../../contracts/deployments/local_1337/ConnextHandler_DiamondProxy.json";
// import ConnextHandler_DiamondProxy_1338 from "../../contracts/deployments/local_1338/ConnextHandler_DiamondProxy.json";

const exec = util.promisify(_exec);

export type Network = {
  subgraphName: string;
  network: string;
  source: [
    {
      name: string;
      address: string;
      startBlock: number;
    },
  ];
};

const run = async () => {
  const cmdArg = process.argv.slice(2);

  // first argument is contract version: amarok-runtime-v0
  const contractVersion = cmdArg[0];

  // second argument is config file path: <config-file-name> amarok-runtime-v0
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
    // if (n.network === "local_1337") {
    //   n.address = ConnextHandler_DiamondProxy_1337.address;
    // }

    // if (n.network === "local_1338") {
    //   n.address = ConnextHandler_DiamondProxy_1338.address;
    // }

    /// prepare
    jsonFile.dataSources = (jsonFile.dataSources ?? []).map((ds: any, index: number) => {
      return {
        ...ds,
        network: n.network,
        source: {
          ...ds.source,
          address: n.source[index].address,
          startBlock: n.source[index].startBlock,
        },
      };
    });

    const stringFile = JSON.stringify(jsonFile);

    const doc = new YAML.Document();
    const obj = JSON.parse(stringFile);
    doc.contents = obj;
    writeFileSync("./subgraph.yaml", doc.toString());

    console.log("Running Build command for " + n.network);
    const { stdout: out, stderr: err } = await exec(`yarn graph:build`);

    console.log(`stdout: ${out}`);
    console.error(`stderr: ${err}`);

    /// deploy
    if (!configFile.includes("local")) {
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
