import { Logger } from "@connext/nxtp-utils";
import { LightHouseCache } from "../../../src";

const RedisMock = require("ioredis-mock");
const redis = new RedisMock();

describe("LighthouseCache", () => {
  const logger = new Logger({ level: "debug" });

  let cache: LightHouseCache;
  beforeEach(async () => {
    cache = new LightHouseCache({ host: "mock", port: 1234, mock: true, logger });
  });

  afterEach(async () => {
    await redis.flushall();
  });

  describe("#storeLightHouseData", () => {});
  describe("#getLightHouseData", () => {});
  describe("#storeBackupData", () => {});
  describe("#getBackupData", () => {});
  describe("#pruneLighthouseData", () => {});
  describe("#setLightHouseDataStatus", () => {});
  describe("#getLightHouseDataStatus", () => {});
  describe("#getTask", () => {});
  describe("#upsertTask", () => {});
  describe("#getSentTransfers", () => {});
});
