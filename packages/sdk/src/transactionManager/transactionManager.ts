import { BigNumber, constants, providers } from "ethers";
import {
  PrepareParams,
  CancelParams,
  FulfillParams,
  Logger,
  RequestContext,
  createLoggingContext,
} from "@connext/nxtp-utils";
import { TransactionManager as TTransactionManager, IERC20Minimal } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import ERC20 from "@connext/nxtp-contracts/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json";
import { Interface } from "ethers/lib/utils";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import { ChainReader } from "@connext/nxtp-txservice";

import { ChainNotConfigured } from "../error";

/**
 * Returns the address of the `TransactionManager` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedTransactionManagerContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = (contractDeployments as any)[String(chainId)] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts?.TransactionManager;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

/**
 * Returns the address of the `PriceOracle` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedPriceOracleContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = (contractDeployments as any)[String(chainId)] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts?.ConnextPriceOracle;
  return { address: contract.address, abi: contract.abi };
};

/**
 * Returns the addresses where the price oracle contract is deployed to
 */
export const getDeployedChainIdsForGasFee = (): number[] => {
  const chainIdsForGasFee: number[] = [];
  const chainIds = Object.keys(contractDeployments);
  chainIds.forEach((chainId) => {
    const record = (contractDeployments as any)[String(chainId)];
    const chainName = Object.keys(record)[0];
    if (chainName) {
      const priceOracleContract = record[chainName]?.contracts?.ConnextPriceOracle;
      if (priceOracleContract) {
        chainIdsForGasFee.push(Number(chainId));
      }
    }
  });
  return chainIdsForGasFee;
};

export type TransactionManagerChainConfig = {
  transactionManagerAddress: string;
  priceOracleAddress: string;
};

/**
 * @classdesc Multi-chain wrapper around TranasctionManager contract interactions
 */
export class TransactionManager {
  private chainConfig: {
    [chainId: number]: TransactionManagerChainConfig;
  };

