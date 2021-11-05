import { expect, getRandomBytes32, mkAddress } from "@connext/nxtp-utils";

import { BigNumber, providers, UnsignedTransaction, utils, Wallet } from "ethers";
import { One } from "@ethersproject/constants";
import { serialize } from "@ethersproject/transactions";
import Sinon, { reset, restore } from "sinon";

import { Web3Signer } from "../../../src/adapters/web3signer";
import { Web3SignerApi } from "../../../src/adapters/web3signer/api";

const { JsonRpcProvider } = providers;

let web3Signer: Web3Signer;
let apiStub: sinon.SinonStubbedInstance<Web3SignerApi>;
let providerStub: sinon.SinonStubbedInstance<providers.JsonRpcProvider>;

let getAddressFromPublicKeyStub: sinon.SinonStub;

const testPublicKey = "test-pub-key-123";
const testAddress = getRandomBytes32();
const testSignedData = utils.hexlify(utils.randomBytes(65));

describe("Web3Signer", () => {
  beforeEach(() => {
    apiStub = Sinon.createStubInstance(Web3SignerApi);
    apiStub.getPublicKey.resolves(testPublicKey);
    apiStub.sign.resolves(testSignedData);

    getAddressFromPublicKeyStub = Sinon.stub(Web3Signer as any, "getAddressFromPublicKey").returns(testAddress);

    providerStub = Sinon.createStubInstance(JsonRpcProvider);

    web3Signer = new Web3Signer("http://0.0.0.0:9000");
    (web3Signer as any).api = apiStub;
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#connect", () => {
    it("should set provider property", async () => {
      web3Signer.connect(providerStub);
      expect(web3Signer.provider).to.deep.eq(providerStub);
    });
  });

  describe("#getAddress", () => {
    it("happy", async () => {
      expect(web3Signer.address).to.be.undefined;
      const result = await web3Signer.getAddress();
      expect(result).to.eq(testAddress);
      // should set address if it wasn't set before
      expect(web3Signer.address).to.eq(testAddress);
      expect(getAddressFromPublicKeyStub.callCount).to.eq(1);
      expect(getAddressFromPublicKeyStub.getCall(0).args).to.deep.eq([testPublicKey]);
    });
  });

  describe("#signMessage", () => {
    it("happy", async () => {
      const message = getRandomBytes32();
      const result = await web3Signer.signMessage(message);
      expect(result).to.eq(testSignedData);
    });
  });

  describe.skip("#signTransaction", () => {
    it("happy", async () => {
      // TODO: Can't seem to stub/overwrite ethers utils, so just going to emulate target functionality here.
      const wallet = Wallet.createRandom();
      const testTransaction: providers.TransactionRequest = {
        to: mkAddress("0xbca"),
        data: getRandomBytes32(),
        gasPrice: One,
        value: BigNumber.from(10),
      };
      const tx = await utils.resolveProperties(testTransaction);
      const signature = wallet._signingKey().signDigest(utils.keccak256(serialize(<UnsignedTransaction>tx)));
      apiStub.sign.resolves(signature as any);
      const expectedSignedTx = await wallet.signTransaction(tx);

      const result = await web3Signer.signTransaction(testTransaction);
      expect(result).to.eq(expectedSignedTx);
      expect(apiStub.getPublicKey.callCount).to.eq(1);
      expect(apiStub.sign.callCount).to.eq(1);
    });
  });
});
