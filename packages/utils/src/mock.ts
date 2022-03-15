import { providers, constants, BigNumber, utils } from "ethers";
import {
  mkAddress,
  mkBytes32,
  mkSig,
  chainDataToMap,
  CrossChainTx,
  CrossChainTxStatus,
  getRandomBytes32,
  Bid,
  CallParams,
  FulfillArgs,
  SignedBid,
  createLoggingContext,
} from ".";

/**
 * General mock toolset used for testing globally.
 */
export const mock: any = {
  chain: {
    A: "1337",
    B: "1338",
  },
  asset: {
    A: {
      name: "TEST-A",
      address: mkAddress("0xbeefbeefbeef"),
    },
    B: {
      name: "TEST-B",
      address: mkAddress("0x2faced"),
    },
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
  address: {
    router: mkAddress("0xc0ffeebabe"),
    relayer: mkAddress("0xdad"),
  },
  loggingContext: (name = "TEST") => createLoggingContext(name, undefined, mkBytes32()),
  entity: {
    callParams: (): CallParams => ({
      recipient: mkAddress("0xrecipient"),
      callTo: mkAddress("0xcallTo"),
      callData: "0x",
      originDomain: "1337",
      destinationDomain: "1338",
    }),
    fulfillArgs: (): FulfillArgs => ({
      params: mock.entity.callParams(),
      local: mkAddress("0xlocal"),
      router: mkAddress("0xrouter"),
      feePercentage: "1",
      nonce: "0",
      amount: utils.parseEther("1").toString(),
      relayerSignature: "0xsig",
    }),
    bid: (transactionId = "0xtxid", data = mock.entity.fulfillArgs()): Bid => ({
      transactionId,
      data,
    }),
    signedBid: (): SignedBid => ({
      bid: mock.entity.bid(),
      signature: "0xsig",
    }),
    crossChainTx: (
      origin: string,
      destination: string,
      amount = "1000",
      status: CrossChainTxStatus = CrossChainTxStatus.Prepared,
      asset: string = mock.asset.A.address,
      transactionId: string = getRandomBytes32(),
      nonce = 1234,
      user: string = mkAddress("0xfaded"),
    ): CrossChainTx => {
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
          router: mock.address.router,

          // Prepared
          prepareCaller: user,
          prepareTransactingAmount: amount,
          prepareLocalAmount: amount,
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
              fulfillCaller: mock.address.relayer,
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
              fulfillCaller: mock.address.relayer,
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
