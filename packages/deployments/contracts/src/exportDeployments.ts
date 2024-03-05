/* eslint-disable */
import fs from "fs";
import path from "path";

export const exportAll = async (): Promise<void> => {
  console.log("Exporting all deployments to deployments.json....");
  const { all, devnets, local } = loadAllDeployments();
  fs.writeFileSync("deployments.json", JSON.stringify(all, null, "  "));
  fs.writeFileSync("devnet.deployments.json", JSON.stringify(devnets, null, "  "));
  fs.writeFileSync("local.deployments.json", JSON.stringify(local, null, "  "));
};

export function loadAllDeployments() {
  const networksFound: { [networkName: string]: any } = {};
  const all: any = {};
  const devnets: any = {};
  const local: any = {};
  const deploymentsPath = path.resolve("deployments");

  const isDevnetDeploy = (name: string) => name.includes("devnet") || name.includes("fork");
  const isLocalDeploy = (name: string) => name.includes("local");

  fs.readdirSync(deploymentsPath).forEach((fileName) => {
    const fPath = path.resolve(deploymentsPath, fileName);
    const stats = fs.statSync(fPath);
    let name = fileName;
    if (stats.isDirectory()) {
      let chainIdFound: string;
      const chainIdFilepath = path.join(fPath, ".chainId");
      if (fs.existsSync(chainIdFilepath)) {
        chainIdFound = fs.readFileSync(chainIdFilepath).toString().trim();
        name = fileName;
      } else {
        throw new Error(`You also need to create a '.chainId' file in the folder with the chainId`);
      }

      const contracts = loadDeployments(deploymentsPath, fileName);
      const network = {
        name,
        chainId: chainIdFound,
        contracts,
      };
      networksFound[name] = network;
      if (isDevnetDeploy(fileName)) {
        if (!devnets[chainIdFound]) {
          devnets[chainIdFound] = [];
        }

        devnets[chainIdFound].push(network);
      } else if (isLocalDeploy(fileName)) {
        if (!local[chainIdFound]) {
          local[chainIdFound] = [];
        }

        local[chainIdFound].push(network);
      } else {
        if (!all[chainIdFound]) {
          all[chainIdFound] = [];
        }

        all[chainIdFound].push(network);
      }
    }
  });

  return { all, devnets, local };
}

function loadDeployments(deploymentsPath: string, subPath: string) {
  const deploymentsFound: { [name: string]: any } = {};
  const deployPath = path.join(deploymentsPath, subPath);
  let fileNames = fs
    .readdirSync(deployPath)
    .filter((name) => !name.startsWith(".") && name !== "solcInputs")
    .sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

  for (const fileName of fileNames) {
    if (fileName.slice(fileName.length - 5) === ".json") {
      const deploymentFileName = path.join(deployPath, fileName);
      let deployment = JSON.parse(fs.readFileSync(deploymentFileName).toString());

      deployment = {
        address: deployment.address,
        abi: deployment.abi,
        blockNumber: parseInt(deployment.receipt?.blockNumber || "0"),
      };

      const name = fileName.slice(0, fileName.length - 5);

      deploymentsFound[name] = deployment;
    }
  }
  return deploymentsFound;
}

exportAll();
