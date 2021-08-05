import { expect } from "../../utils/dist";
import { getEnvConfig, getConfig } from "../src/config";

describe("Config", () => {
  describe("getEnvConfig", () => {
    it("should read config from default filepath", () => {
      let res;
      let error;

      try {
        res = getEnvConfig();
      } catch (e) {
        error = e;
      }

      expect(error).to.be.undefined;
    });
  });
  describe("getConfig", () => {
    it("should getEnvConfig", () => {
      let res;
      let error;

      try {
        res = getConfig();
      } catch (e) {
        error = e;
      }

      expect(error).to.be.undefined;
    });
  });
});
