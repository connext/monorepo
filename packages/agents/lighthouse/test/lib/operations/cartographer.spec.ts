import axios from "axios";
import { expect, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";
import { ctxMock, getOperationsStub } from "../../globalTestHook";

import { requestContext, stubContext } from "../../mock";

describe("Operations:Cartographer", () => {
  let mockContext: any;
  let axiosGetStub: SinonStub;
  beforeEach(() => {
    axiosGetStub = stub(axios, "get");
    mockContext = stubContext();
  });
  afterEach(() => {
    restore();
    reset();
  });
  describe("#pollCartographer", () => {});
  describe("#getReconciledTransactions", () => {});
});
