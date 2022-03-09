import { stub } from "sinon";
import { expect } from "chai";

import { AppContext } from "../../../src/context";
import { createMockContext, createMockCrossChainTx } from "../../globalTestHook";
import * as bindSubgraphFns from "../../../src/bindings/subgraph/index";
import { CrossChainTxStatus } from "@connext/nxtp-utils";

let context: AppContext;

describe("SubgraphBinding", () => {
  beforeEach(() => {
    context = createMockContext();
  });

  describe("#bindSubgraph", async () => {
    it("should start an interval loop that calls polling fn", async () => {
      const pollStub = stub(bindSubgraphFns, "pollSubgraph").resolves();
      // Override the poll interval to 10ms so we can test the interval loop
      bindSubgraphFns.bindSubgraph(context, 10);
      await expect(pollStub.callCount).to.eventually.be.gte(1);
    });
  });

  describe("#pollSubgraph", () => {
    it("happy: should retrieve prepared transactions from the subgraph and cache them", async () => {
      const mockInfo = {
        "1337": {
          latestBlockNumber: 1234567,
          latestNonce: 232323,
          safeConfirmations: 19,
        },
        "1338": {
          latestBlockNumber: 7654321,
          latestNonce: 454545,
          safeConfirmations: 28,
        },
      };
      context.adapters.txservice.getBlockNumber = stub().callsFake(
        (domain: string) => mockInfo[domain].latestBlockNumber,
      );
      context.adapters.cache.transactions.getLatestNonce = stub().callsFake(
        (domain: string) => mockInfo[domain].latestNonce,
      );
      context.config.chains["1337"].confirmations = mockInfo["1337"].safeConfirmations;
      context.config.chains["1338"].confirmations = mockInfo["1338"].safeConfirmations;
      const mockSubgraphResponse = [
        createMockCrossChainTx("1337", "1338", CrossChainTxStatus.Prepared),
        createMockCrossChainTx("1338", "1337", CrossChainTxStatus.Prepared),
      ];
      context.adapters.subgraph.getPreparedTransactions = stub().resolves(mockSubgraphResponse);

      await bindSubgraphFns.pollSubgraph(context);
      expect(context.adapters.txservice.getBlockNumber).to.have.been.calledOnce;
      expect(context.adapters.cache.transactions.getLatestNonce).to.have.been.calledOnce;
      expect(context.adapters.subgraph.getPreparedTransactions).to.have.been.calledOnceWithExactly(
        new Map(
          Object.entries({
            "1337": {
              maxPrepareBlockNumber: mockInfo["1337"].latestBlockNumber - mockInfo["1337"].safeConfirmations,
              latestNonce: mockInfo["1337"].latestNonce + 1,
            },
            "1338": {
              maxPrepareBlockNumber: mockInfo["1338"].latestBlockNumber - mockInfo["1338"].safeConfirmations,
              latestNonce: mockInfo["1338"].latestNonce + 1,
            },
          }),
        ),
      );
      expect(context.adapters.cache.transactions.storeTxData).to.have.been.calledOnceWithExactly(mockSubgraphResponse);
    });
  });
});
