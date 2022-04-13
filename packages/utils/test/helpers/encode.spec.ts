import { expect } from "@connext/nxtp-utils";
import { keccak256 } from "ethers/lib/utils";

import {
  encodeHandleRelayerFeeData,
  encodeReconcileData,
  getReconciledHash,
  getRandomBytes32,
  mkAddress,
  ReconciledTransaction,
  ExternalCall,
  encodeExternalCallData,
  getExternalCallHash,
} from "../../src";

const reconcileTranasaction: ReconciledTransaction = {
  externalHash: getRandomBytes32(),
  local: mkAddress("0xaaa"),
  amount: "1",
  recipient: mkAddress("0xbbb"),
};

const externalCallData: ExternalCall = {
  to: mkAddress("0xaaa"),
  callData: getRandomBytes32(),
};
describe("Helpers:Encode", () => {
  describe("#encodeHandleRelayerFeeData", () => {
    it("happy case", () => {
      const transferId = getRandomBytes32();
      const feePercentage = "1";
      let encodedData = encodeHandleRelayerFeeData(transferId, feePercentage);
      encodedData = encodedData.replace(/^0x/, "");
      expect(encodedData.length).to.be.eq(128);
      expect(encodedData[127]).to.be.eq("1");
    });
  });
  describe("#encodeReconcileData", () => {
    it("should error if the reconcile transaction is corrupted", () => {
      const reconcileTx2: ReconciledTransaction = {
        externalHash: "0x1",
        local: mkAddress("0xaaa"),
        amount: "1",
        recipient: mkAddress("0xbbb"),
      };
      expect(() => encodeReconcileData(reconcileTx2)).to.throw();
    });
    it("happy case", () => {
      expect(() => encodeReconcileData(reconcileTranasaction)).to.not.throw();
    });
  });
  describe("#getReconciledHash", () => {
    it("happy case", () => {
      const reconcileHash = getReconciledHash(reconcileTranasaction);
      const keccak256Result = keccak256(encodeReconcileData(reconcileTranasaction));
      expect(reconcileHash).to.be.eq(keccak256Result);
    });
  });
  describe("#encodeExternalCallData", () => {
    it("should error if the externalCall data is corrupted", () => {
      const externalCallData2: ExternalCall = {
        to: "0xaaa",
        callData: getRandomBytes32(),
      };
      expect(() => encodeExternalCallData(externalCallData2)).to.throw();
    });
    it("happy case", () => {
      expect(() => encodeExternalCallData(externalCallData)).to.not.throw();
    });
  });
  describe("#getExternalCallHash", () => {
    it("happy case", () => {
      expect(getExternalCallHash(externalCallData)).to.be.eq(keccak256(encodeExternalCallData(externalCallData)));
    });
  });
});
