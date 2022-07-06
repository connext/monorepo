import { ChainReader } from "@connext/nxtp-txservice";
import { Logger, mkAddress } from "@connext/nxtp-utils";
import { parseEther, parseUnits } from "ethers/lib/utils";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";

import * as LightHouseFns from "../src/lighthouse";
import { AppContext } from "../src/lib/entities/context";
import { mock } from "./mock";
import * as operations from "../src/lib/operations";
import * as helpers from "../src/lib/helpers";

export let ctxMock: AppContext;
export let chainReaderMock: SinonStubbedInstance<ChainReader>;
export let getOperationsStub: SinonStub;
export let getHelpersStub: SinonStub;

export const mochaHooks = {
  async beforeEach() {
    getOperationsStub = stub(operations, "getOperations");
    getOperationsStub.returns(mock.operations);

    getHelpersStub = stub(helpers, "getHelpers");
    getHelpersStub.returns(mock.helpers);

    chainReaderMock = createStubInstance(ChainReader);
    chainReaderMock.getGasEstimate.resolves(parseUnits("1", 9));
    chainReaderMock.getGasEstimateWithRevertCode.resolves(parseUnits("1", 9));
    ctxMock = {
      adapters: {
        chainreader: chainReaderMock,
        contracts: mock.context().adapters.contracts,
        relayer: mock.context().adapters.relayer,
      },
      config: mock.config(),
      chainData: mock.context().chainData,
      logger: new Logger({ name: "test", level: process.env.LOG_LEVEL || "silent" }),
    };
    stub(LightHouseFns, "getContext").returns(ctxMock);
  },
  afterEach() {
    restore();
    reset();
  },
};
