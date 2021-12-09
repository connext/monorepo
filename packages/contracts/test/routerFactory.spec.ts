import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

import { Wallet, providers, Contract, constants } from "ethers";
import { TransactionManager } from "@connext/nxtp-contracts";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import RouterArtifact from "@connext/nxtp-contracts/artifacts/contracts/Router.sol/Router.json";

import { deployContract, assertReceiptEvent } from "./utils";

// import types
import { RouterFactory } from "../typechain";

import { getContractError } from "../src";

const { AddressZero } = constants;
const createFixtureLoader = waffle.createFixtureLoader;
describe("RouterFactory.sol", function () {
  const [wallet, routerSigner, recipient, other] = waffle.provider.getWallets() as Wallet[];
  let routerFactory: RouterFactory;

  let transactionManagerReceiverSide: TransactionManager;

  const receivingChainId = 1338;

  const fixture = async () => {
    transactionManagerReceiverSide = await deployContract<TransactionManager>(
      TransactionManagerArtifact,
      receivingChainId,
    );

    routerFactory = await deployContract<RouterFactory>("RouterFactory", wallet.address);

    return {
      routerFactory,
      transactionManagerReceiverSide,
    };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, routerSigner, recipient, other]);
  });

  beforeEach(async function () {
    ({ transactionManagerReceiverSide, routerFactory } = await loadFixture(fixture));

    const initTx = await routerFactory.connect(wallet).init(transactionManagerReceiverSide.address);
    await initTx.wait();
  });

  describe("constructor", async () => {
    it("should deploy", async () => {
      expect(routerFactory.address).to.be.a("string");
    });

    it("should get transactionManagerAddress", async () => {
      expect(await routerFactory.transactionManager()).to.eq(transactionManagerReceiverSide.address);
    });
  });

  describe("create router", () => {
    it("should error if init wasn't done", async () => {
      const instance = await deployContract<RouterFactory>("RouterFactory", wallet.address);

      await expect(
        instance.connect(routerSigner).createRouter(routerSigner.address, recipient.address),
      ).to.be.revertedWith(getContractError("routerFactory_createRouter: TRANSACTION_MANAGER_EMPTY"));
    });

    it("should error if routerSigner is empty", async () => {
      await expect(routerFactory.connect(routerSigner).createRouter(AddressZero, recipient.address)).to.be.revertedWith(
        getContractError("routerFactory_createRouter: ROUTER_SIGNER_EMPTY"),
      );
    });

    it("should error if receipient is empty", async () => {
      await expect(
        routerFactory.connect(routerSigner).createRouter(routerSigner.address, AddressZero),
      ).to.be.revertedWith(getContractError("routerFactory_createRouter: RECIPIENT_EMPTY"));
    });

    it("should create router", async () => {
      const computedRouterAddress = await routerFactory.getRouterAddress(routerSigner.address);

      const tx: providers.TransactionResponse = await routerFactory
        .connect(routerSigner)
        .createRouter(routerSigner.address, recipient.address);

      const receipt = await tx.wait();
      expect(receipt.status).to.be.eq(1);

      await assertReceiptEvent(receipt, "RouterCreated", {
        router: computedRouterAddress,
        routerSigner: routerSigner.address,
        recipient: recipient.address,
        transactionManager: transactionManagerReceiverSide.address,
      });

      const routerInstance = new Contract(computedRouterAddress, RouterArtifact.abi, ethers.provider);

      expect(await routerInstance.transactionManager()).to.be.eq(transactionManagerReceiverSide.address);
      expect(await routerInstance.recipient()).to.be.eq(recipient.address);
      expect(await routerInstance.routerSigner()).to.be.eq(routerSigner.address);
    });
  });
});
