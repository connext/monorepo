import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

import { ABI } from "hardhat-deploy/types";
import { task } from "hardhat/config";

import { Env, mustGetEnv } from "../utils";

type TaskArgs = {
  relayer: string;
  connextAddress?: string;
  env?: Env;
};

export default task("export-abi-task", "Export abis for contractss")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ env: _env }: TaskArgs, { deployments, ethers, artifacts }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);

    // get all the artifact names
    // returned in format:
    // `'contracts/test/FeeERC20.sol:FeeERC20'`
    const artifactNames = await artifacts.getAllFullyQualifiedNames();
    // get contract names from artifacts
    const contractNames = artifactNames.map((path) => path.split(":")[1]);

    // We have all contract names from within the repository.
    // For the production abis, pull from the deployed contracts
    // for the staging abis, pull from the current artifacts. This way,
    // you can include the current abis without needing to deploy for staging
    // only.

    // get the production deployment if it exists
    const prodAbis: Record<string, { path: string; abi: ABI }> = {};
    const prodDir = join(__dirname, "../../abis/production");
    console.log("prodDir", prodDir);
    if (!existsSync(prodDir)) {
      console.log("making prod name!");
      mkdirSync(prodDir, { recursive: true });
      console.log("made prod dir", prodDir);
    }
    await Promise.all(
      contractNames.map(async (contract) => {
        console.log("looking for", contract);
        const { abi } = (await deployments.getOrNull(contract)) ?? {};
        if (!abi) {
          console.log("no abi");
          return;
        }
        const path = join(prodDir, contract + ".json");
        console.log("path", path);
        prodAbis[contract] = { abi, path };
      }),
    );

    // get all the staging artifact abis
    const stagingAbis: Record<string, { abi: ABI; path: string }> = {};
    const stagingDir = join(__dirname, "../../abis/staging");
    console.log("stagingDir", stagingDir);
    if (!existsSync(stagingDir)) {
      mkdirSync(stagingDir, { recursive: true });
    }
    artifactNames.forEach((artifact, idx) => {
      const name = contractNames[idx];
      const { abi } = artifacts.readArtifactSync(artifact);
      const path = join(stagingDir, name + ".json");
      stagingAbis[name] = { abi, path };
    });

    Object.entries({ ...prodAbis, ...stagingAbis }).map(([contract, { abi, path }]) => {
      console.log("saving contract abi:", contract, "to:", path);
      writeFileSync(path, abi.toString());
    });
  });
