import { ChainReader } from "@connext/nxtp-txservice";
import { Logger, mkAddress } from "@connext/nxtp-utils";
import { parseUnits } from "ethers/lib/utils";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { ProverContext } from "../src/tasks/prover/context";
import { mock } from "./mock";
import * as ProverFns from "../src/tasks/prover/prover";
import * as Mockable from "../src/mockable";

export let proverCtxMock: ProverContext;
export let chainReaderMock: SinonStubbedInstance<ChainReader>;
export let gelatoSendStub: SinonStub;
export let isChainSupportedByGelatoStub: SinonStub;
export let getGelatoRelayerStub: SinonStub;
export let existsSyncStub: SinonStub;
export let readFileSyncStub: SinonStub;

export const mockAxiosErrorResponse = { isAxiosError: true, code: 500, response: "Invalid fee" };
export const mockAxiosSuccessResponse = { taskId: 1, msg: "success" };

export const mochaHooks = {
  async beforeEach() {
    gelatoSendStub = stub(Mockable, "gelatoSend").resolves(mockAxiosSuccessResponse);
    isChainSupportedByGelatoStub = stub(Mockable, "isChainSupportedByGelato").resolves(true);
    getGelatoRelayerStub = stub(Mockable, "getGelatoRelayerAddress").resolves(mkAddress("0xaaa"));
    existsSyncStub = stub(Mockable, "existsSync");
    readFileSyncStub = stub(Mockable, "readFileSync");

    chainReaderMock = createStubInstance(ChainReader);
    chainReaderMock.getGasEstimate.resolves(parseUnits("1", 9));
    chainReaderMock.getGasEstimateWithRevertCode.resolves(parseUnits("1", 9));
    proverCtxMock = {
      adapters: {
        chainreader: chainReaderMock,
        contracts: mock.context().adapters.contracts,
        relayer: mock.context().adapters.relayer,
        cartographer: mock.context().adapters.cartographer,
      },
      config: mock.config(),
      chainData: mock.context().chainData,
      logger: new Logger({ name: "test", level: process.env.LOG_LEVEL || "silent" }),
    };
    stub(ProverFns, "getContext").returns(proverCtxMock);
  },
  afterEach() {
    restore();
    reset();
  },
};
