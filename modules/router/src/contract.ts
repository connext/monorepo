import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts";
import { TransactionService } from "@connext/nxtp-txservice";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { Interface } from "ethers/lib/utils";
import { BigNumber, constants, providers } from "ethers";
import { InvariantTransactionData } from "@connext/nxtp-utils";

import { getConfig } from "./config";

export class TransactionManager {
  private readonly txManagerInterface: TTransactionManager["interface"];
  constructor(private readonly txService: TransactionService, private readonly signerAddress: string) {
    this.txManagerInterface = new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];
    // TODO: remove when using for real, this is just to avoid breaking build
    console.log("this.txManagerInterface", !!this.txManagerInterface);
    console.log("this.txService", !!this.txService);
    console.log("this.signerAddress", !!this.signerAddress);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLiquidity(_chainId: number, _amount: string, _assetId: string) {
    //need Subgraph to read from chain.
  }

  async addLiquidity(
    chainId: number,
    amount: string,
    assetId: string = constants.AddressZero,
  ): Promise<providers.TransactionReceipt> {
    const nxtpContractAddress = getConfig().chainConfig[chainId].transactionManagerAddress;
    const bnAmount = BigNumber.from(amount);

    const addLiquidityData = this.txManagerInterface.encodeFunctionData("addLiquidity", [bnAmount, assetId]);
    try {
      const txRes = await this.txService.sendAndConfirmTx(chainId, {
        chainId: chainId,
        data: addLiquidityData,
        to: nxtpContractAddress,
        value: assetId === constants.AddressZero ? bnAmount : constants.Zero,
      });
      return txRes;
    } catch (e) {
      throw new Error(`Add liquidity error ${JSON.stringify(e)}`);
    }
  }

  async fulfill(
    chainId: number,
    txData: InvariantTransactionData,
    relayerFee: string,
    signature: string,
  ): Promise<providers.TransactionReceipt> {
    const nxtpContractAddress = getConfig().chainConfig[chainId].transactionManagerAddress;
    //wtd for uint 24 encoding below
    const invarTxData = `tuple(address ${txData.user}, address ${txData.router}, address ${
      txData.sendingAssetId
    }, address ${txData.receivingAssetId}, address ${txData.receivingAddress}, uint24 ${BigNumber.from(
      txData.sendingChainId,
    )}, uint24 ${BigNumber.from(txData.receivingChainId)}, bytes ${txData.callData}, bytes32 ${txData.transactionId}`;
    const bnRelayerFee = BigNumber.from(relayerFee);
    //@ts-ignore
    const fufilData = this.txManagerInterface.encodeFunctionData("fulfill", [invarTxData, bnRelayerFee, signature]);
    try {
      const txRes = await this.txService.sendAndConfirmTx(chainId, {
        chainId: chainId,
        data: invarTxData,
        to: nxtpContractAddress,
        value: 0,
      });
      return txRes;
    } catch (e) {
      throw new Error(`remove liquidity error ${JSON.stringify(e)}`);
    }
  }

  async cancel(
    chainId: number,
    txData: InvariantTransactionData,
    signature: string,
  ): Promise<providers.TransactionReceipt> {
    // encode and call tx service
    const nxtpContractAddress = getConfig().chainConfig[chainId].transactionManagerAddress;
    //wtd for uint 24 encoding below
    const invarTxData = `tuple(address ${txData.user}, address ${txData.router}, address ${
      txData.sendingAssetId
    }, address ${txData.receivingAssetId}, address ${txData.receivingAddress}, uint24 ${BigNumber.from(
      txData.sendingChainId,
    )}, uint24 ${BigNumber.from(txData.receivingChainId)}, bytes ${txData.callData}, bytes32 ${txData.transactionId}`;
    //@ts-ignore
    const fufilData = this.txManagerInterface.encodeFunctionData("cancel", [invarTxData, signature]);
    try {
      const txRes = await this.txService.sendAndConfirmTx(chainId, {
        chainId: chainId,
        data: invarTxData,
        to: nxtpContractAddress,
        value: 0,
      });
      return txRes;
    } catch (e) {
      throw new Error(`cancel error ${JSON.stringify(e)}`);
    }
  }

  async removeLiquidity(
    chainId: number,
    amount: string,
    assetId: string = constants.AddressZero,
    recipientAddress: string | undefined,
  ): Promise<providers.TransactionReceipt> {
    //should we remove liquidity for self if there isn't another address specified?
    if (!recipientAddress)
      //@ts-ignore
      recipientAddress = await this.txService.chains.get(chainId).getAddress();

    const nxtpContractAddress = getConfig().chainConfig[chainId].transactionManagerAddress;
    const bnAmount = BigNumber.from(amount).toString();

    //@ts-ignore
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
