import { TransactionManager as TTransactionManager, IERC20Minimal } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { BigNumber, constants, Contract, providers, Signer } from "ethers";
import { PrepareParams, CancelParams, FulfillParams } from "@connext/nxtp-utils";
import hyperid from "hyperid";
import { BaseLogger } from "pino";
import ERC20 from "@connext/nxtp-contracts/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";

import { TransactionManagerEvent, TransactionManagerEventPayloads, TransactionManagerListener } from "./listener";

const hId = hyperid();

export const getTransactionManagerContractAddress = (chainId: number): string => {
  // just for testing
  let address: string;
  if ([1337, 1338].includes(chainId)) {
    address = "0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da";
  } else {
    const record = (contractDeployments as any)[String(chainId)] ?? {};
    const name = Object.keys(record)[0];
    if (!name) {
      throw new Error("Chain not supported yet, please contact connext team");
    }

    address = record[name]?.contracts?.TransactionManager?.address;
  }

  return address;
};

/**
 * Multi-chain wrapper around TranasctionManager contract
 */
export class TransactionManager {
  private chainConfig: {
    [chainId: number]: {
      provider: providers.FallbackProvider;
      transactionManager: TTransactionManager;
      listener: TransactionManagerListener;
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
    this.chainConfig = {};
    Object.entries(_chainConfig).forEach(([chainId, { provider, transactionManagerAddress }]) => {
      const transactionManager = new Contract(
        transactionManagerAddress,
        TransactionManagerArtifact.abi,
        provider,
      ) as TTransactionManager;
      this.chainConfig[parseInt(chainId)] = {
        transactionManager,
        listener: new TransactionManagerListener(
          transactionManager,
          parseInt(chainId),
          logger.child({ module: "TransactionManagerListener", chainId }),
        ),
        provider,
      };
    });
  }

  getTransactionManagerAddress(chainId: number): string {
    return this.chainConfig[chainId].transactionManager.address;
  }

  async prepare(chainId: number, prepareParams: PrepareParams): Promise<providers.TransactionResponse> {
    const method = "Contract::prepare";
    const methodId = hId();

    this.logger.info({ method, methodId, prepareParams }, "Method start");

    const txManager = this.chainConfig[chainId].transactionManager;
    if (!txManager) {
      throw new Error("No transactionManagerAddress configured for chainId: " + chainId.toString());
    }

    const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

    const txRes = await txManager
      .connect(this.signer.provider ? this.signer : this.signer.connect(this.chainConfig[chainId].provider))
      .prepare(
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
        { value: constants.Zero, from: this.signer.getAddress() },
      );
    return txRes;
  }

  async cancel(chainId: number, cancelParams: CancelParams): Promise<providers.TransactionResponse> {
    const method = "Contract::cancel";
    const methodId = hId();

    this.logger.info({ method, methodId, cancelParams }, "Method start");

    const txManager = this.chainConfig[chainId].transactionManager;
    if (!txManager) {
      throw new Error("No transactionManagerAddress configured for chainId: " + chainId.toString());
    }

    const { txData, relayerFee, signature } = cancelParams;

    const txRes = await txManager
      .connect(this.signer.provider ? this.signer : this.signer.connect(this.chainConfig[chainId].provider))
      .cancel(txData, relayerFee, signature, { from: this.signer.getAddress() });
    return txRes;
  }

  async fulfill(chainId: number, fulfillParams: FulfillParams): Promise<providers.TransactionResponse> {
    const method = "Contract::fulfill";
    const methodId = hId();

    this.logger.info({ method, methodId, fulfillParams }, "Method start");

    const txManager = this.chainConfig[chainId].transactionManager;
    if (!txManager) {
      throw new Error("No transactionManagerAddress configured for chainId: " + chainId.toString());
    }

    const { txData, relayerFee, signature, callData } = fulfillParams;

    const txRes = await txManager
      .connect(this.signer.provider ? this.signer : this.signer.connect(this.chainConfig[chainId].provider))
      .fulfill(txData, relayerFee, signature, callData, {
        from: this.signer.getAddress(),
      });
    return txRes;
  }

  async approveTokensIfNeeded(
    chainId: number,
    assetId: string,
    amount: string,
    infiniteApprove = false,
  ): Promise<providers.TransactionResponse | undefined> {
    const method = "Contract::approveTokensIfNeeded";
    const methodId = hId();

    this.logger.info({ method, methodId, chainId, assetId, amount }, "Method start");

    const config = this.chainConfig[chainId];
    const txManager = config.transactionManager;
    const signerAddress = await this.signer.getAddress();
    if (!txManager) {
      throw new Error("No transactionManagerAddress configured for chainId: " + chainId.toString());
    }

    const erc20 = new Contract(
      assetId,
      ERC20.abi,
      this.signer.provider ? this.signer : this.signer.connect(config.provider),
    ) as IERC20Minimal;
    const approved = await erc20.allowance(signerAddress, txManager.address);
    this.logger.info({ method, methodId, approved: approved.toString() }, "Got approved tokens");
    if (approved.lt(amount)) {
      const approveTx = await erc20.approve(txManager.address, infiniteApprove ? constants.MaxUint256 : amount);
      this.logger.info({ method, methodId, transactionHash: approveTx.hash }, "Submitted approve tx");
      return approveTx;
    } else {
      this.logger.info({ method, methodId, approved: approved.toString(), amount }, "Allowance sufficient");
      return undefined;
    }
  }

  async getLiquidity(chainId: number, router: string, assetId: string): Promise<BigNumber> {
    const txManager = this.chainConfig[chainId].transactionManager;
    if (!txManager) {
      throw new Error("No transactionManagerAddress configured for chainId: " + chainId.toString());
    }

    const liquidity = await txManager.routerBalances(router, assetId);
    return liquidity;
  }

  public attach<T extends TransactionManagerEvent>(
    chainId: number,
    event: T,
    callback: (data: TransactionManagerEventPayloads[T]) => void,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    return this.chainConfig[chainId].listener.attach(event, callback, filter, timeout);
  }

  public attachOnce<T extends TransactionManagerEvent>(
    chainId: number,
    event: T,
    callback: (data: TransactionManagerEventPayloads[T]) => void,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    return this.chainConfig[chainId].listener.attach(event, callback, filter, timeout);
  }

  public detach<T extends TransactionManagerEvent>(chainId: number, event?: T): void {
    return this.chainConfig[chainId].listener.detach(event);
  }

  public waitFor<T extends TransactionManagerEvent>(
    chainId: number,
    event: T,
    timeout: number,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
  ): Promise<TransactionManagerEventPayloads[T]> {
    return this.chainConfig[chainId].listener.waitFor(event, timeout, filter);
  }
}
