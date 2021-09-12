//@dev
//RouterManager(funding source)
//*creates,manages n accounts (that will be routers)

import { readFileSync } from "fs";

import { ethers, Contract, Wallet, BigNumber, providers } from "ethers";
import {Interface } from "ethers/lib/utils";
import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";

import pino from "pino";
import {Logger} from '@connext/nxtp-utils';

import { OnchainAccountManager } from "../utils/accountManager";
import { getConfig, ChainConfig } from "../utils/config";
import { TestTokenABI } from "../utils/chain";

import { ContainerManager } from "./containerManager";


//instantiates the routers via docker run/ ENV variables
export class RouterManager {
  //number of routers to manage
  public readonly num_routers: number;
  public readonly routerAccountMgmt: OnchainAccountManager;
  public readonly containerManager: ContainerManager;

  //this is the account that will strictly transfer ETH from self to routers under it's management
  //todo: should also hold other assets but for now we just make sure that the routers mint themselves TEST liquidity
  private readonly config;
  private readonly routerMnemonics: string[];
  private readonly funderMnemonic: string;
  private readonly routerAdminMnemonic: string;

  private readonly routerWallets: Wallet[] = [];
  private logger;

  getContractAddress = (chainId: number): string => {
    const nxtpContractAddress = this.config.chainConfig[chainId]?.transactionManagerAddress;
    if (!nxtpContractAddress) {
      throw new Error(`No contract exists for chain ${chainId}`);
    }
    return nxtpContractAddress;
  };

  getChainProvider = (chainId: number): providers.Provider =>{
    const providerUrl = this.config.chainConfig[chainId]?.providerUrls[0];
    if (!providerUrl) {
      throw new Error(`No provider exists for chain ${chainId}`);
    }
    return new ethers.providers.StaticJsonRpcProvider(providerUrl);

  }

