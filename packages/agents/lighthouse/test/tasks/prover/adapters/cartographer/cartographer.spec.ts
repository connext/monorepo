import { expect } from "@connext/nxtp-utils";

import {
  getUnProcessedMessages,
  getSentRootMessages,
  getUnProcessedRootMessages,
} from "../../../../../src/tasks/prover/adapters/cartographer/cartographer";
import { ApiRequestFailed } from "../../../../../src/errors";
import { axiosGetStub, mockAxiosErrorResponse } from "../../../../globalTestHook";

describe("Adapters: Cartographer", () => {
  describe("#getUnProcessedMessages", () => {
    it("should error if errors", async () => {
      axiosGetStub.rejects("foo");
      await expect(getUnProcessedMessages()).to.be.rejectedWith(ApiRequestFailed);
    });

    it("should error if cartographer returns error", async () => {
      axiosGetStub.resolves(mockAxiosErrorResponse);
      await expect(getUnProcessedMessages()).to.be.rejectedWith(ApiRequestFailed);
    });

    it("should work", async () => {
      const unprocessed = await getUnProcessedMessages();
      expect(unprocessed).to.deep.eq([]);
    });
  });
  describe("#getUnProcessedRootMessages", () => {
    it("should error if errors", async () => {
      axiosGetStub.rejects("foo");
      await expect(getUnProcessedRootMessages()).to.be.rejectedWith(ApiRequestFailed);
    });

    it("should error if cartographer returns error", async () => {
      axiosGetStub.resolves(mockAxiosErrorResponse);
      await expect(getUnProcessedRootMessages()).to.be.rejectedWith(ApiRequestFailed);
    });

    it("should work", async () => {
      const unprocessed = await getUnProcessedRootMessages();
      expect(unprocessed).to.deep.eq([]);
    });
  });
  describe("#getSentRootMessages", () => {
    it("should error if errors", async () => {
      axiosGetStub.rejects("foo");
      await expect(getSentRootMessages()).to.be.rejectedWith(ApiRequestFailed);
    });

    it("should error if cartographer returns error", async () => {
      axiosGetStub.resolves(mockAxiosErrorResponse);
      await expect(getSentRootMessages()).to.be.rejectedWith(ApiRequestFailed);
    });

    it("should work", async () => {
      const unprocessed = await getSentRootMessages();
      expect(unprocessed).to.deep.eq([]);
    });
  });
});
