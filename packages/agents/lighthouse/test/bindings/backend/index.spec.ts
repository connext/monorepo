import { expect, delay } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";

import { stubContext, stubOperations } from "../../mock";
import { getReconciledTransactions } from "../../../src/bindings";

describe("Bindings:Backend", () => {
  let mockContext: any;

  beforeEach(() => {
    mockContext = stubContext();
  });
  describe("#getReconciledTransactions", () => {
    it("happy: should work ", async () => {
      // Override the poll interval to 10ms so we can test the interval loop

      const res = await getReconciledTransactions();
      console.log(res);
      // TODO: slight race here?
    });
  });
});
