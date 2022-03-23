import { providers, constants, BigNumber, utils } from "ethers";
import {
  chainDataToMap,
  CrossChainTx,
  CrossChainTxStatus,
  getRandomBytes32,
  Bid,
  CallParams,
  ExecuteArgs,
  SignedBid,
  createLoggingContext,
} from "..";
import { mkAddress, mkBytes32, mkSig } from ".";

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
        domainId: mock.chain.A,
        confirmations: 1,
        assetId: {},
      },
      {
        name: "Unit Test Chain 2",
        chainId: parseInt(mock.chain.B),
        domainId: mock.chain.B,
        confirmations: 1,
        assetId: {},
      },
    ]),
  signature: mkSig("0xabcdef1c"),
  encodedData: () => getRandomBytes32(),
  address: {
    router: mkAddress("0xc0ffeebabe"),
    relayer: mkAddress("0xdad"),
  },
  loggingContext: (name = "TEST") => createLoggingContext(name, undefined, mkBytes32()),
  entity: {
    callParams: (): CallParams => ({
      to: mkAddress("0xrecipient"),
      callData: "0x",
      originDomain: mock.chain.A,
      destinationDomain: mock.chain.B,
    }),
    executeArgs: (): ExecuteArgs => ({
      params: mock.entity.callParams(),
      local: mkAddress("0xlocal"),
      router: mkAddress("0xrouter"),
      feePercentage: "1",
      index: 0,
      transferId: "0x",
      proof: ["0x"],
      amount: utils.parseEther("1").toString(),
      relayerSignature: "0xsig",
    }),
    bid: (transferId = "0xtxid", data = mock.entity.fulfillArgs()): Bid => ({
      transferId,
      data,
    }),
    signedBid: (): SignedBid => ({
      bid: mock.entity.bid(),
      signature: "0xsig",
    }),
    crossChainTx: (
      originDomain: string,
      destinationDomain: string,
      amount = "1000",
      status: CrossChainTxStatus = CrossChainTxStatus.XCalled,
      asset: string = mock.asset.A.address,
      transferId: string = getRandomBytes32(),
      nonce = 1234,
      user: string = mkAddress("0xfaded"),
    ): CrossChainTx => {
      return Object.assign(
        {
          // Meta
          originDomain: originDomain,
          destinationDomain: destinationDomain,
          status,

          // Transfer Data
          to: user,
          transferId,
          callTo: constants.AddressZero,
          callData: "0x0",
          idx: "0",
          nonce,
          router: mock.address.router,

          // XCalled
          xcalledCaller: user,
          xcalledTransferringAmount: amount,
          xcalledLocalAmount: amount,
          xcalledTransferringAsset: asset,
          xcalledLocalAsset: asset,

          // XCalled
          xcalledTransactionHash: getRandomBytes32(),
          xcalledTimestamp: Math.floor(Date.now() / 1000 - 60),
          xcalledGasPrice: utils.parseUnits("5", "gwei").toString(),
          xcalledGasLimit: "80000",
          xcalledBlockNumber: 7654321,
        },
        // If status is prepared, these should be empty.
        status === CrossChainTxStatus.XCalled
          ? {
              // Executed
              executedCaller: mkAddress("0x0"),
              executedTransferringAmount: "0",
              executedLocalAmount: "0",
              executedTransferringAsset: asset,
              executedLocalAsset: asset,

              // Executed
              executedTransactionHash: "0x0",
              executedTimestamp: 0,
              executedGasPrice: "0",
              executedGasLimit: "0",
              executedBlockNumber: 0,

              // Reconciled
              externalCallHash: "0x0",
              reconciledTransactionHash: "0x0",
              reconciledTimestamp: 0,
              reconciledGasPrice: "0",
              reconciledGasLimit: "0",
              reconciledBlockNumber: 0,
            }
          : // If status is fulfilled, we should have fulfill fields defined (but leave reconciled fields empty).
          status === CrossChainTxStatus.Executed
          ? {
              // Fulfill
              executedCaller: mock.address.relayer,
              executedTransactingAmount: "1000",
              executedLocalAmount: "1000",
              executedTransactingAsset: asset,
              executedLocalAsset: asset,

              // Transactionexecuteded
              executedTransactionHash: getRandomBytes32(),
              executedTimestamp: Math.floor(Date.now() / 1000 - 30),
              executedGasPrice: utils.parseUnits("5", "gwei").toString(),
              executedGasLimit: "80000",
              executedBlockNumber: 7654345,
            }
          : // Finally, if status is reconciled, we should have all fields defined.
            {
              // executed
              executedCaller: mock.address.relayer,
              executedTransactingAmount: "1000",
              executedLocalAmount: "1000",
              executedTransactingAsset: asset,
              executedLocalAsset: asset,

              // Transactionexecuteded
              executedTransactionHash: getRandomBytes32(),
              executedTimestamp: Math.floor(Date.now() / 1000 - 30),
              executedGasPrice: utils.parseUnits("5", "gwei").toString(),
              executedGasLimit: "80000",
              executedBlockNumber: 7654345,
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
