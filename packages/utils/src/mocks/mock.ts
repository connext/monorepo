import { providers, constants, BigNumber, utils } from "ethers";

import {
  chainDataToMap,
  XTransfer,
  XTransferStatus,
  getRandomBytes32,
  Bid,
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
      forceSlow: false,
      receiveLocal: false,
      ...overrides,
    }),
    executeArgs: (overrides: Partial<ExecuteArgs> = {}): ExecuteArgs => ({
      params: mock.entity.callParams(),
      local: mock.asset.A.address,
      routers: [mkAddress("0x222")],
      routerSignatures: [mock.signature],
      amount: utils.parseEther("1").toString(),
      nonce: 0,
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
      transferId: getRandomBytes32(),
      origin: mock.domain.A,
      router: mock.address.router,
      fee: "0.05",
      signatures: {
        "1": getRandomBytes32(),
        "2": getRandomBytes32(),
        "3": getRandomBytes32(),
      },
      ...overrides,
    }),
    xtransfer: (
      overrides: {
        originDomain?: string;
        destinationDomain?: string;
        originChain?: string;
        destinationChain?: string;
        amount?: string;
        status?: XTransferStatus;
        asset?: string;
        transferId?: string;
        nonce?: number;
        user?: string;
        relayerFee?: string;
        routers?: string[];
      } = {},
    ): XTransfer => {
      const originDomain: string = overrides.originDomain ?? mock.domain.A;
      const destinationDomain: string = overrides.destinationDomain ?? mock.domain.B;
      const originChain: string = overrides.originChain ?? mock.chain.A;
      const destinationChain: string = overrides.destinationChain ?? mock.chain.B;
      const amount = overrides.amount ?? "1000";
      const status: XTransferStatus | undefined = overrides.status;
      const asset: string = overrides.asset ?? mock.asset.A.address;
      const transferId: string = overrides.transferId ?? getRandomBytes32();
      const nonce = overrides.nonce ?? 1234;
      const user: string = overrides.user ?? mkAddress("0xfaded");
      const relayerFee = overrides.relayerFee ?? "12345";
      const routers = overrides.routers ?? [mock.address.router];

      const shouldHaveOriginDefined = !!relayerFee;
      const shouldHaveDestinationDefined = !!status;
      const isReconciledOnly = !shouldHaveOriginDefined && status === XTransferStatus.Reconciled;

      return {
        // Meta
        idx: "0",
        transferId,
        nonce: !isReconciledOnly ? nonce : undefined,
        destinationDomain,
        originDomain,

        // Call Params
        xparams: !isReconciledOnly
          ? {
              to: user,
              callData: "0x",
              forceSlow: false,
              receiveLocal: false,
            }
          : undefined,

        origin: shouldHaveOriginDefined
          ? {
              chain: originChain,

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
                relayerFee,
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
                status === XTransferStatus.Executed || status === XTransferStatus.Completed
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
                status === XTransferStatus.Reconciled || status === XTransferStatus.Completed
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
