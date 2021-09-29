import { expect } from "../src/expect";
import { providers, Wallet } from "ethers";
import { arrayify, hexlify, randomBytes, solidityKeccak256 } from "ethers/lib/utils";
import { createStubInstance } from "sinon";
import { encodeFulfillData } from "../src/encode";

import { recoverFulfilledTransactionPayload, signFulfillTransactionPayload } from "../src/signatures";

describe("signFulfillTransactionPayload / recoverFulfillTransactionPayload", () => {
  it("should work when there is no provider", async () => {
    const transactionId = hexlify(randomBytes(32));
    const relayerFee = "0";
    const receivingChainId = 1337;
    const receivingChainTxManagerAddress = Wallet.createRandom().address;

    const signer = Wallet.createRandom();
    const sig = await signFulfillTransactionPayload(
      transactionId,
      relayerFee,
      receivingChainId,
      receivingChainTxManagerAddress,
      signer,
    );

    expect(
      recoverFulfilledTransactionPayload(
        transactionId,
        relayerFee,
        receivingChainId,
        receivingChainTxManagerAddress,
        sig,
      ),
    ).to.be.eq(signer.address);
  });

  it("should work when there is a provider", async () => {
    const transactionId = hexlify(randomBytes(32));
    const relayerFee = "0";
    const receivingChainId = 1337;
    const receivingChainTxManagerAddress = Wallet.createRandom().address;
    const signer = Wallet.createRandom();

    const msg = arrayify(
      solidityKeccak256(
        ["bytes"],
        [encodeFulfillData(transactionId, relayerFee, receivingChainId, receivingChainTxManagerAddress)],
      ),
    );
    const provider = createStubInstance(providers.Web3Provider);
    (provider as any)._isProvider = true;
    const stubSig = await signer.signMessage(msg);
    provider.send.resolves(stubSig);

    const sig = await signFulfillTransactionPayload(
      transactionId,
      relayerFee,
      receivingChainId,
      receivingChainTxManagerAddress,
      signer.connect(provider),
    );
    expect(sig).to.be.deep.eq(stubSig);
    const [method, args] = provider.send.getCall(0).args;
    expect(provider.send.callCount).to.be.eq(1);
    expect(method).to.be.eq("personal_sign");
    expect(args[0].toString()).to.be.eq(hexlify(msg));
    expect(args[1]).to.be.eq(signer.address);
  });
});
