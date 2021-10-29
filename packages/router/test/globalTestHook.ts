import { TransactionService } from "@connext/nxtp-txservice";
import { RouterNxtpNatsMessagingService, txReceiptMock, sigMock, getChainData, Logger } from "@connext/nxtp-utils";
import { Wallet, BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import {
  routerAddrMock,
  activeTransactionPrepareMock,
  singleChainTransactionMock,
  configMock,
  activeTransactionFulfillMock,
} from "./utils";
import { Context } from "../src/router";
import { ContractReader } from "../src/adapters/subgraph";
import { ContractWriter } from "../src/adapters/contract";
import * as RouterFns from "../src/router";

export let txServiceMock: SinonStubbedInstance<TransactionService>;
export let messagingMock: SinonStubbedInstance<RouterNxtpNatsMessagingService>;
export let contractReaderMock: ContractReader;
export let contractWriterMock: ContractWriter;
export let ctxMock: Context;

export const mochaHooks = {
  async beforeEach() {
    const walletMock = createStubInstance(Wallet);
    (walletMock as any).address = routerAddrMock; // need to do this differently bc the function doesnt exist on the interface
    walletMock.getAddress.resolves(routerAddrMock);
    walletMock.signMessage.resolves(sigMock);

    txServiceMock = createStubInstance(TransactionService);
    txServiceMock.getBalance.resolves(parseEther("1"));
    txServiceMock.sendTx.resolves(txReceiptMock);
    txServiceMock.getDecimalsForAsset.resolves(18);
    txServiceMock.getBlockTime.resolves(Math.floor(Date.now() / 1000));
    txServiceMock.getTransactionReceipt.resolves(txReceiptMock);

    messagingMock = createStubInstance(RouterNxtpNatsMessagingService);

    contractReaderMock = {
      getActiveTransactions: stub().resolves([activeTransactionPrepareMock, activeTransactionFulfillMock]),
      getAssetBalance: stub().resolves(BigNumber.from("10001000000000000000000")),
      getTransactionForChain: stub().resolves(singleChainTransactionMock),
      getSyncRecord: stub().returns([{ synced: true, syncedBlock: 10000, latestBlock: 10000, lag: 0, uri: "" }]),
    };

    contractWriterMock = {
      cancel: stub().resolves(txReceiptMock),
      fulfill: stub().resolves(txReceiptMock),
      prepare: stub().resolves(txReceiptMock),
      removeLiquidity: stub().resolves(txReceiptMock),
    };

    ctxMock = {
      config: configMock,
      contractReader: contractReaderMock,
      contractWriter: contractWriterMock,
      logger: new Logger({ name: "ctxMock", level: process.env.LOG_LEVEL || "silent" }),
      chainData: await getChainData(),
      messaging: messagingMock as unknown as RouterNxtpNatsMessagingService,
      txService: txServiceMock as unknown as TransactionService,
      wallet: walletMock,
    };

    stub(RouterFns, "getContext").returns(ctxMock);
  },

  afterEach() {
    restore();
    reset();
  },
};
