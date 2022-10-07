import { ChainReader } from "@connext/nxtp-txservice";
import { Logger, mkAddress } from "@connext/nxtp-utils";
import { parseUnits } from "ethers/lib/utils";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { ProverContext } from "../src/tasks/prover/context";
import { ProcessFromRootContext } from "../src/tasks/processFromRoot/context";
import { mock } from "./mock";
import * as ProverFns from "../src/tasks/prover/prover";
import * as ProcessFromRootFns from "../src/tasks/processFromRoot/processFromRoot";
import * as Mockable from "../src/mockable";
import { AxiosRequestConfig } from "axios";

export let proverCtxMock: ProverContext;
export let processFromRootCtxMock: ProcessFromRootContext;

export let chainReaderMock: SinonStubbedInstance<ChainReader>;
export let gelatoSendStub: SinonStub<any[], any>;
export let gelatoSDKSendStub: SinonStub<any[], any>;
export let isChainSupportedByGelatoStub: SinonStub<any[], any>;
export let getGelatoRelayerStub: SinonStub<any[], any>;
export let existsSyncStub: SinonStub;
export let readFileSyncStub: SinonStub;
export let axiosGetStub: SinonStub<[url: string, config?: AxiosRequestConfig<unknown> | undefined], Promise<unknown>>;

export const mockAxiosErrorResponse = { isAxiosError: true, code: 500, response: "Invalid fee" };
export const mockAxiosSuccessResponse = { isAxiosError: false, code: 200, data: [] };
export const mockGelatoSuccessResponse = { taskId: 1, msg: "success" };
export const mockGelatoSDKSuccessResponse = { taskId: "1" };

export const mochaHooks = {
  async beforeEach() {
    gelatoSendStub = stub(Mockable, "gelatoSend").resolves(mockGelatoSuccessResponse);
    gelatoSDKSendStub = stub(Mockable, "gelatoSDKSend").resolves(mockGelatoSDKSuccessResponse);
    isChainSupportedByGelatoStub = stub(Mockable, "isChainSupportedByGelato").resolves(true);
    getGelatoRelayerStub = stub(Mockable, "getGelatoRelayerAddress").resolves(mkAddress("0xaaa"));
    existsSyncStub = stub(Mockable, "existsSync");
    readFileSyncStub = stub(Mockable, "readFileSync");
    axiosGetStub = stub(Mockable, "axiosGet").resolves(mockAxiosSuccessResponse);

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
