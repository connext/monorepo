/* eslint-disable */
import fs from "fs";
import path from "path";

export const exportAll = async (): Promise<void> => {
  console.log("Exporting all deployments to deployments.json....");
  const all = loadAllDeployments();
  fs.writeFileSync("deployments.json", JSON.stringify(all, null, "  "));
};

export function loadAllDeployments() {
  const networksFound: { [networkName: string]: any } = {};
  const all: any = {};
  const deploymentsPath = path.resolve("deployments");
  const isDevnetDeploy = (name: string) => name.includes("tenderly") || name.includes("fork");
  fs.readdirSync(deploymentsPath)
    .sort((a, b) => {
      // Mainnet should be index 0
      if (isDevnetDeploy(a) && !isDevnetDeploy(b)) return 1;
      if (!isDevnetDeploy(a) && isDevnetDeploy(b)) return -1;
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    })
    .forEach((fileName) => {
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

        if (!all[chainIdFound]) {
          all[chainIdFound] = [];
        }
        const contracts = loadDeployments(deploymentsPath, fileName);
        const network = {
          name,
          chainId: chainIdFound,
          contracts,
        };
        networksFound[name] = network;
        all[chainIdFound].push(network);
      }
    });

  return all;
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
    if (fileName.substr(fileName.length - 5) === ".json") {
      const deploymentFileName = path.join(deployPath, fileName);
      let deployment = JSON.parse(fs.readFileSync(deploymentFileName).toString());

      deployment = {
        address: deployment.address,
        abi: deployment.abi,
      };

      const name = fileName.slice(0, fileName.length - 5);

      deploymentsFound[name] = deployment;
    }
  }
  return deploymentsFound;
}

exportAll();
