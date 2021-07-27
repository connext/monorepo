import { mkHash } from "@connext/nxtp-utils";
import { utils } from "ethers";

// import {routerConcurrencyTest} from "./load/routerConcurrency";
import {SdkManager} from "./utils/sdkManager";
import { OnchainAccountManager } from "./utils/accountManager";
import { SdkAgent, SdkAgentEvents } from "./utils/sdkAgent";


async function main(){

  // const accountManager = new OnchainAccountManager(sugardaddy_mnemonic, 10);
  // const wallets = accountManager.getCanonicalWallets(10);

  const config = {
    mnemonic: sugardaddy_mnemonic,
    natsUrl: "nats://172.17.0.1:4222",
    authUrl: "http://172.17.0.1:5040",
  };
  //todo:wtf below errors ENOCONNECTION
  // const sdkManager = await SdkManager.connect(config.mnemonic,1, config.natsUrl, config.authUrl);
  // sdkManager.transfer()
  const onchain = new OnchainAccountManager(config.mnemonic, 43);
  await onchain.init(10);
  const agents = [];

  const agent = await SdkAgent.connect(onchain.chainProviders, onchain.wallets[1], config.natsUrl,config.authUrl);
  agents.push(agent);

  agent.attach(SdkAgentEvents.TransactionCompleted, (data) => {
    console.log(data);
  });

  // console.log(`AGENT ${agent}`);
  // wallets.forEach(async(wallet)=>{
  //   await accountManager.verifyAndReupAccountBalance(wallet.address);
  // });
  // const randoAgent = sdkManager.getRandomAgent();

const goerliTokenAddress = "0x8a1Cad3703E0beAe0e0237369B4fcD04228d1682";
const rinkebyTokenAddress = "0x9aC2c46d7AcC21c881154D57c0Dc1c55a3139198";
// const transfer = await sdkManager.transfer(
//     {
//
//       callData: "0x",
//       sendingChainId: 4,
//       receivingChainId: 5,
//       sendingAssetId: rinkebyTokenAddress,
//       receivingAssetId: goerliTokenAddress,
//       callTo: "0x",
//       amount: utils.parseEther("1").toString(),
//       transactionId: mkHash(),
//     },
//     20,
//     randoAgent
//   );
// const concurrency = await routerConcurrencyTest(1,1, config.mnemonic);
// console.log(`Concurrent ${concurrency}`);
}

main();