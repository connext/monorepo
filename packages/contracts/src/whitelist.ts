import { exec as _exec } from "child_process";
import util from "util";

import { utils } from "ethers";

const exec = util.promisify(_exec);

const networks: string[] = [
  "mainnet",
  "optimism",
  "bsc",
  "xdai",
  "fuse",
  "matic",
  "ftm",
  "moonriver",
  "arbitrum-one",
  "avalanche",
];
const run = async () => {
  const cmdArg = process.argv.slice(2);

  // first argument is router address
  const _routerAddress = cmdArg[0];

  if (!_routerAddress) {
    console.log("please add router address, checkout readme for more");
    return;
  }

  const routerAddress = utils.getAddress(_routerAddress);

  for (const n of networks) {
    console.log("Running add router script for", n);
    const { stdout: out, stderr: err } = await exec(`yarn hardhat add-router --network ${n} --router ${routerAddress}`);

    if (out) {
      console.log(`stdout: ${n} ${out}`);
    }
    if (err) {
      console.error(`stderr: ${n} ${err}`);
    }
  }
};
run();
