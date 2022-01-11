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
  const _routerAddresses = cmdArg[0];

  if (!_routerAddresses) {
    console.log("please add router address, checkout readme for more");
    return;
  }

  let routerAddresses = _routerAddresses.split(",");

  routerAddresses = routerAddresses.map((r) => utils.getAddress(r));

  for (const n of networks) {
    for (const r of _routerAddresses) {
      console.log("Running add router script for", n);
      const { stdout: out, stderr: err } = await exec(`yarn hardhat add-router --network ${n} --router ${r}`);

      if (out) {
        console.log(`stdout: ${n} ${out}`);
      }
      if (err) {
        console.error(`stderr: ${n} ${err}`);
      }
    }
  }
};
run();
