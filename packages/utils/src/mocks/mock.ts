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
  domain: {
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
        chainId: parseInt(mock.chain.A as string),
        domainId: mock.chain.A,
        confirmations: 1,
        assetId: {},
      },
      {
        name: "Unit Test Chain 2",
        chainId: parseInt(mock.chain.B as string),
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
      to: mkAddress("0xaaa"),
      callData: "0x",
      originDomain: mock.domain.A,
      destinationDomain: mock.domain.B,
    }),
    executeArgs: (): ExecuteArgs => ({
      params: mock.entity.callParams(),
      local: mkAddress("0x111"),
      router: mkAddress("0x222"),
      feePercentage: "1",
      amount: utils.parseEther("1").toString(),
      nonce: 0,
      relayerSignature: "0xsig",
      originSender: "0xogsender",
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
  contracts: {
    deployments: {
      connext: function (_: number) {
        return {
          address: mkAddress("0x123123"),
          abi: "fakeAbi()",
        };
      },
      priceOracle: function (_: number) {
        return {
          address: mkAddress("0x321321"),
          abi: "fakeAbi()",
        };
      },
    },
  },
};
