import { ChainReader } from "@connext/nxtp-txservice";
import { parseUnits } from "ethers/lib/utils";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { ProverContext } from "../src/tasks/prover/context";
import { ProcessFromRootContext } from "../src/tasks/processFromRoot/context";
import { mock } from "./mock";
import * as ProverFns from "../src/tasks/prover/prover";
import * as ProcessFromRootFns from "../src/tasks/processFromRoot/processFromRoot";
import * as Mockable from "../src/mockable";

export let proverCtxMock: ProverContext;
export let processFromRootCtxMock: ProcessFromRootContext;

export let chainReaderMock: SinonStubbedInstance<ChainReader>;
export let existsSyncStub: SinonStub;
export let readFileSyncStub: SinonStub;

export const mockAxiosErrorResponse = { isAxiosError: true, code: 500, response: "Invalid fee" };
export const mockAxiosSuccessResponse = { isAxiosError: false, code: 200, data: [] };
export const mockGelatoSuccessResponse = { taskId: 1, msg: "success" };
export const mockGelatoSDKSuccessResponse = { taskId: "1" };

export const mochaHooks = {
  async beforeEach() {
    existsSyncStub = stub(Mockable, "existsSync");
    readFileSyncStub = stub(Mockable, "readFileSync");

    chainReaderMock = createStubInstance(ChainReader);
    chainReaderMock.getGasEstimate.resolves(parseUnits("1", 9));
    chainReaderMock.getGasEstimateWithRevertCode.resolves(parseUnits("1", 9));

    proverCtxMock = mock.proverCtx();
    stub(ProverFns, "getContext").returns(proverCtxMock);

    processFromRootCtxMock = mock.processFromRootCtx();
    stub(ProcessFromRootFns, "getContext").returns(processFromRootCtxMock);
  },
  afterEach() {
    restore();
    reset();
  },
};
