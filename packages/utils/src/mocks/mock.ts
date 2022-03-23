import { providers, constants, BigNumber, utils } from "ethers";
import {
  chainDataToMap,
  XTransfer,
  XTransferStatus,
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
    bid: (transferId = "0xtxid", data = mock.entity.executeArgs()): Bid => ({
      transferId,
      data,
    }),
    signedBid: (): SignedBid => ({
      bid: mock.entity.bid(),
      signature: "0xsig",
    }),
    xtransfer: (
      originDomain: string,
      destinationDomain: string,
      amount = "1000",
      status: XTransferStatus = XTransferStatus.XCalled,
      asset: string = mock.asset.A.address,
      transferId: string = getRandomBytes32(),
      nonce = 1234,
      user: string = mkAddress("0xfaded"),
    ): XTransfer => {
      return Object.assign({
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
        xcall: {
          caller: user,
          transferringAmount: amount,
          localAmount: amount,
          transferringAsset: asset,
          localAsset: asset,
          transactionHash: getRandomBytes32(),
          timestamp: Math.floor(Date.now() / 1000 - 60),
          gasPrice: utils.parseUnits("5", "gwei").toString(),
          gasLimit: "80000",
          blockNumber: 7654321,
        },

        // If status is executed, we should have executed fields defined (but leave reconciled fields empty).
        execute:
          status === XTransferStatus.Executed
            ? {
                caller: mock.address.relayer,
                transferringAmount: amount,
                localAmount: amount,
                transferringAsset: asset,
                localAsset: asset,
                transactionHash: getRandomBytes32(),
                timestamp: Math.floor(Date.now() / 1000 - 30),
                gasPrice: utils.parseUnits("5", "gwei").toString(),
                gasLimit: "80000",
                blockNumber: 5651345,
              }
            : undefined,
      });
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
