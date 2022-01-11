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

const routers: string[] = [];

const run = async () => {
  if (routers.length === 0) {
    console.log("please add router addresses to whitelist");
    return;
  }

  const routerAddresses = routers.map((r) => utils.getAddress(r));

  for (const n of networks) {
    for (const r of routerAddresses) {
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
