import { providers, constants, BigNumber, utils } from "ethers";

import {
  chainDataToMap,
  XTransfer,
  XTransferStatus,
  getRandomBytes32,
  Bid,
  TransferInfo,
  ExecuteArgs,
  createLoggingContext,
} from "..";
import {
  Auction,
  ExecutorData,
  XMessage,
  RootMessage,
  XCallArgs,
  OriginMessage,
  DestinationMessage,
  AggregatedRoot,
  PropagatedRoot,
} from "../types";
import { getNtpTimeSeconds } from "../helpers";

import { mkAddress, mkBytes32, mkSig } from ".";

export const mockSequencer = mkAddress("0x333");

/**
 * General mock toolset used for testing globally.
 */
export const mock = {
  domain: {
    A: "13337",
    B: "13338",
  },
  chain: {
    A: "23337",
    B: "23338",
  },
  asset: {
    A: {
      name: "TEST-A",
      symbol: "TSTA",
      address: mkAddress("0xbeefbeefbeef"),
    },
    B: {
      name: "TEST-B",
      symbol: "TSTB",
      address: mkAddress("0x2faced"),
    },
  },
  chainData: () =>
    chainDataToMap([
      {
        name: "Unit Test Chain 1",
        chainId: parseInt(mock.chain.A),
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
        chainId: parseInt(mock.chain.B),
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
    callParams: (overrides: Partial<TransferInfo> = {}): TransferInfo => ({
      originDomain: mock.domain.A,
      destinationDomain: mock.domain.B,
      canonicalDomain: mock.domain.A,
      to: mkAddress("0xaaa"),
      delegate: mkAddress("0xbbb"),
      receiveLocal: false,
      callData: "0x",
      slippage: "1000",
      originSender: mkAddress("0x111"),
      bridgedAmt: "100",
      normalizedIn: "100",
      nonce: 1,
      canonicalId: mkAddress("0x123"),
      ...overrides,
    }),
    xcallArgs: (overrides: Partial<XCallArgs> = {}): XCallArgs => ({
      destination: mock.entity.callParams().destinationDomain,
      to: mock.entity.callParams().to,
      asset: mock.asset.A.address,
      delegate: mkAddress(),
      amount: utils.parseEther("1").toString(),
      slippage: "1000",
      callData: "0x",
      ...overrides,
    }),
    executeArgs: (overrides: Partial<ExecuteArgs> = {}): ExecuteArgs => ({
      params: mock.entity.callParams(),
      routers: [mkAddress("0x222")],
      routerSignatures: [mock.signature],
      sequencer: mockSequencer,
      sequencerSignature: mock.signature,
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
      routerVersion: "0.0.1",
      transferId: getRandomBytes32(),
      origin: mock.domain.A,
      router: mock.address.router,
      signatures: {
        "1": getRandomBytes32(),
        "2": getRandomBytes32(),
        "3": getRandomBytes32(),
      },
      ...overrides,
    }),
    executorData: (overrides: Partial<ExecutorData> = {}): ExecutorData => ({
      transferId: getRandomBytes32(),
      origin: mock.domain.A,
      executorVersion: "0.0.1",
      relayerFee: {
        amount: "0",
        asset: constants.AddressZero,
      },
      encodedData: "0xabcde",
      ...overrides,
    }),
    xtransfer: (
      overrides: {
        originDomain?: string;
        destinationDomain?: string;
        canonicalDomain?: string;
        canonicalId?: string;
        delegate?: string;
        slippage?: string;
        originSender?: string;
        bridgedAmt?: string;
        normalizedIn?: string;
        originChain?: string;
        destinationChain?: string;
        amount?: string;
        status?: XTransferStatus;
        asset?: string;
        transferId?: string;
        messageHash?: string;
        nonce?: number;
        user?: string;
        routers?: string[];
      } = {},
    ): XTransfer => {
      const originDomain: string = overrides.originDomain ?? mock.domain.A;
      const destinationDomain: string = overrides.destinationDomain ?? mock.domain.B;
      const canonicalDomain: string = overrides.canonicalDomain ?? mock.domain.A;
      const canonicalId: string = overrides.canonicalId ?? "0";
      const delegate: string = overrides.delegate ?? mkAddress("0x222");
      const slippage: string = overrides.slippage ?? "1000";
      const originSender: string = overrides.originSender ?? mkAddress("0xaaa");
      const bridgedAmt: string = overrides.bridgedAmt ?? "100";
      const normalizedIn: string = overrides.normalizedIn ?? "100";
      const originChain: string = overrides.originChain ?? mock.chain.A;
      const destinationChain: string = overrides.destinationChain ?? mock.chain.B;
      const amount = overrides.amount ?? "1000";
      const status: XTransferStatus | undefined = overrides.status;
      const asset: string = overrides.asset ?? mock.asset.A.address;
      const transferId: string = overrides.transferId ?? getRandomBytes32();
      const nonce = overrides.nonce ?? 1234;
      const user: string = overrides.user ?? mkAddress("0xfaded");
      const routers = overrides.routers ?? [mock.address.router];
      const messageHash: string = overrides.messageHash ?? getRandomBytes32();

      const shouldHaveOriginDefined = true;
      const shouldHaveDestinationDefined = !!status;
      return {
        // Meta
        transferId,

        // Call Params
        xparams: {
          originDomain,
          destinationDomain,
          canonicalDomain,
          to: user,
          callData: "0x",
          slippage,
          receiveLocal: false,
          delegate,
          originSender,
          bridgedAmt,
          normalizedIn,
          nonce,
          canonicalId,
        },

        origin: shouldHaveOriginDefined
          ? {
              chain: originChain,

              messageHash,

              // Assets
              assets: {
                transacting: {
                  asset,
                  amount,
                },
                bridged: {
                  asset,
                  amount,
                },
              },

              // XCalled
              xcall: {
                // Event Data
                caller: user,
                transactionHash: getRandomBytes32(),
                timestamp: Math.floor(Date.now() / 1000 - 60),
                gasPrice: utils.parseUnits("5", "gwei").toString(),
                gasLimit: "80000",
                blockNumber: 7654321,
              },
            }
          : undefined,

        destination: shouldHaveDestinationDefined
          ? {
              chain: destinationChain,

              // Event Data
              status,
              routers,

              // Assets
              assets: {
                // Transfer must have been Executed in order to have this defined.
                transacting:
                  status !== XTransferStatus.Reconciled
                    ? {
                        asset,
                        amount,
                      }
                    : undefined,
                local: {
                  asset,
                  amount,
                },
              },

              // If status is executed, we should have executed fields defined (but leave reconciled fields empty).
              execute:
                status === XTransferStatus.Executed || status === XTransferStatus.CompletedSlow
                  ? {
                      originSender: user,
                      caller: mock.address.relayer,
                      transactionHash: getRandomBytes32(),
                      timestamp: Math.floor(Date.now() / 1000 - 30),
                      gasPrice: utils.parseUnits("5", "gwei").toString(),
                      gasLimit: "80000",
                      blockNumber: 5651345,
                    }
                  : undefined,

              reconcile:
                status === XTransferStatus.Reconciled || status === XTransferStatus.CompletedFast
                  ? {
                      caller: mock.address.relayer,
                      transactionHash: getRandomBytes32(),
                      timestamp: Math.floor(Date.now() / 1000),
                      gasPrice: utils.parseUnits("5", "gwei").toString(),
                      gasLimit: "100000",
                      blockNumber: 5651390,
                    }
                  : undefined,
            }
          : undefined,
      };
    },
    dbTransfer: (overrides: any): any => ({
      origin_domain: mock.domain.A,
      destination_domain: mock.domain.B,
      nonce: 0,
      canonical_id: mkBytes32("0x111"),
      canonical_domain: mock.domain.A,
      to: mkAddress("0x11111"),
      call_data: mkBytes32("0xaaa"),
      transfer_id: mkBytes32("0xbbb"),
      origin_chain: mock.chain.A,
      origin_transacting_amount: 100,
      origin_transacting_asset: mkAddress("0x11"),
      origin_bridged_amount: 100,
      origin_bridged_asset: mkAddress("0x12"),
      xcall_block_number: 100,
      xcall_caller: mkAddress("0x1"),
      xcall_gas_limit: 10000,
      xcall_gas_price: 5,
      xcall_timestamp: 1e8,
      xcall_transaction_hash: mkBytes32("0xccc"),
      relayer_fee: 0,
      receive_local: false,
      slippage: 0,
      origin_sender: mkAddress("0x1a1a1a"),
      bridged_amt: 100,
      normalized_in: 100,
      destination_chain: mock.chain.B,
      destination_transacting_amount: 100,
      destination_transacting_asset: mkAddress("0x22"),
      destination_local_amount: 100,
      destination_local_asset: mkAddress("0x13"),
      routers: [],
      status: XTransferStatus.XCalled,
      execute_block_number: 100,
      execute_caller: mkAddress("0x2"),
      execute_gas_limit: 10000,
      execute_gas_price: 5,
      execute_timestamp: 1e8,
      execute_transaction_hash: mkBytes32("0xddd"),
      execute_relayer_fee: 0,
      execute_origin_sender: mkAddress("0x3"),
      reconcile_block_number: 100,
      reconcile_caller: mkAddress("0x4"),
      reconcile_gas_limit: 10000,
      reconcile_gas_price: 5,
      reconcile_timestamp: 1e8,
      reconcile_transaction_hash: mkBytes32("0xeee"),
      reconcile_relayer_fee: 0,
      reconcile_origin_sender: mkAddress("0x5"),
      ...overrides,
    }),
    originMessage: (overrides: Partial<OriginMessage> = {}): OriginMessage => ({
      domain: mock.domain.A,
      transferId: getRandomBytes32(),
      destinationDomain: mock.domain.B,
      leaf: getRandomBytes32(),
      index: Math.floor(Date.now() / 1000),
      root: getRandomBytes32(),
      message: getRandomBytes32(),
      ...overrides,
    }),
    destinationMessage: (overrides: Partial<DestinationMessage> = {}): DestinationMessage => ({
      domain: mock.domain.A,
      leaf: getRandomBytes32(),
      processed: false,
      returnData: getRandomBytes32(),
      ...overrides,
    }),
    xMessage: (overrides: Partial<XMessage> = {}): XMessage => ({
      leaf: getRandomBytes32(),
      originDomain: mock.domain.A,
      destinationDomain: mock.domain.B,
      transferId: getRandomBytes32(),
      origin: {
        index: Math.floor(Date.now() / 1000),
        root: getRandomBytes32(),
        message: getRandomBytes32(),
      },
      destination: {
        processed: false,
        returnData: getRandomBytes32(),
      },
      ...overrides,
    }),
    rootMessage: (overrides: Partial<RootMessage> = {}): RootMessage => ({
      id: getRandomBytes32(),
      spokeDomain: mock.domain.A,
      hubDomain: mock.domain.B,
      root: getRandomBytes32(),
      caller: mock.address.relayer,
      transactionHash: getRandomBytes32(),
      timestamp: Math.floor(Date.now() / 1000),
      gasPrice: utils.parseUnits("5", "gwei").toString(),
      gasLimit: "100000",
      blockNumber: Math.floor(Date.now() / 1000),
      processed: false,
      count: Math.floor(Date.now() / 1000),
      ...overrides,
    }),
    aggregatedRoot: (overrides: Partial<AggregatedRoot> = {}): AggregatedRoot => ({
      id: getRandomBytes32(),
      domain: mock.domain.A,
      receivedRoot: getRandomBytes32(),
      index: Math.floor(Date.now() / 1000),
      ...overrides,
    }),
    propagatedRoot: (overrides: Partial<PropagatedRoot> = {}): PropagatedRoot => ({
      id: getRandomBytes32(),
      aggregate: getRandomBytes32(),
      domains: [mock.domain.A, mock.domain.B],
      count: Math.floor(Date.now() / 1000),
      ...overrides,
    }),
  },
  ethers: {
    receipt: (overrides: Partial<providers.TransactionReceipt> = {}): providers.TransactionReceipt =>
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
        ...overrides,
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
      stableSwap: function (_: number) {
        return {
          address: mkAddress("0x222222"),
          abi: "fakeAbi()",
        };
      },
      spokeConnector: function (_: number) {
        return {
          address: mkAddress("0x333333"),
          abi: "fakeAbi()",
        };
      },
      hubConnectorts: function (_: number) {
        return {
          address: mkAddress("0x444444"),
          abi: "fakeAbi()",
        };
      },
    },
  },
};
