import { readFileSync, writeFileSync } from "fs";
import { exec as _exec } from "child_process";
import util from "util";

const exec = util.promisify(_exec);

const build = async () => {
  const cmdArg = process.argv.slice(2);
  const environment = cmdArg[0];

  const fileContent = readFileSync(`./config/.graphclientrc-${environment}.yml`, "utf8");
  writeFileSync("./.graphclientrc.yml", fileContent);
  console.log(`Building graphclient for ${environment}`);

  const { stdout: out, stderr: err } = await exec(`yarn build-client`);

  console.log(`stdout: ${out}`);
  console.error(`stderr: ${err}`);
};

build();
