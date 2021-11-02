import { Web3Signer } from "../../../src/adapters/web3signer";
import { Wallet } from "ethers";
import { expect } from "@connext/nxtp-utils";

describe.only("Web3Signer", () => {
  it("should run", async () => {
    const web3Signer = new Web3Signer("http://0.0.0.0:9000");

    const message = "hello";

    const signerAddress = await web3Signer.getAddress();
    const response = await web3Signer.signMessage(message);

    // console.log(response);

    const wallet = Wallet.fromMnemonic("<mnemonic goes here>");
    const cRes = await wallet.signMessage(message);

    expect(signerAddress).to.be.eq(wallet.address);
    expect(response).to.be.eq(cRes);
  });
});
