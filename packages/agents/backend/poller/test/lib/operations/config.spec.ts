import { restore, reset } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { getConfig } from "../../../src/config";

describe("Load Config", () => {
  afterEach(() => {
    restore();
    reset();
  });
  it("throw error on config load", async () => {
    process.env.DATABASE_URL = "invalid_URI";
    await expect(getConfig()).to.eventually.be.rejectedWith(Error);
  });
  it("throw error on invalid config file path", async () => {
    process.env.BACKEND_CONFIG_FILE = "./missing_config_path.json";
    await expect(getConfig()).to.eventually.be.rejectedWith(Error);
  });
});
