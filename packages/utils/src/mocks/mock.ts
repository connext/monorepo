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
  AggregatedRoot,
  PropagatedRoot,
  ReceivedAggregateRoot,
  XTransferErrorStatus,
  StableSwapPool,
  StableSwapExchange,
  StableSwapPoolEvent,
  Asset,
  XTransferMessageStatus,
  AssetPrice,
  StableSwapTransfer,
  StableSwapLpBalance,
  SnapshotRoot,
  Snapshot,
  OptimisticRootFinalized,
  OptimisticRootPropagated,
  RouterDailyTVL,
  RelayerFeesIncrease,
  SlippageUpdate,
  SpokeOptimisticRoot,
} from "../types";
import { getNtpTimeSeconds, getRandomAddress } from "../helpers";

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
    A: "1337",
    B: "1338",
  },
  asset: {
    A: {
      name: "TEST-A",
      symbol: "TSTA",
      address: "0xBeEFBEEfBeEf0000000000000000000000000000",
    },
    B: {
      name: "TEST-B",
      symbol: "TSTB",
      address: "0x2fAceD0000000000000000000000000000000000",
    },
  },
  chainData: () =>
    chainDataToMap([
      {
        name: "Unit Test Chain 1",
        chainId: parseInt(mock.chain.A),
        domainId: mock.domain.A,
        confirmations: 1,
        assetId: {
          "0xBeEFBEEfBeEf0000000000000000000000000000": {
            name: mock.asset.A.name,
            symbol: mock.asset.A.symbol,
            mainnetEquivalent: "0x0000000000000000000000000000000000000000",
            decimals: 18,
          },
          "0x2fAceD0000000000000000000000000000000000": {
            name: mock.asset.B.name,
            symbol: mock.asset.B.symbol,
            mainnetEquivalent: "0x0000000000000000000000000000000000000000",
            decimals: 18,
          },
        },
        subgraphs: {
          runtime: [{ query: "http://example.com", health: "http://example.com" }],
          analytics: [{ query: "http://example.com", health: "http://example.com" }],
          maxLag: 10,
        },
        maxRelayerFeeInEth: "1000000",
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
        maxRelayerFeeInEth: "1000000",
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
      routerAddress: mock.address.router,
      encodedData: "0xabcde",
      ...overrides,
    }),
    asset: (overrides: Partial<Asset> = {}): Asset => ({
      adoptedAsset: getRandomAddress(),
      blockNumber: "1",
      canonicalDomain: mock.domain.A,
      canonicalId: getRandomBytes32(),
      decimal: "18",
      adoptedDecimal: "18",
      domain: mock.domain.A,
      id: getRandomAddress(),
      key: getRandomBytes32(),
      localAsset: getRandomAddress(),
      ...overrides,
    }),
    assetPrice: (overrides: Partial<AssetPrice> = {}): AssetPrice => ({
      canonicalDomain: mock.domain.A,
      canonicalId: getRandomBytes32(),
      timestamp: Math.floor(Date.now() / 1000 - 60),
      price: 1234,
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
        errorStatus?: XTransferErrorStatus;
        messageStatus?: XTransferMessageStatus;
        asset?: string;
        transferId?: string;
        messageHash?: string;
        nonce?: number;
        user?: string;
        routers?: string[];
        relayerFee?: string; // deprecated
        relayerFees?: { [asset: string]: string };
        xcall_timestamp?: number;
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
      const errorStatus: XTransferErrorStatus | undefined = overrides.errorStatus;
      const messageStatus: XTransferMessageStatus = overrides.messageStatus ?? XTransferMessageStatus.XCalled;
      const asset: string = overrides.asset ?? mock.asset.A.address;
      const transferId: string = overrides.transferId ?? getRandomBytes32();
      const nonce = overrides.nonce ?? 1234;
      const user: string = overrides.user ?? mkAddress("0xfaded");
      const routers = overrides.routers ?? [mock.address.router];
      const messageHash: string = overrides.messageHash ?? getRandomBytes32();
      const relayerFee: string = overrides.relayerFee ?? "0";
      const relayerFees: { [asset: string]: string } = overrides.relayerFees ?? {
        [constants.AddressZero]: relayerFee ?? "0",
      };

      const shouldHaveOriginDefined = true;
      const shouldHaveDestinationDefined = status && status != XTransferStatus.XCalled;
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

              relayerFees,

              errorStatus,

              messageStatus,

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
                timestamp: overrides.xcall_timestamp ?? Math.floor(Date.now() / 1000 - 60),
                gasPrice: utils.parseUnits("5", "gwei").toString(),
                gasLimit: "80000",
                blockNumber: 7654321,
                txOrigin: user,
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
                      txOrigin: user,
                      txNonce: Math.floor(Date.now() / 1000 - 30) * 10000,
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
                      txOrigin: user,
                      txNonce: Math.floor(Date.now() / 1000) * 10000,
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
      domainsHash: getRandomBytes32(),
      count: Math.floor(Date.now() / 1000),
      ...overrides,
    }),
    receivedAggregateRoot: (overrides: Partial<ReceivedAggregateRoot> = {}): ReceivedAggregateRoot => ({
      id: getRandomBytes32(),
      domain: mock.domain.A,
      root: getRandomBytes32(),
      blockNumber: Math.floor(Date.now() / 1000),
      ...overrides,
    }),
    snapshotRoot: (overrides: Partial<SnapshotRoot> = {}): SnapshotRoot => ({
      id: getRandomBytes32(),
      root: getRandomBytes32(),
      spokeDomain: +mock.domain.A,
      timestamp: Math.floor(Date.now() / 1000),
      blockNumber: Math.floor(Date.now() / 1000),
      count: 1,
      ...overrides,
    }),
    snapshot: (overrides: Partial<Snapshot> = {}): Snapshot => ({
      id: getRandomBytes32(),
      aggregateRoot: getRandomBytes32(),
      baseAggregateRoot: getRandomBytes32(),
      roots: [getRandomBytes32(), getRandomBytes32()],
      domains: [mock.domain.A, mock.domain.B],
      endOfDispute: Math.floor(Date.now() / 1000),
      proposedTimestamp: Math.floor(Date.now() / 1000),
      finalizedTimestamp: Math.floor(Date.now() / 1000),
      propagateTimestamp: Math.floor(Date.now() / 1000),
      ...overrides,
    }),
    optimisticRootFinalized: (overrides: Partial<OptimisticRootFinalized> = {}): OptimisticRootFinalized => ({
      id: getRandomBytes32(),
      aggregateRoot: getRandomBytes32(),
      timestamp: Math.floor(Date.now() / 1000),
      ...overrides,
    }),
    optimisticRootPropagated: (overrides: Partial<OptimisticRootPropagated> = {}): OptimisticRootPropagated => ({
      id: getRandomBytes32(),
      aggregateRoot: getRandomBytes32(),
      domainsHash: getRandomBytes32(),
      timestamp: Math.floor(Date.now() / 1000),
      ...overrides,
    }),
    spokeOptimisticRoot: (overrides: Partial<SpokeOptimisticRoot> = {}): SpokeOptimisticRoot => ({
      id: getRandomBytes32(),
      aggregateRoot: getRandomBytes32(),
      domain: mock.domain.A,
      rootTimestamp: Math.floor(Date.now() / 1000),
      endOfDispute: Math.floor(Date.now() / 1000),
      ...overrides,
    }),
    stableSwapPool: (overrides: Partial<StableSwapPool> = {}): StableSwapPool => ({
      key: getRandomBytes32(),
      domain: mock.domain.A,
      isActive: true,
      lpToken: getRandomAddress(),
      initialA: 200,
      futureA: 200,
      initialATime: 0,
      futureATime: 0,
      swapFee: "400000",
      adminFee: "0",
      pooledTokens: [getRandomAddress(), getRandomAddress()],
      tokenPrecisionMultipliers: ["1", "1"],
      poolTokenDecimals: [18, 18],
      balances: ["200000", "200000"],
      virtualPrice: "400000",
      invariant: "0",
      lpTokenSupply: "0",
      ...overrides,
    }),
    stableSwapExchange: (overrides: Partial<StableSwapExchange> = {}): StableSwapExchange => ({
      id: getRandomBytes32(),
      poolId: getRandomBytes32(),
      domain: mock.domain.A,
      buyer: getRandomAddress(),
      boughtId: 1,
      soldId: 0,
      tokensSold: Math.floor(Date.now() / 1000),
      tokensBought: Math.floor(Date.now() / 1000),
      balances: [200, 200],
      fee: 2,
      blockNumber: Math.floor(Date.now() / 1000),
      transactionHash: getRandomBytes32(),
      timestamp: Math.floor(Date.now() / 1000),
      nonce: Math.floor(Date.now() * 10),
      ...overrides,
    }),
    stableswapPoolEvent: (overrides: Partial<StableSwapPoolEvent> = {}): StableSwapPoolEvent => ({
      id: `add_liquidity-${getRandomBytes32()}`,
      poolId: getRandomBytes32(),
      domain: mock.domain.A,
      provider: getRandomAddress(),
      action: "Add",
      pooledTokens: [getRandomAddress(), getRandomAddress()],
      poolTokenDecimals: [18, 18],
      balances: [200, 200],
      fees: [2, 2],
      tokenAmounts: [200, 200],
      lpTokenAmount: Math.floor(Date.now() / 1000),
      lpTokenSupply: Math.floor(Date.now() / 1000),
      blockNumber: Math.floor(Date.now() / 1000),
      transactionHash: getRandomBytes32(),
      timestamp: Math.floor(Date.now() / 1000),
      nonce: Math.floor(Date.now() * 10),
      ...overrides,
    }),
    stableSwapLpTransfer: (overrides: Partial<StableSwapTransfer> = {}): StableSwapTransfer => ({
      id: `${mock.domain.A}-${getRandomBytes32()}-1`,
      poolId: getRandomBytes32(),
      domain: mock.domain.A,
      lpToken: getRandomAddress(),
      fromAddress: getRandomAddress(),
      toAddress: getRandomAddress(),
      pooledTokens: [getRandomAddress(), getRandomAddress()],
      amount: 200,
      balances: [200, 200],
      blockNumber: Math.floor(Date.now() / 1000),
      transactionHash: getRandomBytes32(),
      timestamp: Math.floor(Date.now() / 1000),
      nonce: Math.floor(Date.now() * 10),
      ...overrides,
    }),
    stableSwapLpBalance: (overrides: Partial<StableSwapLpBalance> = {}): StableSwapLpBalance => ({
      poolId: getRandomBytes32(),
      domain: mock.domain.A,
      lpToken: getRandomAddress(),
      provider: getRandomAddress(),
      balance: 200,
      lastTimestamp: Math.floor(Date.now() / 1000),
      ...overrides,
    }),
    routerDailyTVL: (overrides: Partial<RouterDailyTVL> = {}): RouterDailyTVL => ({
      id: getRandomBytes32(),
      asset: getRandomAddress(),
      router: getRandomAddress(),
      domain: mock.domain.A,
      balance: "200",
      timestamp: Math.floor(Date.now() / 1000),
      ...overrides,
    }),
    relayerFeesIncrease: (overrides: Partial<RelayerFeesIncrease> = {}): RelayerFeesIncrease => ({
      id: getRandomBytes32(),
      transferId: getRandomBytes32(),
      asset: getRandomAddress(),
      domain: mock.domain.A,
      increase: "200",
      timestamp: "1234",
      ...overrides,
    }),
    slippageUpdate: (overrides: Partial<SlippageUpdate> = {}): SlippageUpdate => ({
      id: getRandomBytes32(),
      transferId: getRandomBytes32(),
      domain: mock.domain.A,
      slippage: "200",
      timestamp: Math.floor(Date.now() / 1000),
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
      relayerProxy: function (_: number) {
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
      hubConnector: function (_: number) {
        return {
          address: mkAddress("0x444444"),
          abi: "fakeAbi()",
        };
      },
      multisend: function (_: number) {
        return {
          address: mkAddress("0x555555"),
          abi: "fakeAbi()",
        };
      },
      unwrapper: function (_: number) {
        return {
          address: mkAddress("0x666666"),
          abi: "fakeAbi()",
        };
      },
    },
  },
  snapshotDuration: 1,
  maxSafeRoots: 0,
};
