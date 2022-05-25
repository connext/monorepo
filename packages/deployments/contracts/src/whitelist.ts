import { exec as _exec } from "child_process";
import util from "util";

import { utils } from "ethers";

const exec = util.promisify(_exec);

const networks: string[] = ["rinkeby", "kovan", "goerli"];

const testnetRouters = [
  // "0xC289df90811e9808D7efD0DFaC75BB7965995eF3",
  // "0x8564B35EABB847eF6Ddfc8375acF9a71f8bEE8D0",
  // "0x649D45716A86A3794e2B5fb35B9478e796F44518",
  // "0xA1646EbC2Ab05Ddbfa00ec5E6f246FF8bdA72d7B",
  // "0xac821E41b77e5eAE234Eb2e9e2F65730914A141C",
  // "0x36802f05EA23968DbD5010084Da25104a88FB6d0",
  // "0x3E8e19E149AE18F5ec55e966841C29688bAC9f4a",
  // "0xf569c6186E7D57742ae89DC97F02FD0d5BA4CD6D",
  // "0x6f363C44d40691c91756c6b95fafd4a8B8AF7718",
  // "0x4702Dd07D10161A31eF35d50deb2566c1E113A89",
  // "0x73D5926422023f06a6Ae0F16Dc22Dd49602eA7a4",
  // "0xe5784bBFdA0Ee1Ade117d0A91d3198f7D0B903d5",
  // "0x82B3AFcACc283Bf47573fADD559342858Bb937e0",
  // "0xC289df90811e9808D7efD0DFaC75BB7965995eF3",
  // "0x0Cc784Ef22f623D29FE9e0872990c7EfAc4c3456",
  // "0x5b3B22551F3B36E4c3668730d343f6CEAA4572D5",
  // "0xfa818B787B81f675bFf2360e37256b726BAb0649",
  // "0xB7FfA9214ed97aE74925E741BB295e986cf4a9be",
  // "0xA59057F7B69d68e6DfbfbBEb6821Bd1512424A81",
  // "0x7B2df12ee8C618673C25566a60E3412733C6CdBe",
  // "0x2835909645F8E4903D81db6a20484439f458AbAD",
  // "0x1b459cb897c4Df7132c0C63B34A7d3E83c246202",
  // "0xe2C2586a54E039b8ff3a36a55265b5E9263Cba4D",
  // "0x719EDDFf0658677fE2528010e3eeefDEAC49B88C",
  "0xcA3b5e4924507c426B0b7c42Ca01706f842031D9",
  "0x1c41F4c4aC7498F8EE13eBaF66adbe24b4bad448",
  "0x9490be794EFdBdC18F0bE2BE89647e26c31c9AaC",
  "0x54A243F0cA835Fa1562cEe8302e75D03C281480C",
  "0x8604bf5F0ec78138624551468CC4B4b617F51A09",
  "0x394dA46D13F88BeAcaF46c85B8710bD21e4Ee69A",
  "0x22E3faE84EC3528Bbd37e156Bb6Ac72c01B0a2c7",
  "0x80e9Ad55163049a3e310a5a0F263ACe06D6B0227",
  "0xBeb8f8D4406812a15C9153d44B5949b3Df4AD46c",
  "0x3DB9cA552aa915d1986025c09951F0521bf9F402",
  "0x4551F9aBBc690bfb3ddA3ab15f39fFa4d46D8e2f",
  "0x9f61CA6BD4b1eF6D4C1cF13d207abeDb1AF862df",
  "0x830d78C17AD52ea902B783A76Ed0E8Fd7e34348b",
  "0x1F237122f4feB006bF318761475D3908b070f8eC",
  "0xCa16cb29DB3dE80C21a102d0b9e45c00d6053C2c",
  "0x995208e2Ae8A814AD6870DF8AA0ed8b7516e7d93",
  "0xBc0209887D66252A1c5F3b58554dFb988Bb868cc",
  "0x9419ea77fdeAF87278373E2C9c82Aa60a232410f",
  "0xA605224608d1aF00e9320310d82e95f47935a38A",
];

// const routers = [
//   "0xfa818B787B81f675bFf2360e37256b726BAb0649",
//   "0xA59057F7B69d68e6DfbfbBEb6821Bd1512424A81",
//   "0xB7FfA9214ed97aE74925E741BB295e986cf4a9be",
//   "0x7B2df12ee8C618673C25566a60E3412733C6CdBe",
//   "0x2835909645F8E4903D81db6a20484439f458AbAD",
//   "0x1b459cb897c4Df7132c0C63B34A7d3E83c246202",
// ];
const routers: string[] = testnetRouters;
const env = "production";

const run = async () => {
  if (routers.length === 0) {
    console.log("please add router addresses to whitelist");
    return;
  }

  const routerAddresses = routers.map((r) => utils.getAddress(r));

  for (const n of networks) {
    for (const r of routerAddresses) {
      console.log("Running add router script for", n);
      const { stdout: out, stderr: err } = await exec(
        `yarn hardhat setup-router --network ${n} --router ${r} --env ${env}`,
      );

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
