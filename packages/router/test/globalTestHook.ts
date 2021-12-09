import { TransactionService } from "@connext/nxtp-txservice";
import {
  RouterNxtpNatsMessagingService,
  txReceiptMock,
  sigMock,
  getChainData,
  Logger,
  mkAddress,
} from "@connext/nxtp-utils";
import { RouterNxtpNatsMessagingService, txReceiptMock, sigMock, Logger } from "@connext/nxtp-utils";
import { Wallet, BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import {
  routerAddrMock,
  activeTransactionPrepareMock,
  singleChainTransactionMock,
  configMock,
  activeTransactionFulfillMock,
  chainDataMock,
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
export let isRouterContractMock: SinonStub<any, boolean>;
export const routerAddress = routerAddrMock;
export const signerAddress = mkAddress("0x123");

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
    txServiceMock.calculateGasFeeInReceivingToken.resolves(BigNumber.from(100));
    txServiceMock.calculateGasFeeInReceivingTokenForFulfill.resolves(BigNumber.from(120));
    txServiceMock.getTokenPrice.resolves(BigNumber.from(1));

    messagingMock = createStubInstance(RouterNxtpNatsMessagingService);

    contractReaderMock = {
      getActiveTransactions: stub().resolves([activeTransactionPrepareMock, activeTransactionFulfillMock]),
      getAssetBalance: stub().resolves(BigNumber.from("10001000000000000000000")),
      getTransactionForChain: stub().resolves(singleChainTransactionMock),
      getSyncRecords: stub().returns([{ synced: true, syncedBlock: 10000, latestBlock: 10000, lag: 0, uri: "" }]),
      getAssetBalances: stub().resolves([
        { assetId: configMock.swapPools[0].assets[0].assetId, amount: BigNumber.from("10001000000000000000000") },
      ]),
      getExpressiveAssetBalances: stub().resolves([
        {
          assetId: configMock.swapPools[0].assets[0].assetId,
          amount: BigNumber.from("10001000000000000000000"),
          supplied: BigNumber.from("10001000000000000000000"),
          locked: BigNumber.from(0),
        },
      ]),
    };

    contractWriterMock = {
      prepareRouterContract: stub().resolves(txReceiptMock),
      prepareTransactionManager: stub().resolves(txReceiptMock),
      fulfillRouterContract: stub().resolves(txReceiptMock),
      fulfillTransactionManager: stub().resolves(txReceiptMock),
      cancelRouterContract: stub().resolves(txReceiptMock),
      cancelTransactionManager: stub().resolves(txReceiptMock),
      removeLiquidityTransactionManager: stub().resolves(txReceiptMock),
      getRouterBalance: stub().resolves(BigNumber.from("10001000000000000000000")),
    };

    ctxMock = {
      config: configMock,
      contractReader: contractReaderMock,
      contractWriter: contractWriterMock,
      logger: new Logger({ name: "ctxMock", level: process.env.LOG_LEVEL || "silent" }),
      chainData: chainDataMock,
      messaging: messagingMock as unknown as RouterNxtpNatsMessagingService,
      txService: txServiceMock as unknown as TransactionService,
      wallet: walletMock,
      isRouterContract: undefined,
      routerAddress,
      signerAddress,
    };

    isRouterContractMock = stub(ctxMock, "isRouterContract").value(false);

    stub(RouterFns, "getContext").returns(ctxMock);
  },

  afterEach() {
    restore();
    reset();
  },
};
