import { providers, Wallet, utils } from "ethers";
import { createStubInstance } from "sinon";

import { expect } from "../../src/mocks";
import {
  recoverHandleRelayerFeePayload,
  signHandleRelayerFeePayload,
  encodeHandleRelayerFeeData,
  getRandomBytes32,
} from "../../src";

const { arrayify, hexlify, solidityKeccak256 } = utils;

describe("signHandleRelayerPayload / recoverHandleRelayerFeePayload", () => {
  it("should work when there is no provider", async () => {
    const transferId = getRandomBytes32();
    const feePercentage = "1";

    const signer = Wallet.createRandom();
    const sig = await signHandleRelayerFeePayload(transferId, feePercentage, signer);

    expect(recoverHandleRelayerFeePayload(transferId, feePercentage, sig)).to.be.eq(signer.address);
  });

  it("should work when there is a provider", async () => {
    const transferId = getRandomBytes32();
    const feePercentage = "1";
    const signer = Wallet.createRandom();

    const msg = arrayify(solidityKeccak256(["bytes"], [encodeHandleRelayerFeeData(transferId, feePercentage)]));
    const provider = createStubInstance(providers.Web3Provider);
    (provider as any)._isProvider = true;
    const stubSig = await signer.signMessage(msg);
    provider.send.resolves(stubSig);

    const sig = await signHandleRelayerFeePayload(transferId, feePercentage, signer.connect(provider));
    expect(sig).to.be.deep.eq(stubSig);
    const [method, args] = provider.send.getCall(0).args;
    expect(provider.send.callCount).to.be.eq(1);
    expect(method).to.be.eq("personal_sign");
    expect(args[0].toString()).to.be.eq(hexlify(msg));
    expect(args[1]).to.be.eq(signer.address);
  });
});
