import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts";
import { TransactionService } from "@connext/nxtp-txservice";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { Interface } from "ethers/lib/utils";
import {BigNumber, constants, providers} from "ethers";
import {getConfig} from "./config";

export class TransactionManager {
  private readonly txManagerInterface: TTransactionManager["interface"];
  constructor(private readonly txService: TransactionService, private readonly signerAddress: string) {
    this.txManagerInterface = new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];
    // TODO: remove when using for real, this is just to avoid breaking build
    console.log("this.txManagerInterface", !!this.txManagerInterface);
    console.log("this.txService", !!this.txService);
    console.log("this.signerAddress", !!this.signerAddress);
  }

  getLiquidity() {
    // read onchain
  }

  async addLiquidity(chainId:number, amount:string, assetId:string = constants.AddressZero): Promise<providers.TransactionReceipt>{
    const nxtpContractAddress = getConfig().chainConfig[chainId].transactionManagerAddress
    const bnAmount = BigNumber.from(amount);

    const addLiquidityData = this.txManagerInterface.encodeFunctionData('addLiquidity',[
        bnAmount,
        assetId
    ])
    try {
      const txRes = await this.txService.sendAndConfirmTx(chainId, {
        chainId: chainId,
        data: addLiquidityData,
        to: nxtpContractAddress,
        value: 0
      })
      return txRes;
      } catch(e){
      throw new Error(`Add liquidity error ${JSON.stringify(e)}`)
      }
  }

  async fulfill(): Promise<providers.TransactionReceipt> {
    // encode and call tx service
    throw new Error("Not implemented");
  }

  async cancel(): Promise<providers.TransactionReceipt> {
    // encode and call tx service
    throw new Error("Not implemented");
  }

  async removeLiquidity(chainId:number, amount:string, assetId:string = constants.AddressZero, recipientAddress:string|undefined): Promise<providers.TransactionReceipt> {

    if(!recipientAddress)
      recipientAddress = await this.txService.getSigner(chainId).getAddress();

    const nxtpContractAddress = getConfig().chainConfig[chainId].transactionManagerAddress
    const bnAmount = BigNumber.from(amount);


    const removeLiquidityData = this.txManagerInterface.encodeFunctionData('removeLiquidity',[
      bnAmount,
      assetId,
      recipientAddress
    ])

    try {
      const txRes = await this.txService.sendAndConfirmTx(chainId, {
        chainId: chainId,
        data: removeLiquidityData,
        to: nxtpContractAddress,
        value: 0
      })
      return txRes;
    } catch(e){
      throw new Error(`remove liquidity error ${JSON.stringify(e)}`)
    }
    throw new Error("Not implemented");
  }
}
