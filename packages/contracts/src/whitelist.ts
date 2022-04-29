import { exec as _exec } from "child_process";
import util from "util";

import { utils } from "ethers";

const exec = util.promisify(_exec);

export const allRouters = [
  "0x95ce8b1c273af612cd895e6b0c633039c3572827",
  "0x55aF16Ee16B5002d5d8BAa45D59e14515Db47ACD",
  "0x6db8506a7454c5a83b9e68dfc89fd7413ce97a5d",
  "0x3dF415D9E0539De5e746FF36Ff98b54cf6570722",
  "0x92495600b72EF0e1fa22453b58938A9af49918aE",
  "0x8C336154121C0d70133B8c7F906A729cf034e5bE",
  "0x7581F456cf77Ce416C2A4a4a43857a38cBE0BaFe",
  "0x826Ccd5eD8ca665555Fe45A4f045b61516b241C0",
  "0xd7d8E48ABDcBD61ADD5d533d7cE542e54a5C3975",
  "0x724346027f0de92a3B2C8f18956103F76CdA3dd4",
  "0x82F6a96481433eeF26Bb506887Eb064cCEBd3B81",
  "0xe4747A26b941EbDbC7Ef67de7580f700E3DBf6D5",
  "0x467517104f300417e078d003B8817531deCe4ad3",
  "0xcE89263C451d62caefc54811E86E8F930204223D",
  "0x8640A7769BA59e219d85802427a964068d4D99F8",
  "0xC937F7a080C1e47dD645cbfE973a28Fc38874d9D",
  "0xCf632DAf0C48b075864E54a625BB655d63a3cE50",
  "0xe439CA609B964Ab9422672Bf83B8e171E90aDaD1",
  "0xd19B8a5Be17d68f74789a9f87D20cF924F491613",
  "0x75ee04316185200A51E995779f381EF63d39F7F9",
  "0x31769170acae5F8c06A4577e7Ff8719d742FD4C5",
  "0xe026086181bcfbd06db4c67739aa9c36054d5551",
  "0x98a429d65e96Fd048867C31E2dA74573E88F2Fb3",
  "0x56723283704c7F8ea3E13650413af102D4572E48",
  "0xf410f49C547115567f4209bae3DD2dbd855dDAc0",
  "0x08C29C995Dc21525D370F1Bd0Bdb8E3EA0D89A2f",
  "0x9f27a9cAcEF594Eb60Dc4e8e6cC1F5817Fd7B1aF",
  "0x84979B230fa868C1dc8e78B72fD8f5438FbA032b",
  "0x83baadc390a6c63df8b3486425758d62a8bc141a",
  "0xa5b725e6e87fcd5eede4a6b7c5a47e4090f49239",
  "0xE1Dd7b28Ab085978EAD65AFF92B22B6322a96422",
  "0x7d9E92835D794e36556a42788CD8AF6683Ca1056",
  "0x33b2aD85f7DbA818e719FB52095dC768E0eD93ec",
  "0x7E76de758cd414096a4882eD2824BC513D7Ed7c9",
  "0x08E262bEfF21f8c29b39760bE05cfB224978BD0d",
  "0xae1e59402a3f483f0bbb663800ff21a0f2b1701d",
  "0x1F6853bC0cc4DCCd2ebF7B36c3b34dac0C1b1096",
  "0x5898252DC60c7d113776720Efca744c00324Ba53",
  "0x3582ec1c312819246fc1820475e3daa251a159ef",
  "0xb03422855AA56d6a4Bf00155dD4A55abE132a3EA",
  "0x54BD2Ad4a667e740D39eC2Dd2f885a5B41D7705C",
  "0xb3ac2b73fa658ee49abf8bc691c1239557c5cc6d",
  "0xED9B9d7F1732f720A467834cc2E536CC1A867853",
  "0x81b70088368d6718BD6Fd1686B8B621244Aa3FF5",
  "0x82bfb461f3a718060e17af228541b54a18011f98",
  "0xF2CbE8959aFc55D68e5EEbdaadB783250Fbfc319",
  "0x1370C680f2a2Ae22F711B30b917A57F052816485",
];

const networks: string[] = [
  // "mainnet",
  // "moonbeam",
  // "optimism",
  // "bsc",
  // "xdai",
  // "fuse",
  // "matic",
  // "ftm",
  // "moonriver",
  // "arbitrum-one",
  // "avalanche",
  // "milkomeda-cardano",
  // "kava-alphanet",
  // "harmonyone",
  // "boba",
  // "cronos",
  "evmos",
];

// const routers = ["0xF2CbE8959aFc55D68e5EEbdaadB783250Fbfc319"];
const routers = allRouters;

const run = async () => {
  if (routers.length === 0) {
    console.log("please add router addresses to whitelist");
    return;
  }

  const routerAddresses = routers.map((r) => utils.getAddress(r));

  for (const n of networks) {
    for (const r of routerAddresses) {
      console.log("Running add router script for", n);
      try {
        const { stdout: out, stderr: err } = await exec(`yarn hardhat add-router --network ${n} --router ${r}`);

        if (out) {
          console.log(`stdout: ${n} ${out}`);
        }
        if (err) {
          console.error(`stderr: ${n} ${err}`);
        }
      } catch (e) {
        console.log(`Failed: ${e}`);
      }
    }
  }
};
run();
