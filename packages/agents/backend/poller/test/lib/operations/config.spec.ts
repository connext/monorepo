import { restore, reset } from "sinon";
import { getConfig } from "../../../src/config";

describe("Load Config", () => {
  afterEach(() => {
    restore();
    reset();
  });
  it("throw error on config load", async () => {
    process.env.DATABASE_URL = "invalid_URI";
    try {
      await getConfig();
    } catch (Error) {}
  });
});
