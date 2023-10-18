import { readFileSync, writeFileSync } from "fs";
import { exec as _exec } from "child_process";
import util from "util";

import YAML from "yaml";
import yamlToJson from "js-yaml";
import mainnetDeployments from "@connext/smart-contracts/deployments.json";
import devnetDeployments from "@connext/smart-contracts/devnet.deployments.json";
import localDeployments from "@connext/smart-contracts/local.deployments.json";
import { utils } from "ethers";

const exec = util.promisify(_exec);

export type Network = {
  subgraphName: string;
  subgraphId?: string;
  network: string;
  source: [
    {
      name: string;
      address: string;
      startBlock: number;
      contractName?: string;
    },
  ];
};

const run = async () => {
  const cmdArg = process.argv.slice(2);

  // first argument is contract version: amarok-runtime-v0
  const contractVersion = cmdArg[0];

  // second argument is config file path: <config-file-name> amarok-runtime-v0
  const configFile = cmdArg[1];

  // third argument is network: all | '<network1, network2, ...>'
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
    console.log("please add networks or all, checkout readme for more");
    return;
  }

  if (!accessToken) {
    console.warn("graph access token missing...");
    // return;
  }

  // Get networks from config
  const networks: Network[] = JSON.parse(readFileSync(`./config/${configFile}.json`, "utf8"));

  // Get network names
  const networkNames: string[] =
    cmdNetwork.toUpperCase() === "ALL" ? networks.map((n) => n.network) : cmdNetwork.split(",");

  const networksToDeploy = networkNames.map((n) => {
    const res = networks.find((e) => e.network.toUpperCase() === n.toUpperCase());
    if (!res) {
      throw new Error(`Network (${n}) not found`);
    }
    return res;
  });

  const jsonFile: any = yamlToJson.load(readFileSync(`./src/${contractVersion}/subgraph.template.yaml`, "utf8"));

  for (const n of networksToDeploy) {
    /// prepare
    jsonFile.dataSources = await Promise.all(
      (jsonFile.dataSources ?? []).map(async (ds: any) => {
        const source = n.source.find((s) => s.name === ds.name);
        if (source) {
          if (!utils.isAddress(source.address) || !source.startBlock) {
            const networkPrefix = configFile.includes("devnet")
              ? "devnet"
              : configFile.includes("local")
              ? "local"
              : "";
            const contractDeployments = configFile.includes("devnet")
              ? devnetDeployments
              : configFile.includes("local")
              ? localDeployments
              : mainnetDeployments;
            const networkName = `${networkPrefix}-${n.network}`;
            const deployment = Object.values(contractDeployments)
              .flat()
              .find((d: any) => d.name === networkName);
            if (!deployment) {
              console.log("missing contract deployment", networkName);
              return null;
            }

            if (!utils.isAddress(source.address))
              source.address = (deployment as any).contracts?.[source.contractName ?? source.name]?.address;

            if (!source.startBlock) {
              source.startBlock = (deployment as any).contracts?.[source.contractName ?? source.name]?.blockNumber;
            }
          }
          return {
            ...ds,
            network: n.network,
            source: {
              ...ds.source,
              address: source.address,
              startBlock: source.startBlock,
            },
          };
        } else {
          return null;
        }
      }),
    );

    jsonFile.dataSources = jsonFile.dataSources.filter((s: any) => !!s);
    if (jsonFile.templates) {
      jsonFile.templates = (jsonFile.templates ?? []).map((ds: any, index: number) => {
        return {
          ...ds,
          network: n.network,
        };
      });
    }

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
    if (configFile.includes("local") || configFile.includes("devnet")) {
      console.log("Skipping deployments");
    } else {
      console.log("Running Deployment command for " + n.network);
      const { stdout, stderr } = await exec(`graph deploy --product hosted-service ${n.subgraphName}`);

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  }
};
run();
