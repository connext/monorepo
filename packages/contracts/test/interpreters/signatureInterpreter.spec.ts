import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { Wallet } from "ethers";
import { deployContract } from "../utils";
import { SignatureInterpreter } from "../../typechain";
use(solidity);

describe.skip("SignatureInterpreter.sol", () => {
  const createFixtureLoader = waffle.createFixtureLoader;
  const [wallet, other] = waffle.provider.getWallets() as Wallet[];

  let signatureInterpreter: SignatureInterpreter;

  const fixture = async () => {
    signatureInterpreter = await deployContract<SignatureInterpreter>("SignatureInterpreter");
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before(async () => {
    loadFixture = createFixtureLoader([wallet, other]);
  });

  beforeEach(async () => {
    await loadFixture(fixture);
  });

  describe("shouldFulfill", () => {
    it("should fail if the transaction manager id is not the sending or receiving chainId", async () => {});
    it("should return true if user signed", async () => {});
    it("should return false if user did not sign", async () => {});
  });

  describe("shouldCancel", () => {
    it("should fail if the transaction manager id is not the sending or receiving chainId", async () => {});
    it("should return true if user signed", async () => {});
    it("should return false if user did not sign", async () => {});
  });
});
