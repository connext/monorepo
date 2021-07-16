import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { Interface } from "ethers/lib/utils";
import { constants, providers, Signer } from "ethers";
import { jsonifyError, PrepareParams, CancelParams } from "@connext/nxtp-utils";
import hyperid from "hyperid";
import { BaseLogger } from "pino";

const hId = hyperid();

/**
 * Multi-chain wrapper around TranasctionManager contract
 */
export class TransactionManager {
  private chainConfig: {
    [chainId: number]: {
      provider: providers.FallbackProvider;
      transactionManagerAddress: string;
    };
  };

  constructor(
    private readonly signer: Signer,
    private readonly logger: BaseLogger,
    _chainConfig: {
      [chainId: number]: {
        provider: providers.FallbackProvider;
        transactionManagerAddress: string;
      };
    },
  ) {
    this.txManagerInterface = new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];
  }

  async prepare(chainId: number, prepareParams: PrepareParams): Promise<providers.TransactionResponse> {
    const method = "Contract::prepare";
    const methodId = hId();

    this.logger.info({ method, methodId, prepareParams }, "Method start");

    if (!this.chainConfig[chainId].transactionManagerAddress) {
      throw new Error("No transactionManagerAddress configured for chainId: " + chainId.toString());
    }

    const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData, userSignature } = prepareParams;

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
      userSignature ?? "0x",
    ]);

    try {
      const txRes = await this.signer.connect(this.chainConfig[chainId].provider).sendTransaction({
        to: this.chainConfig[chainId].transactionManagerAddress,
        data: encodedData,
        value: constants.Zero,
        chainId: chainId,
      });
      return txRes;
    } catch (e) {
      this.logger.error(
        { methodId, method, error: jsonifyError(e), transactionId: txData.transactionId },
        "Error sending receiver prepare tx",
      );
      throw e;
    }
  }

  async cancel(chainId: number, cancelParams: CancelParams): Promise<providers.TransactionResponse> {
    const method = "Contract::cancel";
    const methodId = hId();

    this.logger.info({ method, methodId, cancelParams }, "Method start");

    if (!this.chainConfig[chainId].transactionManagerAddress) {
      throw new Error("No transactionManagerAddress configured for chainId: " + chainId.toString());
    }

    const { txData, relayerFee, signature } = cancelParams;

    const cancelData = this.txManagerInterface.encodeFunctionData("cancel", [txData, relayerFee, signature]);

    try {
      const txRes = await this.signer.connect(this.chainConfig[chainId].provider).sendTransaction({
        chainId: chainId,
        data: cancelData,
        to: this.chainConfig[chainId].transactionManagerAddress,
        value: 0,
      });
      return txRes;
    } catch (e) {
      throw new Error(`cancel error ${JSON.stringify(e)}`);
    }
  }

  async getLiquidity(chainId: number, router: string, assetId: string): Promise<string> {
    if (!this.chainConfig[chainId].transactionManagerAddress) {
      throw new Error("No transactionManagerAddress configured for chainId: " + chainId.toString());
    }

    const getLiquidityData = this.txManagerInterface.encodeFunctionData("routerBalances", [router, assetId]);
    const liquidity = await this.signer.connect(this.chainConfig[chainId].provider).call({
      chainId: chainId,
      to: this.chainConfig[chainId].transactionManagerAddress,
      value: 0,
      data: getLiquidityData,
    });
    //decode hex data
    const liquidityHex = this.txManagerInterface.decodeFunctionResult("routerBalances", liquidity);
    return liquidityHex[0];
  }
}
