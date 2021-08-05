import { expect } from "@connext/nxtp-utils";
import { convertTransactionToTxData, Subgraph } from "../src/subgraph";
import { transactionSubgraphMock, txDataMock } from "./utils";

describe.only("subgraph", () => {
  it("happy convertTransactionToTxData", () => {
    const res = convertTransactionToTxData(transactionSubgraphMock);
    expect(res).to.include(txDataMock);
  });

  describe("class Subgraph", () => {
    it("happy constructor", () => {
      const res = createEvts();
    });
  });
});
