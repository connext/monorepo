import { providers, constants, BigNumber, utils, Wallet } from "ethers";
import { createStubInstance } from "sinon";

import { AuctionsCache, StoreManager, TransactionsCache } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { TransactionService } from "@connext/nxtp-txservice";
import {
  mkAddress,
  mkBytes32,
  mkSig,
  chainDataToMap,
  CrossChainTx,
  CrossChainTxStatus,
  getRandomBytes32,
} from "@connext/nxtp-utils";

export const mock = {
  chain: {
    A: "1337",
    B: "1338",
  },
  chainData: () =>
    chainDataToMap([
      {
        name: "Unit Test Chain 1",
        chainId: parseInt(mock.chain.A),
        confirmations: 1,
        assetId: {},
      },
      {
        name: "Unit Test Chain 2",
        chainId: parseInt(mock.chain.B),
        confirmations: 1,
        assetId: {},
      },
    ]),
  signature: mkSig("0xabcdef1c"),
  router: {
    address: mkAddress("0xc0ffeebabe"),
  },
  sequencer: {
    address: mkAddress("0xdad")
  },
  entity: {
    crossChainTx: (
      origin: string,
      destination: string,
      alt: {
        status: CrossChainTxStatus,
        asset: string,
        transactionId: string,
        nonce: number,
        user: string,
      } = {
        status: CrossChainTxStatus.Prepared,
        asset: mkAddress("0x2faced"),
        transactionId: getRandomBytes32(),
        nonce: 1234,
        user: mkAddress("0xfaded"),
      }
    ): CrossChainTx => {
      const { status, asset, transactionId, nonce, user } = alt;
      return Object.assign(
        {
          // Meta
          originDomain: origin,
          destinationDomain: destination,
          status,

          // Transfer Data
          nonce,
          transactionId,
          recipient: user,
          router: mock.router.address,

          // Prepared
          prepareCaller: user,
          prepareTransactingAmount: "1000",
          prepareLocalAmount: "1000",
          prepareTransactingAsset: asset,
          prepareLocalAsset: asset,
          callTo: mkAddress("0x0"),
          callData: "0x0",

          // TransactionPrepared
          prepareTransactionHash: getRandomBytes32(),
          prepareTimestamp: Math.floor(Date.now() / 1000 - 60),
          prepareGasPrice: utils.parseUnits("5", "gwei").toString(),
          prepareGasLimit: "80000",
          prepareBlockNumber: 7654321,
        },
        // If status is prepared, these should be empty.
        status === CrossChainTxStatus.Prepared
          ? {
              // Fulfill
              fulfillCaller: "0x0",
              fulfillTransactingAmount: "0",
              fulfillLocalAmount: "0",
              fulfillTransactingAsset: asset,
              fulfillLocalAsset: asset,

              // TransactionFulfilled
              fulfillTransactionHash: "0x0",
              fulfillTimestamp: 0,
              fulfillGasPrice: "0",
              fulfillGasLimit: "0",
              fulfillBlockNumber: 0,

              // Reconciled
              externalCallHash: "0x0",
              reconciledTransactionHash: "0x0",
              reconciledTimestamp: 0,
              reconciledGasPrice: "0",
              reconciledGasLimit: "0",
              reconciledBlockNumber: 0,
            }
          : // If status is fulfilled, we should have fulfill fields defined (but leave reconciled fields empty).
          status === CrossChainTxStatus.Fulfilled
          ? {
              // Fulfill
              fulfillCaller: mock.sequencer.address,
              fulfillTransactingAmount: "1000",
              fulfillLocalAmount: "1000",
              fulfillTransactingAsset: asset,
              fulfillLocalAsset: asset,

              // TransactionFulfilled
              fulfillTransactionHash: getRandomBytes32(),
              fulfillTimestamp: Math.floor(Date.now() / 1000 - 30),
              fulfillGasPrice: utils.parseUnits("5", "gwei").toString(),
              fulfillGasLimit: "80000",
              fulfillBlockNumber: 7654345,

              // Reconciled
              externalCallHash: "0x0",
              reconciledTransactionHash: "0x0",
              reconciledTimestamp: 0,
              reconciledGasPrice: "0",
              reconciledGasLimit: "0",
              reconciledBlockNumber: 0,
            }
          : // Finally, if status is reconciled, we should have all fields defined.
            {
              // Fulfill
              fulfillCaller: mock.sequencer.address,
              fulfillTransactingAmount: "1000",
              fulfillLocalAmount: "1000",
              fulfillTransactingAsset: asset,
              fulfillLocalAsset: asset,

              // TransactionFulfilled
              fulfillTransactionHash: getRandomBytes32(),
              fulfillTimestamp: Math.floor(Date.now() / 1000 - 30),
              fulfillGasPrice: utils.parseUnits("5", "gwei").toString(),
              fulfillGasLimit: "80000",
              fulfillBlockNumber: 7654345,

              // Reconciled
              externalCallHash: "0x0",
              reconciledTransactionHash: getRandomBytes32(),
              reconciledTimestamp: Math.floor(Date.now() / 1000),
              reconciledGasPrice: utils.parseUnits("5", "gwei").toString(),
              reconciledGasLimit: "80000",
              reconciledBlockNumber: 7654567,
            },
      );
    },
  },
  ethers: {
    receipt: (): providers.TransactionReceipt =>
      ({
        blockHash: "foo",
        blockNumber: 1,
        byzantium: true,
        confirmations: 5,
        contractAddress: mkAddress(),
        cumulativeGasUsed: constants.One,
        from: mkAddress(),
        transactionHash: mkBytes32(),
        effectiveGasPrice: BigNumber.from(10),
        gasUsed: constants.One,
        to: mkAddress(),
        logs: [],
        logsBloom: "",
        transactionIndex: 1,
      } as unknown as providers.TransactionReceipt),
  },
  adapter: {
    wallet: (): Wallet => {
      const wallet = createStubInstance(Wallet);
      // need to do this differently bc the function doesnt exist on the interface
      (wallet as any).address = mock.router.address;
      wallet.getAddress.resolves(mock.router.address);
      wallet.signMessage.resolves(mock.signature);
      return wallet;
    },
    cache: (): StoreManager => {
      const cache = createStubInstance(StoreManager);
      const transactions = createStubInstance(TransactionsCache);
      const auctions = createStubInstance(AuctionsCache);
      // NOTE: if this override doesn't work, we should resort to just making a mock object with
      // these caches as properties.
      (cache as any).transactions = transactions;
      (cache as any).auctions = auctions;
      transactions.getLatestNonce.resolves(0);
      return cache;
    },
    subgraph: (): SubgraphReader => {
      const subgraph = createStubInstance(SubgraphReader);
      subgraph.getPreparedTransactions.resolves([]);
      subgraph.getTransactionsWithStatuses.resolves([]);
      return subgraph;
    },
    txservice: (): TransactionService => {
      const txservice = createStubInstance(TransactionService);
      txservice.getBalance.resolves(utils.parseEther("1"));

      txservice.getDecimalsForAsset.resolves(18);
      txservice.getBlockTime.resolves(Math.floor(Date.now() / 1000));
      txservice.calculateGasFee.resolves(BigNumber.from(100));
      txservice.calculateGasFeeInReceivingToken.resolves(BigNumber.from(100));
      txservice.calculateGasFeeInReceivingTokenForFulfill.resolves(BigNumber.from(120));
      txservice.getTokenPrice.resolves(BigNumber.from(1));
      txservice.getGasEstimate.resolves(BigNumber.from(24001));

      const mockReceipt = mock.ethers.receipt();
      txservice.sendTx.resolves(mockReceipt);
      txservice.getTransactionReceipt.resolves(mockReceipt);
      return txservice;
    },
  },
};