  private txManagerInterface = new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];
  private erc20Interface = new Interface(ERC20.abi) as IERC20Minimal["interface"];

  constructor(
    _chainConfig: {
      [chainId: number]: TransactionManagerChainConfig;
    },
    private readonly chainReader: ChainReader,
    private readonly signerAddress: Promise<string>,
    private readonly logger: Logger,
  ) {
    this.chainConfig = {};
    Object.entries(_chainConfig).forEach(([chainId, { transactionManagerAddress, priceOracleAddress }]) => {
      this.chainConfig[parseInt(chainId)] = {
        transactionManagerAddress,
        priceOracleAddress,
      };
    });
  }

  /**
   * Returns the address of the `TransactionManager` deployed to the provided chain, or undefined if it has not been deployed
   *
   * @param chainId - The chain you want the address on
   * @returns The deployed address or `undefined` if it has not been deployed yet
   */
  getTransactionManagerAddress(chainId: number): string | undefined {
    return this.chainConfig[chainId]?.transactionManagerAddress;
  }

  /**
   * Sends the prepare transaction to the `TransactionManager` on the provided chain.
   *
   * @param chainId - The chain you want to prepare the transaction on (transactionData.sendingChainId)
   * @param prepareParams - The arguments to be submitted to chain
   * @param prepareParams.txData - The `InvariantTransactionData` for the transaction being prepared
   * @param prepareParams.amount - The amount to be sent from the signer to the `Transactionmanager`
   * @param prepareParams.expiry - The timestamp the transaction will expire by
   * @param prepareParams.encryptedCallData - The encrypted calldata to be executed on the receiving chain
   * @param prepareParams.encodedBid - The encoded auction bid
   * @param prepareParams.bidSignature - The signature on the winning bid
   * @returns If successful, returns the `TransactionResponse` from the signer once the transaction has been submitted, not mined. If the function errors, will return a TransacionManagerError
   */
  async prepare(
    chainId: number,
    prepareParams: PrepareParams,
    _requestContext?: RequestContext<string>,
  ): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(
      "TransactionManager.prepare",
      _requestContext,
      prepareParams.txData.transactionId,
    );

    this.logger.info("Method start", requestContext, methodContext, { chainId, prepareParams });

    this.assertChainIsConfigured(chainId);
    const { transactionManagerAddress } = this.chainConfig[chainId];

    const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

    const invariantData = {
      receivingChainTxManagerAddress: txData.receivingChainTxManagerAddress,
      user: txData.user,
      router: txData.router,
      initiator: txData.initiator,
      sendingAssetId: txData.sendingAssetId,
      receivingAssetId: txData.receivingAssetId,
      sendingChainFallback: txData.sendingChainFallback,
      callTo: txData.callTo,
      receivingAddress: txData.receivingAddress,
      sendingChainId: txData.sendingChainId,
      receivingChainId: txData.receivingChainId,
      callDataHash: txData.callDataHash,
      transactionId: txData.transactionId,
    };

    const data = this.txManagerInterface.encodeFunctionData("prepare", [
      {
        invariantData,
        amount,
        expiry,
        encryptedCallData,
        encodedBid,
        bidSignature,
        encodedMeta: "0x",
      },
    ]);

    this.logger.info("Prepare transaction created", requestContext, methodContext);

    return {
      to: transactionManagerAddress,
      value: txData.sendingAssetId === constants.AddressZero ? BigNumber.from(amount) : constants.Zero,
      data,
      from: await this.signerAddress,
      chainId,
    };
  }

  /**
   * Sends the cancel transaction to the `TransactionManager` on the provided chain.
   *
   * @param chainId - The chain you want to cancel the transaction
   * @param cancelParams - The arguments to submit to chain
   * @param cancelParams.txData - The `TransactionData` (variant and invariant data) for the transaction being cancelled
   * @param cancelParams.relayerFee - The amount to be awarded to relayer for submitting the transaction to the `TransactionManager` (respected IFF on the sending chain and post-expiry)
   * @param cancelParams.signature - User's signature on cancel payload to be used by relayer when submitting transaction
   * @returns If successful, returns `TransactionResponse` from the signer once the transaction has been submitted, not mined. If it errors, returns a `TransactionManagerError`
   *
   * @remarks
   * Can be the sender chain if the transfer has expired, or the receiver chain before the expiry
   */
  async cancel(
    chainId: number,
    cancelParams: CancelParams,
    _requestContext?: RequestContext<string>,
  ): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(
      "TransactionManager.cancel",
      _requestContext,
      cancelParams.txData.transactionId,
    );

    this.logger.info("Method start", requestContext, methodContext, { cancelParams });

    this.assertChainIsConfigured(chainId);
    const { transactionManagerAddress } = this.chainConfig[chainId];

    const { txData, signature } = cancelParams;

    this.logger.info("Cancel transaction created", requestContext, methodContext);

    const data = this.txManagerInterface.encodeFunctionData("cancel", [
      {
        txData,
        signature,
        encodedMeta: "0x",
      },
    ]);

    return {
      to: transactionManagerAddress,
      data,
      from: await this.signerAddress,
      chainId,
    };
  }

  /**
   * Sends the fulfill transaction to the `TransactionManager` on the provided chain.
   *
   * @param chainId - The chain you want to fulfill the transaction on (transactionData.receivingChainId)
   * @param fulfillParams - The arguments to submit to chain
   * @param fulfillParams.txData - The `TransactionData` (variant and invariant data) for the transaction being fulfilled
   * @param fulfillParams.relayerFee - The amount to be awarded to relayer for submitting the transaction to the `TransactionManager`
   * @param fulfillParams.signature - User's signature on fulfill payload to be used by relayer when submitting transaction
   * @param fulfillParams.callData - The unencrypted call data corresponding to the `transactionData.callDataHash`
   *
   * @returns If successful, returns `TransactionResponse` from the signer once the transaction has been submitted, not mined. If it errors, returns a `TransactionManagerError`
   *
   * @remarks
   * User cannot be assumed to have gas on the receiving chain, so may use a relayer rather than submit the transaction themselves.
   */
  async fulfill(
    chainId: number,
    fulfillParams: FulfillParams,
    _requestContext?: RequestContext<string>,
  ): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(
      "TransactionManager.fulfill",
      _requestContext,
      fulfillParams.txData.transactionId,
    );

    this.logger.info("Method start", requestContext, methodContext, { fulfillParams });

    this.assertChainIsConfigured(chainId);
    const { transactionManagerAddress } = this.chainConfig[chainId];

    const { txData, relayerFee, signature, callData } = fulfillParams;

    const data = this.txManagerInterface.encodeFunctionData("fulfill", [
      {
        txData,
        relayerFee,
        signature,
        callData,
        encodedMeta: "0x",
      },
    ]);

    this.logger.info("Fulfill transaction created", requestContext, methodContext);

    return {
      to: transactionManagerAddress,
      data,
      from: await this.signerAddress,
      chainId,
    };
  }

  /**
   * Approves tokens with the given assetId for the TransactionManager on the specified chainId to spend if the current allowance is below the specified amount threshold
   *
   * @param chainId - The chain you want to increase `TransactionManager` allowance on
   * @param assetId - The asset you want to increase allowance for
   * @param amount - The minimum approval amount
   * @param infiniteApprove - (optional) If true, approves the max value. Defaults to false.
   *
   * @returns If successful, either returns `TransactionResponse` from the signer once the transaction has been submitted, not mined if the allowance was increased, or undefined if the allowance >= amount. If it errors, returns a `TransactionManagerError`.
   */
  async approveTokensIfNeeded(
    chainId: number,
    assetId: string,
    amount: string,
    infiniteApprove = false,
    _requestContext?: RequestContext,
  ): Promise<providers.TransactionRequest | undefined> {
    const { requestContext, methodContext } = createLoggingContext(
      "TransactionManager.approveTokensIfNeeded",
      _requestContext,
    );

    this.logger.info("Method start", requestContext, methodContext, { chainId, assetId, amount });

    this.assertChainIsConfigured(chainId);
    const { transactionManagerAddress } = this.chainConfig[chainId];

    const approvedData = this.erc20Interface.encodeFunctionData("allowance", [
      await this.signerAddress,
      transactionManagerAddress,
    ]);
    const approvedEncoded = await this.chainReader.readTx({
      to: assetId,
      data: approvedData,
      chainId,
    });
    const [approved] = this.erc20Interface.decodeFunctionResult("allowance", approvedEncoded);
    this.logger.info("Got approved tokens", requestContext, methodContext, { approved: approved.toString() });
    if (BigNumber.from(approved).lt(amount)) {
      const data = this.erc20Interface.encodeFunctionData("approve", [
        transactionManagerAddress,
        infiniteApprove ? constants.MaxUint256 : amount,
      ]);
      this.logger.info("Approve transaction created", requestContext, methodContext);
      return {
        to: assetId,
        data,
        from: await this.signerAddress,
        chainId,
      };
    } else {
      this.logger.info("Allowance sufficient", requestContext, methodContext, {
        approved: approved.toString(),
        amount,
      });
      return undefined;
    }
  }

  /**
   * Returns the available liquidity for the given router of the given asset on the `TransactionManager` contract for the specified chain.
   *
   * @param chainId - The chain you want to check liquidity on
   * @param router - The router you want to check the liquidity of
   * @param assetId - The asset you want to check the liquidity of
   * @returns Either the BigNumber representation of the available router liquidity in the provided asset, or a TransactionManagerError if the function failed
   */
  async getRouterLiquidity(chainId: number, router: string, assetId: string): Promise<BigNumber> {
    this.assertChainIsConfigured(chainId);
    const { transactionManagerAddress } = this.chainConfig[chainId];

    const data = this.txManagerInterface.encodeFunctionData("routerBalances", [router, assetId]);
    const encoded = await this.chainReader.readTx({ to: transactionManagerAddress, data, chainId });
    const [balance] = this.txManagerInterface.decodeFunctionResult("routerBalances", encoded);

    return BigNumber.from(balance);
  }

  private assertChainIsConfigured(chainId: number) {
    const { transactionManagerAddress } = this.chainConfig[chainId] ?? {};
    if (!transactionManagerAddress || !this.chainReader.isSupportedChain(chainId)) {
      throw new ChainNotConfigured(chainId, Object.keys(this.chainConfig));
    }
  }
}
