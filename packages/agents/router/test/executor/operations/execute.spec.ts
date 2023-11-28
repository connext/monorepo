import { expect, mkBytes32 } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { execute } from "../../../src/tasks/executor/operations";

import { mock } from "../../mock";
import * as SequencerFns from "../../../src/tasks/executor/operations/sequencer";
import { DomainNotSupported } from "../../../src/errors";

const encodedDataMock = "0xabcde";
describe("Operations:Execute", () => {
  let sendExecuteFastToRelayerStub: SinonStub;
  beforeEach(() => {
    sendExecuteFastToRelayerStub = stub(SequencerFns, "sendExecuteSlowToSequencer").resolves();
  });
  describe("#execute", () => {
    it("should not send to the relayer if not valid ", async () => {
      const executeArgs = { ...mock.entity.executeArgs(), routers: ["0x"] };
      const transferId = mkBytes32();
      await execute(executeArgs, transferId);
      expect(sendExecuteFastToRelayerStub.callCount).to.be.eq(0);
    });
    it("should throw DomainNotSupported if not configured", async () => {
      const executeArgs = { ...mock.entity.executeArgs(), params: { originDomain: "111", destinationDomain: "222" } };
      const transferId = mkBytes32();
      await execute(executeArgs, transferId);
      expect(sendExecuteFastToRelayerStub.callCount).to.be.eq(0);
    });
    it("should send the payload to the relayer successfully!", async () => {
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      await execute(executeArgs, transferId);
      expect(sendExecuteFastToRelayerStub.getCall(0).args[0]).to.be.deep.eq(executeArgs);
      expect(sendExecuteFastToRelayerStub.getCall(0).args[1]).to.be.deep.eq(encodedDataMock);
      expect(sendExecuteFastToRelayerStub.getCall(0).args[2]).to.be.deep.eq(transferId);
      expect(sendExecuteFastToRelayerStub.callCount).to.be.eq(1);
    });
  });
});
