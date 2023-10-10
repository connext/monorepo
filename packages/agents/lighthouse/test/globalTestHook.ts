import { ChainReader } from "@connext/nxtp-txservice";
import { parseUnits } from "ethers/lib/utils";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { BaseRequestContext, Logger, RelayerType } from "@connext/nxtp-utils";
import { Relayer } from "@connext/nxtp-adapters-relayer";

import { ProverContext } from "../src/tasks/prover/context";
import { ProcessFromRootContext } from "../src/tasks/processFromRoot/context";
import { ProposeContext } from "../src/tasks/propose/context";
import { mock, mockTaskId } from "./mock";
import * as ProverFns from "../src/tasks/prover/prover";
import * as ProcessFromRootFns from "../src/tasks/processFromRoot/processFromRoot";
import * as PropagateFns from "../src/tasks/propagate/propagate";
import * as SendOutboundRootFns from "../src/tasks/sendOutboundRoot/sendOutboundRoot";
import * as ProposeFns from "../src/tasks/propose/propose";
import * as Mockable from "../src/mockable";
import { PropagateContext } from "../src/tasks/propagate/context";
import { SendOutboundRootContext } from "../src/tasks/sendOutboundRoot/context";
import { BigNumber } from "ethers";

export let proverCtxMock: ProverContext;
export let processFromRootCtxMock: ProcessFromRootContext;
export let propagateCtxMock: PropagateContext;
export let sendOutboundRootCtxMock: SendOutboundRootContext;
export let proposeCtxMock: ProposeContext;

export let chainReaderMock: SinonStubbedInstance<ChainReader>;
export let existsSyncStub: SinonStub;
export let readFileSyncStub: SinonStub;
export let sendWithRelayerWithBackupStub: SinonStub<
  [
    chainId: number,
    domain: string,
    destinationAddress: string,
    data: string,
    relayers: { instance: Relayer; apiKey: string; type: RelayerType }[],
    chainReader: ChainReader,
    logger: Logger,
    _requestContext: BaseRequestContext,
  ],
  Promise<{ taskId: string }>
>;
export let getInterfaceMock: SinonStub;
export let getBestProviderMock: SinonStub;

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

    propagateCtxMock = mock.propagateCtx();
    stub(PropagateFns, "getContext").returns(propagateCtxMock);

    sendOutboundRootCtxMock = mock.sendOuboundRootCtx();
    stub(SendOutboundRootFns, "getContext").returns(sendOutboundRootCtxMock);

    sendWithRelayerWithBackupStub = stub(Mockable, "sendWithRelayerWithBackup").resolves({
      taskId: mockTaskId,
      relayerType: RelayerType.Mock,
    });
    getInterfaceMock = stub(Mockable, "getInterface").returns({
      encodeFunctionData: () => "0xdeadbeef",
      decodeFunctionResult: () => [BigNumber.from(42)],
    } as any);

    getBestProviderMock = stub(Mockable, "getBestProvider").resolves("http://example.com");

    proposeCtxMock = mock.proposeCtx();
    stub(ProposeFns, "getContext").returns(proposeCtxMock);
  },
  afterEach() {
    restore();
    reset();
  },
};
