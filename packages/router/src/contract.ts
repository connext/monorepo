import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts/typechain";
import { TransactionService } from "@connext/nxtp-txservice";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { Interface } from "ethers/lib/utils";
import { BigNumber, constants, providers } from "ethers";
import { jsonifyError, FulfillParams, PrepareParams, CancelParams, validateAndParseAddress } from "@connext/nxtp-utils";
import hyperid from "hyperid";
import { BaseLogger } from "pino";

import { getConfig, NxtpRouterConfig } from "./config";

const hId = hyperid();

/**
 * Handles any onchain interactions with the `TransactionManager` contracts, including transaction submissions and chain reads.
 */
export class TransactionManager {
  private readonly txManagerInterface: TTransactionManager["interface"];
  private readonly config: NxtpRouterConfig;

  constructor(
    private readonly txService: TransactionService,
    private readonly signerAddress: string,
    private readonly logger: BaseLogger,
  ) {
    this.txManagerInterface = new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];
    this.config = getConfig();
  }

  /**
   * Method calls `prepare` on the `TransactionManager` on the given chain. Should be used to `prepare` the receiver-side transaction. Resolves when the transaction has been mined.
   *
   * @param chainId - The chain you are preparing a transaction on
   * @param prepareParams.txData - The `InvariantTransactionData` for the transaction being prepared
   * @param prepareParams.amount - The amount to be deducted from the liquidity held by the router on the TransactionManager
   * @param prepareParams.expiry - The timestamp the transaction will expire by
   * @param prepareParams.encryptedCallData - The user-encrypted calldata to be executed on the receiving chain
   * @param prepareParams.encodedBid - The encoded auction bid
   * @param prepareParams.bidSignature - The signature on the winning bid
   *
   * @returns The `TransactionReceipt` from the prepare transaction sent to the `TransactionManager.sol`
   *
   */
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
        callTo: txData.callTo,
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

  /**
   * Calls `fulfill` on the `TransactionManager` on the given chain. Can be used to submit the routers own fulfill transaction (on the sending chain), or to submit fulfill transactions where the router is acting as a relayer.
   *
   * @param chainId - The chain you are fulfilling a transaction on
   * @param fulfillParams.txData - The `TransactionData` (invariant and variant) for the transaction you are fulfilling
   * @param fulfillParams.relayerFee - The `relayerFee` for the transaction
   * @param fulfillParams.signature - The `txData.user`'s signature used to unlock the transaction
   * @param fulfillParams.callData - The unencrypted calldata that corresponds to the `txData.callDataHash`
   * @returns The `TransactionReceipt` from the fulfill transaction sent to the `TransactionManager.sol`
   */
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

  /**
   * Calls `cancel` on the `TransactionManager` on the given chain. Can be used to submit the routers own cancellation or to relay a user's cancellation request.
   * @param chainId - The chain you are cancelling a transaction on
   * @param cancelParams.txData - The `TransactionData` (invariant and variant) for the transaction you are cancelling
   * @param cancelParams.relayerFee - The relayer fee for the transaction
   * @param cancelParams.signature - The user signatures (if submitting as a relayer) on the relayerFee and transactionId
   * @returns The `TransactionReceipt` from the cancel transaction sent to the `TransactionManager.sol`
   */
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

  /**
   * Gets the current liquidity available for the router
   *
   * @param chainId - The chain of the `TransactionManager` to query
   * @param assetId - The asset you want to know the liquidity of
   * @returns The current available liquidity of the given asset in wei units as a BigNumber string
   */
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

    console.log(`Liquidity Hex::Contract ${liquidityHex[0]}`);
    return liquidityHex[0];
  }

  /**
   * Adds liquidity to the `TransactionManager` on the provided chain.
   *
   * @param chainId - The chain to interact with
   * @param router - The router address you want to add liquidity for
   * @param amount - The amount of liquidity you want to add
   * @param assetId - The assetId (token address or address(0) for native asset) of the asset you'd like to add liquidity for onchain.
   * @returns The `TransactionReceipt` for the addLiquidity transaction
   */
  async addLiquidity(
    chainId: number,
    router: string,
    amount: string,
    assetId: string,
  ): Promise<providers.TransactionReceipt> {
    const nxtpContractAddress = getConfig().chainConfig[chainId].transactionManagerAddress;
    const bnAmount = BigNumber.from(amount);
    const routerAddress = validateAndParseAddress(router);

    const addLiquidityData = this.txManagerInterface.encodeFunctionData("addLiquidity", [
      bnAmount,
      assetId,
      routerAddress,
    ]);
    try {
      const txRes = await this.txService.sendAndConfirmTx(chainId, {
        chainId: chainId,
        data: addLiquidityData,
        to: nxtpContractAddress,
        value: 0,
      });
      return txRes;
    } catch (e) {
      throw new Error(`Add liquidity error ${JSON.stringify(e)}`);
    }
  }

  /**
   * Removes liquidity from the `TransactionManager` on the provided chain.
   *
   * @param chainId - The chain to interact with
   * @param amount - The amount of liquidity you want to remove
   * @param assetId - The assetId (token address or address(0) for native asset) of the asset you'd like to remove liquidity from onchain.
   * @param recipientAddress - The address you'd like the funds to be sent to
   * @returns The `TransactionReceipt` for the removeLiquidity transaction
   */
  async removeLiquidity(
    chainId: number,
    amount: string,
    assetId: string,
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
