import { providers, constants, BigNumber, utils } from "ethers";

import {
  chainDataToMap,
  XTransfer,
  XTransferStatus,
  getRandomBytes32,
  Bid,
  BidData,
  CallParams,
  ExecuteArgs,
  createLoggingContext,
} from "..";
import { Auction } from "../types";
import { getNtpTimeSeconds } from "../helpers";

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
        domainId: mock.domain.A,
        confirmations: 1,
        assetId: {},
        subgraphs: {
          runtime: [{ query: "http://example.com", health: "http://example.com" }],
          analytics: [{ query: "http://example.com", health: "http://example.com" }],
          maxLag: 10,
        },
      },
      {
        name: "Unit Test Chain 2",
        chainId: parseInt(mock.chain.B as string),
        domainId: mock.domain.B,
        confirmations: 1,
        assetId: {},
        subgraphs: {
          runtime: [{ query: "http://example.com", health: "http://example.com" }],
          analytics: [{ query: "http://example.com", health: "http://example.com" }],
          maxLag: 10,
        },
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
    callParams: (overrides: Partial<CallParams> = {}): CallParams => ({
      to: mkAddress("0xaaa"),
      callData: "0x",
      originDomain: mock.domain.A,
      destinationDomain: mock.domain.B,
      ...overrides,
    }),
    executeArgs: (overrides: Partial<ExecuteArgs> = {}): ExecuteArgs => ({
      params: mock.entity.callParams(),
      local: mock.asset.A.address,
      routers: [mkAddress("0x222")],
      feePercentage: "0.05",
      amount: utils.parseEther("1").toString(),
      nonce: 0,
      relayerSignature: "0xsig",
      originSender: mkAddress(),
      ...overrides,
    }),
    auction: (overrides: Partial<Auction>): Auction => ({
      timestamp: getNtpTimeSeconds().toString(),
      origin: mock.domain.A,
      destination: mock.domain.B,
      bids: {
        [mock.address.router]: mock.entity.bid(),
      },
      ...overrides,
    }),
    bid: (overrides: Partial<Bid> = {}): Bid => ({
      router: mock.address.router,
      fee: "0.05",
      signatures: {
        "1": getRandomBytes32(),
        "2": getRandomBytes32(),
        "3": getRandomBytes32(),
      },
      ...overrides,
    }),
    bidData: (): BidData => {
      const bidData = mock.entity.executeArgs();
      delete bidData["routers"];
      return bidData;
    },
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
