//@dev
//RouterManager(funding source)
//*creates,manages n accounts (that will be routers)

import { readFileSync } from "fs";

import { ethers, logger, Wallet } from "ethers";
import pino from "pino";
import Docker from "dockerode";

import { OnchainAccountManager } from "../utils/accountManager";
import { getConfig, ChainConfig } from "../utils/config";

//instantiates the routers via docker run/ ENV variables
export class RouterManager {
  public readonly docker_script: string = "docker run...";
  //number of routers to manage
  public readonly num_routers: number;
  public readonly routerAccountMgmt: OnchainAccountManager;
  public readonly dn: Docker;

  //this is the account that will strictly transfer ETH from self to routers under it's management
  //todo: should also hold other assets but for now we just make sure that the routers mint themselves TEST liquidity
  private readonly config;
  private readonly routerMnemonics: string[];
  private readonly funderMnemonic: string;
  private logger;

  constructor(mnemonic: string, num_routers = 3, public readonly chainProviders: ChainConfig, dockerSock?: string) {

    this.config = getConfig();

    this.logger = pino({ level: this.config.logLevel ?? "info" });
    this.num_routers = num_routers;

    this.funderMnemonic = JSON.parse(readFileSync("./ops/config/load/funder.json","utf8"));

    if(!this.funderMnemonic){console.log("Wont be able to fund any routers");}

    this.routerMnemonics = JSON.parse(readFileSync("./ops/config/load/multi-router.json", "utf8"));
  

    if (dockerSock) this.dn = new Docker({ socketPath: dockerSock });
    this.dn = new Docker({ socketPath: "/var/run/docker.sock" });

    //will routerFunder be admin too? (awake)
    // this.routerFunder = Wallet.fromMnemonic(this.funderMnemonic);

    this.routerAccountMgmt = new OnchainAccountManager(chainProviders, this.funderMnemonic, num_routers, this.logger);

    console.log(`Funder: ${this.config?.mnemonic}`);
  }
  //create n number of routers
  //@dev they will be called "router-n" in your docker engine,
  //mnemonics indexed off of their pirvate keys
  runRouter() {
    let port = 8080;
    const containers = [];
    for (let i = 0; i < this.num_routers; i++) {
      containers.push(this.dn.createContainer(
        {
          Image: "nxtp-router",
          name: `router-${i}`,
          HostConfig: {
            NetworkMode: "ops_nxtp-test",
            PortBindings: { "8080/tcp": [{ HostPort: `${port.toString()}` }] },
            AutoRemove:true,
          },
          ExposedPorts: {
            "8080/tcp": {},
          },
          Tty: true,
          Env: [
            `NXTP_MNEMONIC=${this.routerMnemonics[i]}`,
            "TAGS=nxtp-load",
          ],
        },
        (err, container) => {
          if (!err) {
            container?.start((e, d) => {
              if (!e) {
                console.log(`image created router${i} ${d}`);
              }
            });
          }
        },
      )
      );
      //cleanup
      port++;
    }
    return containers;
  }

  async removeAllRouters(){
    for(let i = 0; i < this.num_routers; i++){
      const routerContainer =  this.dn.getContainer(`router-${i}`);
      await routerContainer?.remove({
        force: true,
      });
    }
  }

  async initRouterOnChain(){
        // TODO: this will be slow af
        for (const chain of Object.keys(this.config?.chainConfig)) {
          // Gift eth
          console.log(`gifting eth`);
          await this.routerAccountMgmt.updateBalances(parseInt(chain));
        }
  }
  

}

async function main(){
  const config = getConfig();
  const rm = new RouterManager(config?.mnemonic, 3, config.chainConfig, undefined);

  await rm.removeAllRouters();
  rm.runRouter();

}

main();


//snippet for router mnemonic mining
// let try_mnemonic;

// while(try_mnemonic?._mnemonic()?.phrase.split(' ')[0] !== 'cash' ){
//  try_mnemonic =  ethers.Wallet.createRandom();
//  console.log(try_mnemonic._mnemonic());

// }
// console.log(try_mnemonic?._mnemonic().phrase);
