import { expect, mkBytes32 } from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";
import { execute } from "../../../src/lib/operations/execute";

import { getOperationsStub } from "../../globalTestHook";
import { mock, stubContext, encodedDataMock, requestContext } from "../../mock";

describe("Operations:Execute", () => {
  let sendExecuteFastToRelayerStub: SinonStub;
  let mockContext: any;
  beforeEach(() => {
    sendExecuteFastToRelayerStub = stub().resolves();
    getOperationsStub.returns({
      sendExecuteFastToRelayer: sendExecuteFastToRelayerStub,
    });

    mockContext = stubContext();
  });
  afterEach(() => {
    restore();
    reset();
  });
  describe("#execute", () => {
    it("should not send to the relayer if not valid ", async () => {
      const executeArgs = { ...mock.entity.executeArgs(), local: 1 };
      const transferId = mkBytes32();
      await expect(execute(executeArgs, transferId, requestContext)).to.be.rejectedWith(Error);
      expect(sendExecuteFastToRelayerStub.callCount).to.be.eq(0);
    });
    it("should send the payload to the relayer successfully!", async () => {
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      await execute(executeArgs, transferId, requestContext);
      expect(sendExecuteFastToRelayerStub.getCall(0).args[0]).to.be.deep.eq(executeArgs);
      expect(sendExecuteFastToRelayerStub.getCall(0).args[1]).to.be.deep.eq(encodedDataMock);
      expect(sendExecuteFastToRelayerStub.getCall(0).args[2]).to.be.deep.eq(transferId);
      expect(sendExecuteFastToRelayerStub.callCount).to.be.eq(1);
    });
  });
});
