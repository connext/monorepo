import { expect } from "@connext/nxtp-utils";
import { stub, SinonStub, restore, reset } from "sinon";
import * as GraphclientFns from "../../../src/lib/helpers/graphclient";
import * as ParserFns from "../../../src/lib/helpers/parse";
import { execute } from "../../../src/lib/helpers/execute";
import { RuntimeError } from "../../../src/lib/errors";
import { mockResponse } from "../../mock";

describe("Helpers:Client", () => {
  describe("#execute", () => {
    let executeXQueryStub: SinonStub;
    beforeEach(() => {
      executeXQueryStub = stub(GraphclientFns, "executeXQuery");
      stub(ParserFns, "xquery").returns(mockResponse);
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("happy: should execute a crosschain query", async () => {
      executeXQueryStub.resolves({ msg: "success" });
      const document = { query: "mock" };
      const res = await execute(document);
      expect(res).to.be.deep.eq(mockResponse);
    });
    it("happy: should execute a crosschain query with variables", async () => {
      executeXQueryStub.resolves({ msg: "success" });
      const document = { query: "mock" };
      const variables = { blocknumber: 100000 };
      const res = await execute(document, variables);
      expect(res).to.be.deep.eq(mockResponse);
    });
    it("throws runtime error if execute fails", async () => {
      executeXQueryStub.throws(new Error("Oops, Executing the query failed!"));
      const document = { query: "mock" };
      const variables = { blocknumber: 100000 };
      await expect(execute(document, variables)).to.be.rejectedWith(RuntimeError);
    });
  });
});
