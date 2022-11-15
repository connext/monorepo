import { BaseRequestContext, createRequestContext, expect, Logger, mock, RelayerTaskStatus } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import * as ProcessFromRootFns from "../../../../src/tasks/processFromRoot/operations/processFromRoot";
import * as MockableFns from "../../../../src/mockable";
import { processFromRootCtxMock } from "../../../globalTestHook";
import { ProcessConfigNotAvailable } from "../../../../src/tasks/processFromRoot/errors";
import { mockTaskId } from "@connext/nxtp-adapters-relayer/test/mock";
import { Relayer } from "@connext/nxtp-adapters-relayer";
import { ChainReader } from "@connext/nxtp-txservice";

describe("Operations: Propagate", () => {
  describe("#propagate", () => {
    it("should throw an error if no hub domain id", async () => {});
  });
});
