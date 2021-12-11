import { randomInt } from "crypto";
import { SinonStub, stub } from "sinon";

import { expect, Logger } from "../../../utils/dist";
import { SyncProvider } from "../../src/shared";
import { TEST_ERROR, TEST_SENDER_CHAIN_ID } from "../utils";

const logger = new Logger({
  level: process.env.LOG_LEVEL ?? "silent",
  name: "SyncProviderTest",
});

describe("SyncProvider", () => {
  let provider: SyncProvider;

  beforeEach(() => {
    provider = new SyncProvider(
      {
        url: "http://------------------",
      },
      TEST_SENDER_CHAIN_ID,
      100,
      logger.forcedLevel === "debug",
    );
  });

  it("has correct default values", () => {
    // Expected default values.
    expect(provider.synced).to.be.true;
    expect(provider.syncedBlockNumber).to.be.eq(-1);
    expect(provider.lag).to.be.eq(0);
    expect(provider.priority).to.be.eq(0);
    expect(provider.cps).to.be.eq(0);
    expect(provider.avgExecTime).to.be.eq(0);
    expect(provider.reliability).to.be.eq(0);
  });

  describe("#sync", () => {
    let testBlockNumber = randomInt(999999999999);
    let getBlockNumberStub: SinonStub;
    beforeEach(() => {
      getBlockNumberStub = stub(provider, "getBlockNumber");
      getBlockNumberStub.resolves(testBlockNumber);
    });

    it("should retrieve current block number", async () => {
      await provider.sync();
      expect(getBlockNumberStub.calledOnce).to.be.true;
      expect(provider.syncedBlockNumber).to.be.equal(testBlockNumber);
    });

    it("should throw if getBlockNumber throws", async () => {
      getBlockNumberStub.rejects(TEST_ERROR);
      await expect(provider.sync()).to.be.rejectedWith(TEST_ERROR);
    });
  });
});
