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
  const _signerAddress = cmdArg[0];

  const _recipientAddress = cmdArg[1];

  if (!_signerAddress) {
    console.log("please add router address, checkout readme for more");
    return;
  }

  if (!_recipientAddress) {
    console.log("please add rec address, checkout readme for more");
    return;
  }

  const signerAddress = utils.getAddress(_signerAddress);

  const recipientAddress = utils.getAddress(_recipientAddress);

  for (const n of networks) {
    console.log("Running add router script for", n);
    const { stdout: out, stderr: err } = await exec(
      `yarn hardhat create-router --network ${n} --signer ${signerAddress} --recipient ${recipientAddress}`,
    );

    if (out) {
      console.log(`stdout: ${n} ${out}`);
    }
    if (err) {
      console.error(`stderr: ${n} ${err}`);
    }
  }
};
run();