  getTxManagerInterface = () => new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];

  constructor(funder_mnemonic: string, num_routers = 3, public readonly chainProviders: ChainConfig, dockerSock?: string) {
    this.config = getConfig();

    this.num_routers = num_routers;
    this.funderMnemonic = funder_mnemonic;
    this.containerManager = new ContainerManager(dockerSock || undefined);

    this.routerMnemonics = JSON.parse(readFileSync("./ops/config/load/multi-router.json", "utf8"));

    //todo: remove when renounced
    this.routerAdminMnemonic = JSON.parse(readFileSync("./ops/config/load/admin.json", "utf8"))[0];

    this.routerMnemonics.forEach((rm) => {
      this.routerWallets.push(ethers.Wallet.fromMnemonic(rm));
    });
    this.logger = new Logger({name:"router manager"});
    this.routerAccountMgmt = new OnchainAccountManager(
      chainProviders,
      this.funderMnemonic,
      num_routers,
      this.logger,
      1,
      ethers.utils.parseEther("0.1"),
      ethers.utils.parseEther("100000"),
      this.routerWallets,
    );
  }

  startAllRouters(){
    let port = 8080;
    for (let i = 0; i < this.num_routers; i++) {
      this.containerManager.runRouterContainer(this.routerMnemonics[i], port, i);
      port++;
    }
    
  }
  
  async addRouter(newRouterAddress: string, chainId: number) {
    const p = this.getChainProvider(chainId);
    const w = ethers.Wallet.fromMnemonic(this.routerAdminMnemonic).connect(p);
    const nxtpAddress = this.getContractAddress(chainId);

    const contract = new Contract(
      nxtpAddress,
      new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"],
      w,
    );
    const tx = await contract.addRouter(newRouterAddress, { gasLimit: 1000000 });

    const res = tx.wait();
    return res;
  }

  async checkRouterApproved(routerAddress: string, chainId: number): Promise<boolean> {
    const p = this.getChainProvider(chainId);
    const w = ethers.Wallet.fromMnemonic(this.routerAdminMnemonic).connect(p);

    const nxtpAddress = this.getContractAddress(chainId);

    const contract = new Contract(
      nxtpAddress,
      new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"],
      w,
    );

    const isRouter = await contract.approvedRouters(routerAddress);
    return isRouter;
  }

  async approveTokensIfNeeded(assetId: string, wallet: Wallet, chainId: number) {
    const p = this.getChainProvider(chainId);
    const w = ethers.Wallet.fromMnemonic(this.routerAdminMnemonic).connect(p);

    const nxtpAddress = this.getContractAddress(chainId);
    const tcontract = new Contract(assetId, TestTokenABI, w);
    
    let approvedAmount = await tcontract.allowance(w.address, nxtpAddress);
    const appbn = BigNumber.from(approvedAmount);

    if (!appbn.gte("100")) {
      await tcontract.approve(nxtpAddress, ethers.constants.MaxUint256);
      approvedAmount = await tcontract.allowance(w.address, nxtpAddress);
    }
    return approvedAmount;
  }

  async addLiquidityIfNeeded(assetId: string, wallet: Wallet, chainId: number) {
    const p = this.getChainProvider(chainId);
    const w = ethers.Wallet.fromMnemonic(wallet._mnemonic().phrase).connect(p);
    const nxtpAddress = this.getContractAddress(chainId);
  
    const txContract = new Contract(
      nxtpAddress,
      new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"],
      w,
    );
    const bal = await txContract.routerBalances(wallet.address, assetId);
    const balbn = BigNumber.from(bal);

    const min_liquidity = ethers.utils.parseEther("100");

    balbn.gte(min_liquidity)
      ? console.log("router has > 100 tokens liquid")
      : txContract.addLiquidity(min_liquidity, assetId);
  }

  async initRoutersOnChain() {
    // TODO: this will be slow af
    for (const chain of Object.keys(this.config?.chainConfig)) {

      const sendingChainId = parseInt(Object.keys(this.config.chainConfig)[0]);
      const receivingChainId = parseInt(Object.keys(this.config.chainConfig)[1]);

      const swap = this.config.swapPools.find((swap) => {
        // Must have sending and receiving chain
        const chains = swap.assets.map((a) => a.chainId);
        return chains.includes(sendingChainId) && chains.includes(receivingChainId);
      });

      if (!swap) {
        throw new Error(`Could not find matching swap in config: ${this.config.swapPools}`);
      }

      const { assetId: sendingAssetId } = swap.assets.find((a) => a.chainId === sendingChainId)!;

      const { assetId: receivingAssetId } = swap.assets.find((a) => a.chainId === receivingChainId)!;

      // Fund agents with tokens on sending + receiving chain
      // Gift eth
      console.log(`gifting eth if needed`);

      await this.routerAccountMgmt.updateBalances(parseInt(chain));
      console.log(`gift tokens`);

      await this.routerAccountMgmt.updateBalances(sendingChainId, sendingAssetId);

      await this.routerAccountMgmt.updateBalances(receivingChainId, receivingAssetId);

      console.log(`adding routers if needed`);

      for (const w of this.routerWallets) {
        const raddress = w.address;
        (await this.checkRouterApproved(raddress, parseInt(chain)))
          ? console.log("router already approved")
          : await this.addRouter(raddress, parseInt(chain));
            console.log("adding router");
      }
      console.log("adding liquidity");
      const swapph = swap.assets.find((a) => a.chainId === parseInt(chain)!);
      const p = new ethers.providers.StaticJsonRpcProvider(this.config.chainConfig[parseInt(chain)].providerUrls[0]);

      if (swapph)
        for (let i = 0; i < this.num_routers; i++) {
          const w = this.routerWallets[i];
          w.connect(p);
          //add liquidity
          const approved = await this.approveTokensIfNeeded(swapph.assetId, w, parseInt(chain));
          const liquidity_added = await this.addLiquidityIfNeeded(swapph.assetId, w, parseInt(chain));
          console.log(liquidity_added);
        }
    }
  }
}

async function main() {
  const config = getConfig();
  //insert funder mnemonic
  const funderMnemonic = JSON.parse(readFileSync("./ops/config/load/funder.json", "utf8"))[0];
  const rm = new RouterManager(
    funderMnemonic,
    3,
    config.chainConfig,
  );

  await rm.initRoutersOnChain();
  rm.startAllRouters();
}

main();

//snippet for router mnemonic mining
// let try_mnemonic;

// while(try_mnemonic?._mnemonic()?.phrase.split(' ')[0] !== 'cash' ){
//  try_mnemonic =  ethers.Wallet.createRandom();
//  console.log(try_mnemonic._mnemonic());

// }
// console.log(try_mnemonic?._mnemonic().phrase);
