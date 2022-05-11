import { StoreManager } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { ChainReader } from "@connext/nxtp-txservice";
import { Logger, mkAddress } from "@connext/nxtp-utils";
import { parseEther, parseUnits } from "ethers/lib/utils";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";

import { AppContext } from "../src/lib/entities/context";
import * as SequencerFns from "../src/sequencer";
import { mock } from "./mock";
import * as operations from "../src/lib/operations";
import * as helpers from "../src/lib/helpers";

export let ctxMock: AppContext;
export let subgraphMock: SinonStubbedInstance<SubgraphReader>;
export let chainReaderMock: SinonStubbedInstance<ChainReader>;
export let getOperationsStub: SinonStub;
export let getHelpersStub: SinonStub;

export const mochaHooks = {
  async beforeEach() {
    // setup subgraph
    subgraphMock = createStubInstance(SubgraphReader);
    subgraphMock.getAssetBalance.resolves(parseEther("10000"));
    subgraphMock.getAssetBalances.resolves({ [mkAddress("0xaaa")]: parseEther("10000") });
    subgraphMock.getXCalls.resolves([
      mock.entity.xtransfer({
        originDomain: "1000",
        destinationDomain: "2000",
      }),
      mock.entity.xtransfer({
        originDomain: "1000",
        destinationDomain: "2000",
      }),
    ]);

    // setup cache
    const cacheParams = { host: "mock", port: 1234, mock: true, logger: mock.context().logger, redis: undefined };
    const cacheInstance = StoreManager.getInstance(cacheParams);

    getOperationsStub = stub(operations, "getOperations");
    getOperationsStub.returns(mock.operations);

    getHelpersStub = stub(helpers, "getHelpers");
    getHelpersStub.returns(mock.helpers);

    chainReaderMock = createStubInstance(ChainReader);
    chainReaderMock.getGasEstimate.resolves(parseUnits("1", 9));
    chainReaderMock.getGasEstimateWithRevertCode.resolves(parseUnits("1", 9));
    ctxMock = {
      adapters: {
        subgraph: subgraphMock,
        cache: cacheInstance,
        chainreader: chainReaderMock,
        contracts: mock.context().adapters.contracts,
        relayer: mock.context().adapters.relayer,
      },
      config: mock.config(),
      chainData: mock.context().chainData,
      logger: new Logger({ name: "test", level: process.env.LOG_LEVEL || "silent" }),
    };
    stub(SequencerFns, "getContext").returns(ctxMock);
  },
  afterEach() {
    restore();
    reset();
  },
};
