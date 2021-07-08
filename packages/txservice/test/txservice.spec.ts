import { providers, Signer, BigNumber } from "ethers";
import { AddressZero, One, Zero } from "@ethersproject/constants";
import { mkHash, mkAddress } from "@connext/nxtp-utils";
import Sinon, { restore, reset, createStubInstance, SinonStubbedInstance, stub } from "sinon";
import { expect } from "chai";
import pino from "pino";

import { TransactionService } from "../src/txservice";
import { MinimalTransaction } from "../src/types";
import { TransactionSigner } from "../src/signer";
import { ChainRpcProvider } from "../src/provider";

const { JsonRpcProvider } = providers;

type TransactionReceipt = providers.TransactionReceipt;
type TransactionResponse = providers.TransactionResponse;

let signer: SinonStubbedInstance<Signer>;
let txService: TransactionService;
let provider1337: SinonStubbedInstance<providers.JsonRpcProvider>;

const tx: MinimalTransaction = {
  chainId: 1337,
  to: AddressZero,
  from: AddressZero,
  data: "0x",
  value: Zero,
};

const txResponse: TransactionResponse = {
  chainId: 1337,
  confirmations: 1,
  data: "0x",
  from: AddressZero,
  gasLimit: One,
  gasPrice: One,
  hash: mkHash(),
  nonce: 1,
  value: Zero,
  wait: () => Promise.resolve({} as TransactionReceipt),
};

const txReceipt: TransactionReceipt = {
  blockHash: mkHash("0xabc"),
  blockNumber: 123,
  byzantium: true,
  confirmations: 1,
  contractAddress: mkAddress("0xa"),
  cumulativeGasUsed: BigNumber.from(21000),
  from: txResponse.from,
  gasUsed: BigNumber.from(21000),
  logs: [],
  logsBloom: "0x",
  to: mkAddress("0xbbb"),
  transactionHash: txResponse.hash,
  transactionIndex: 1,
  status: 1,
  effectiveGasPrice: One,
  type: 0,
};

const log = pino({ level: "debug", name: "TransactionServiceTest" });
describe("TransactionService unit test", () => {
  beforeEach(() => {
    signer = createStubInstance(TransactionSigner);
    signer.connect.returns(signer as any);
    (signer as any)._isSigner = true;

    const _chainProvider = createStubInstance(ChainRpcProvider);
    Object.setPrototypeOf(ChainRpcProvider, Sinon.stub().callsFake(() => _chainProvider));
    const _coreProvider = createStubInstance(JsonRpcProvider);
    (_chainProvider as any).provider = _coreProvider;
    _coreProvider.sendTransaction.resolves(txResponse);
    _coreProvider.waitForTransaction.resolves(txReceipt);
    provider1337 = _coreProvider;

    _chainProvider.sendTransaction.resolves({ response: txResponse, success: true });
    _chainProvider.readTransaction.resolves({ receipt: txReceipt, success: true });

    const chains = {
      "1337": {
        providers: [
          { url: "https://fakeurl.com" },
          // { url: "" },
        ],
        confirmations: 1,
      },
      "1338": {
        providers: [{ url: "https://fakeurl.com" }],
        confirmations: 1,
      },
    };

    txService = new TransactionService(log, signer, { chains });
    (signer as any).provider = provider1337;
    signer.sendTransaction.resolves(txResponse);
    (txService as any).getProvider = () => _chainProvider;
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("sendTx", () => {
    // beforeEach(() => {

    // });

    // Error cases to handle:
    // rpc failure
    // provider stops responding
    // no providers are in sync
    // reaches max gas price
    // nonce is expired
    //

    // it("errors if cannot get a signer", async () => {

    // });

    // it("errors if cannot get provider", async () => {

    // });

    // it("if receipt status == 0, errors out", async () => {

    // });

    // it("retries transaction with higher gas price", async () => {

    // });

    // it("stops trying to send if at max gas price", async () => {

    // });

    it("happy: confirmation on first loop", async () => {
      const result = await txService.sendTx(1337, tx);

      expect(signer.sendTransaction.callCount).eq(1);
      const sendTransactionCall = signer.sendTransaction.getCall(0);
      expect(sendTransactionCall.args[0]).eq(tx);

      expect(result).to.deep.eq(txReceipt);
    });
  });

  describe("readTx", () => {
    // it.skip("happy: confirmation on first loop", async () => {
    //   const result = await txService.sendTx(1337, tx);
    //   expect(signer.sendTransaction.callCount).eq(1);
    //   const sendTransactionCall = signer.sendTransaction.getCall(0);
    //   expect(sendTransactionCall.args[0]).eq(tx);
    //   expect(result).to.deep.eq(txReceipt);
    // });
  });
});
