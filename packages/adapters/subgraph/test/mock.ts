import { chainDataToMap, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { stub, SinonStub, restore, reset } from "sinon";
import { SubgraphMap } from "../src/lib/entities";
import * as Reader from "../src/reader";

export const mockChainData = chainDataToMap([
  {
    name: "Rinkeby Testnet",
    chainId: 4,
    domainId: "1111",
    network: "rinkeby",
  },
  {
    name: "Goerli Testnet",
    chainId: 5,
    domainId: "3331",
    network: "goerli",
  },
  {
    name: "Local Testnet",
    chainId: 65555,
    domainId: "5555555555555",
    network: "localtest",
  },
]);
export const mockResponse: Map<string, any[]> = new Map();
mockResponse.set("1337", ["happy1337"]);
mockResponse.set("1338", ["happy1338"]);

const mockMetaData = {
  transferId: mkBytes32("0xaaa"),
  nonce: "0",
  originDomain: "1111",
  destinationDomain: "3331",
};

const mockCallData = {
  to: mkAddress("0x1"),
  callData: "0x",
  callback: mkAddress("0xaaa"),
  callbackFee: "0",
  forceSlow: false,
  recovery: mkAddress("0x1"),
  receiveLocal: false,
  slippageTol: "0",
  agent: "foo",
  relayerFee: "1",
};

export const mockOriginTransferEntity = {
  ...mockMetaData,
  ...mockCallData,
  chainId: 4,
  transactingAsset: mkAddress("0x11"),
  transactingAmount: "100",
  bridgedAsset: mkAddress("0x12"),
  bridgedAmount: "100",
  caller: mkAddress("0x2"),
  transactionHash: mkBytes32("0xbbb"),
  timestamp: "11111111",
  gasPrice: "10000000000",
  gasLimit: "1000000",
  blockNumber: 5000,
  originMinOut: "123",
  destinationMinOut: "456",
};

export const mockDestinationTransferEntity = {
  ...mockMetaData,
  ...mockCallData,
  chainId: 42,
  status: "Executed",
  routers: [{ id: mkAddress("0x111") }, { id: mkAddress("0x112") }],
  transactingAsset: mkAddress("0x11"),
  transactingAmount: "100",
  localAsset: mkAddress("0x12"),
  localAmount: "100",
  executedTransactionHash: mkBytes32("0xaaa"),
  originSender: mkAddress("0x13"),
  executedCaller: mkAddress("0x14"),
  executedTimestamp: "1000000",
  executedGasPrice: "10000000000",
  executedGasLimit: "1000000",
  executedBlockNumber: 5000,
  reconciledCaller: mkAddress("0x15"),
  reconciledTransactionHash: mkBytes32("0xbbb"),
  reconciledTimestamp: "1000000",
  reconciledGasPrice: "10000000000",
  reconciledGasLimit: "1000000",
  reconciledBlockNumber: 5000,
  destinationMinOut: "456",
};

const defaultContext: { config: SubgraphMap } = {
  config: {
    sources: {
      "1111": { domain: "1111", prefix: "rinkeby" },
      "3331": { domain: "3331", prefix: "goerli" },
    },
    supported: { "1111": true, "3331": true, "5555555555555": false },
  },
};
export let mockContext: any;
export let getContextStub: SinonStub;
// Stub getContext to return the mock context above.
export const stubContext = (_context?: { config: SubgraphMap }) => {
  mockContext = _context ?? defaultContext;
  try {
    getContextStub.restore();
  } catch (e) {}
  try {
    getContextStub = stub(Reader, "getContext").callsFake(() => {
      return mockContext;
    });
  } catch (e) {}
  return mockContext;
};