// export

// export const invariantDataMock: InvariantTransactionData = {
//   receivingChainTxManagerAddress: mkAddress("0xbb"),
//   user: mkAddress("0xa"),
//   router: mkAddress("0xb"),
//   initiator: mkAddress("0xbb"),
//   sendingAssetId: mkAddress("0xc"),
//   receivingAssetId: mkAddress("0xd"),
//   sendingChainFallback: mkAddress("0xe"),
//   receivingAddress: mkAddress("0xf"),
//   callTo: mkAddress("0xaa"),
//   sendingChainId: 1337,
//   receivingChainId: 1338,
//   callDataHash: mkBytes32("0xa"),
//   transactionId: mkBytes32("0xb"),
// };

// export const variantDataMock: VariantTransactionData = {
//   amount: "1000000",
//   expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
//   preparedBlockNumber: 1234,
// };

// export const txDataMock: TransactionData = {
//   ...invariantDataMock,
//   ...variantDataMock,
// };

// export const transactionSubgraphMock: any = {
//   user: { id: txDataMock.user },
//   router: { id: txDataMock.router },
//   initiator: txDataMock.initiator,
//   receivingChainTxManagerAddress: txDataMock.receivingChainTxManagerAddress,
//   sendingChainId: txDataMock.sendingChainId,
//   sendingAssetId: txDataMock.sendingAssetId,
//   sendingChainFallback: txDataMock.sendingChainFallback,
//   amount: txDataMock.amount,
//   receivingChainId: txDataMock.receivingChainId,
//   receivingAssetId: txDataMock.receivingAssetId,
//   receivingAddress: txDataMock.receivingAddress,
//   expiry: txDataMock.expiry,
//   callDataHash: txDataMock.callDataHash,
//   callTo: txDataMock.callTo,
//   transactionId: txDataMock.transactionId,
//   preparedBlockNumber: txDataMock.preparedBlockNumber,
// };

// export const receiverFulfillDataMock: TransactionFulfilledEvent = {
//   txData: txDataMock,
//   caller: mkAddress("0xf"),
//   relayerFee: "5678",
//   callData: "0x",
//   signature: mkSig("0xeee"),
// };

// export const requestContextMock: RequestContext = {
//   id: "0xf",
//   origin: "0xe",
// };

// export const sigMock = "0xabcdef1c";
