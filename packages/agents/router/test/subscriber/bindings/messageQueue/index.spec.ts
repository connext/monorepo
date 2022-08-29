import { expect } from "@connext/nxtp-utils";

import { bindMessageQueue } from "../../../../src/tasks/subscriber/bindings/messageQueue";
import { mockSubContext } from "../../../globalTestHook";
import { XCALL_MESSAGE_TYPE, XCALL_QUEUE } from "../../../../src/setup";

describe("Bindings:MessageQueue", () => {
  describe("#bindMessageQueue", async () => {
    it("binds queue", async () => {
      await bindMessageQueue();
      expect(mockSubContext.adapters.mqClient.handle).to.be.calledOnceWith({
        queue: XCALL_QUEUE,
        type: XCALL_MESSAGE_TYPE,
      });

      expect(mockSubContext.adapters.mqClient.startSubscription).to.be.calledOnceWithExactly(XCALL_QUEUE);
    });
  });
});
