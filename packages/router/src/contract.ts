import {
  TransactionManager as TTransactionManager,
  IERC20Minimal as TTIERC20,
} from "@connext/nxtp-contracts/typechain";
import { MinimalTransaction, TransactionService } from "@connext/nxtp-txservice";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { Interface } from "ethers/lib/utils";
import { BigNumber, constants, providers } from "ethers";
import { jsonifyError, FulfillParams, PrepareParams, CancelParams } from "@connext/nxtp-utils";
import hyperid from "hyperid";
import { BaseLogger } from "pino";
import IERC20MinimalArtifact from "@connext/nxtp-contracts/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json";
import { okAsync, Result, ResultAsync, Err } from "neverthrow";

import { getConfig, NxtpRouterConfig } from "./config";

const hId = hyperid();

export class TransactionManager {
  private readonly txManagerInterface: TTransactionManager["interface"];
  private readonly erc20Interface: TTIERC20["interface"];
  private readonly config: NxtpRouterConfig;

  constructor(
    private readonly txService: TransactionService,
    private readonly signerAddress: string,
    private readonly logger: BaseLogger,
  ) {
    this.txManagerInterface = new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];
    this.erc20Interface = new Interface(IERC20MinimalArtifact.abi) as TTIERC20["interface"];
    this.config = getConfig();
  }

  async prepare(chainId: number, prepareParams: PrepareParams): Promise<providers.TransactionReceipt> {
    const method = "Contract::prepare ";
    const methodId = hId();
    this.logger.info({ method, methodId, prepareParams }, "Method start");

    const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

    const encodedData = this.txManagerInterface.encodeFunctionData("prepare", [
      {
        user: txData.user,
        router: txData.router,
        sendingAssetId: txData.sendingAssetId,
        receivingAssetId: txData.receivingAssetId,
        sendingChainFallback: txData.sendingChainFallback,
        receivingAddress: txData.receivingAddress,
        sendingChainId: txData.sendingChainId,
        receivingChainId: txData.receivingChainId,
        callDataHash: txData.callDataHash,
        transactionId: txData.transactionId,
      },
      amount,
      expiry,
      encryptedCallData,
      encodedBid,
      bidSignature,
    ]);

    try {
      const txRes = await this.txService.sendAndConfirmTx(chainId, {
        to: this.config.chainConfig[chainId].transactionManagerAddress,
        data: encodedData,
        value: constants.Zero,
        chainId: chainId,
        from: this.signerAddress,
      });
      return txRes;
    } catch (e) {
      if (e.message.includes("DUPLICATE_DIGEST")) {
        this.logger.warn(
          { methodId, method, transactionId: txData.transactionId },
          "Receiver tx already prepared, but resubmitted",
        );
      }
      this.logger.error(
        { methodId, method, error: jsonifyError(e), transactionId: txData.transactionId },
        "Error sending receiver prepare tx",
      );
      throw e;
    }
  }

  async approve(chainId: number, receieverAddress: string, assetId: string): Promise<providers.TransactionReceipt> {
    const method = "ERC20::approve";
    const methodId = hId();

    const approveData = this.erc20Interface.encodeFunctionData("approve", [receieverAddress, constants.MaxUint256]);

    try {
      const txRes = await this.txService.sendAndConfirmTx(chainId, {
        chainId,
        data: approveData,
        to: assetId,
        value: 0,
        from: this.signerAddress,
      });
      return txRes;
    } catch (e) {
      // If fail -- something has gone really wrong here!! We need to figure out what ASAP.
      this.logger.error({ methodId, method, error: jsonifyError(e) }, "Error sending approve token tx");
      // TODO discuss this case!!
      throw e;
    }
  }

  async fulfill(chainId: number, fulfillParams: FulfillParams): Promise<providers.TransactionReceipt> {
    const method = "Contract::fulfill";
    const methodId = hId();
    this.logger.info({ method, methodId, fulfillParams }, "Method start");

    const { txData, relayerFee, signature, callData } = fulfillParams;

    const fulfilData = this.txManagerInterface.encodeFunctionData("fulfill", [txData, relayerFee, signature, callData]);
    try {
      const txRes = await this.txService.sendAndConfirmTx(chainId, {
        chainId,
        data: fulfilData,
        to: this.config.chainConfig[chainId].transactionManagerAddress,
        value: 0,
        from: this.signerAddress,
      });
      return txRes;
    } catch (e) {
      // If fail -- something has gone really wrong here!! We need to figure out what ASAP.
      this.logger.error(
        { methodId, method, transactionId: fulfillParams.txData.transactionId, error: jsonifyError(e) },
        "Error sending sender fulfill tx",
      );
      // TODO discuss this case!!
      throw e;
    }
  }

  async cancel(chainId: number, cancelParams: CancelParams): Promise<providers.TransactionReceipt> {
    const method = "Contract::cancel";
    const methodId = hId();
    this.logger.info({ method, methodId, cancelParams }, "Method start");
    // encode and call tx service

    const { txData, relayerFee, signature } = cancelParams;

    const cancelData = this.txManagerInterface.encodeFunctionData("cancel", [txData, relayerFee, signature]);

    try {
      const txRes = await this.txService.sendAndConfirmTx(chainId, {
        chainId: chainId,
        data: cancelData,
        to: this.config.chainConfig[chainId].transactionManagerAddress,
        value: 0,
        from: this.signerAddress,
      });
      return txRes;
    } catch (e) {
      throw new Error(`cancel error ${JSON.stringify(e)}`);
    }
  }

  async getLiquidity(chainId: number, assetId: string): Promise<string> {
    const getLiquidityData = this.txManagerInterface.encodeFunctionData("routerBalances", [
      this.signerAddress,
      assetId,
    ]);
    const liquidity = await this.txService.readTx(chainId, {
      chainId: chainId,
      to: this.config.chainConfig[chainId].transactionManagerAddress,
      value: 0,
      data: getLiquidityData,
    });
    //decode hex data
    const liquidityHex = this.txManagerInterface.decodeFunctionResult("routerBalances", liquidity);
    return liquidityHex[0];
  }

  readTransactionWrapper = async(chainId:number, to:string, data?:string):Promise<Result<string, Error>> =>{
    const err = new Error(`No Transaction Receipt`);
    let txData;
    data? txData = data: txData = "";

    const asyncRes = ResultAsync.fromPromise(this.txService.readTx(chainId,{
      chainId:chainId,
      data:txData,
      to: to,
      value: 0,
    }), ()=> err);
    await asyncRes;
    return asyncRes;
  }

  sendTransactionWrapper = async(chainId:number, to:string, data?:string):Promise<Result<providers.TransactionReceipt, Error>> =>{
    const err = new Error(`No Transaction Receipt`);
    let txData;
    data? txData = data: txData = "";

    const asyncRes = ResultAsync.fromPromise(this.txService.sendAndConfirmTx(chainId,{
      chainId:chainId,
      data:txData,
      to: to,
      value: 0,
    }), ()=> err);
    await asyncRes;
    return asyncRes;
  }

  async addLiquidity(
    chainId: number,
    amount: string,
    assetId: string = constants.AddressZero,
  ): Promise<providers.TransactionReceipt | Error> {
    
    const nxtpContractAddress = getConfig().chainConfig[chainId].transactionManagerAddress;
    const bnAmount = BigNumber.from(amount);
    const addLiquidityData = this.txManagerInterface.encodeFunctionData("addLiquidity", [bnAmount, assetId]);

    const balanceOf = async (chainId: number, assetId:string):Promise<BigNumber | Error> => {
      const balanceOfData = this.erc20Interface.encodeFunctionData("allowance", [this.signerAddress, nxtpContractAddress]);
      const res = await this.readTransactionWrapper(chainId, assetId, balanceOfData);
      if(res.isErr()) {
        console.log(`Error getting balance of ${this.signerAddress}`);
        return new Error(res.error.message);
      }else {
        return BigNumber.from(res.value);
      }
    };
    const routerAssetBalance = await balanceOf(chainId,assetId);

    if(routerAssetBalance !== constants.MaxUint256){
      const approveData = this.erc20Interface.encodeFunctionData("approve", [assetId, constants.MaxUint256]);
      const res = await this.sendTransactionWrapper(chainId, assetId, approveData);
      if(res.isErr()) {
        console.log(`Error approving ${res.error.message}`);
        return new Error(res.error.message);
      }else {
        console.log(`Approve successful, tx Hash: ${res.value.transactionHash}`);
        const addLiquidityRes = await this.sendTransactionWrapper(chainId, nxtpContractAddress, addLiquidityData);
        if(addLiquidityRes.isErr()) {
          console.log(`Error getting balance of ${this.signerAddress}`);
          return new Error(`arg`);

        }else {
          return addLiquidityRes.value;
        }
      }
    }
    return new Error(`no idea what happened`);

  }

  async removeLiquidity(
    chainId: number,
    amount: string,
    assetId: string = constants.AddressZero,
    recipientAddress: string | undefined,
  ): Promise<providers.TransactionReceipt> {
    //should we remove liquidity for self if there isn't another address specified?
    if (!recipientAddress) {
      recipientAddress = this.signerAddress;
    }

    const nxtpContractAddress = getConfig().chainConfig[chainId].transactionManagerAddress;
    const bnAmount = BigNumber.from(amount).toString();

    const removeLiquidityData = this.txManagerInterface.encodeFunctionData("removeLiquidity", [
      bnAmount,
      assetId,
      recipientAddress,
    ]);

    try {
      const txRes = await this.txService.sendAndConfirmTx(chainId, {
        chainId: chainId,
        data: removeLiquidityData,
        to: nxtpContractAddress,
        value: 0,
      });
      return txRes;
    } catch (e) {
      throw new Error(`remove liquidity error ${JSON.stringify(e)}`);
    }
  }
}
