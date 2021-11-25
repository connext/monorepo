import { waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

import { Wallet } from "ethers";
import { TransactionManager } from "@connext/nxtp-contracts";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";

import { deployContract } from "./utils";

// import types
import { RouterFactory } from "../typechain";

const createFixtureLoader = waffle.createFixtureLoader;
describe("Router Contract", function () {
  const [wallet, router, , user, receiver, , other] = waffle.provider.getWallets() as Wallet[];
  let routerFactory: RouterFactory;
  let transactionManagerReceiverSide: TransactionManager;
  const receivingChainId = 1338;

  const fixture = async () => {
    transactionManagerReceiverSide = await deployContract<TransactionManager>(
      TransactionManagerArtifact,
      receivingChainId,
    );

    routerFactory = await deployContract<RouterFactory>("RouterFactory", transactionManagerReceiverSide.address);

    return {
      routerFactory,
      transactionManagerReceiverSide,
    };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, router, user, receiver, other]);
  });

  beforeEach(async function () {
    ({ transactionManagerReceiverSide, routerFactory } = await loadFixture(fixture));
  });

  describe("constructor", async () => {
    it("should deploy", async () => {
      expect(routerFactory.address).to.be.a("string");
    });

    it("should set transactionManagerAddress", async () => {
      expect(await routerFactory.transactionManager()).to.eq(transactionManagerReceiverSide.address);
    });
  });
});
