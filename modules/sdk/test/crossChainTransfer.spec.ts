import { constants, Contract, providers, Wallet } from "ethers";
import { createStubInstance, restore, SinonStubbedInstance } from "sinon";
import { TransactionManagerListener } from "../src/utils";
import { InvariantTransactionData } from "@connext/nxtp-utils";
import { hexlify, randomBytes } from "ethers/lib/utils";
import { listenRouterPrepare } from "@connext/nxtp-sdk";

const getTransactionData = (txOverrides: Partial<InvariantTransactionData> = {}): InvariantTransactionData => {
  const transaction = {
    user: Wallet.createRandom().address,
    router: Wallet.createRandom().address,
    sendingAssetId: constants.AddressZero,
    receivingAssetId: constants.AddressZero,
    receivingAddress: Wallet.createRandom().address,
    callData: "0x",
    transactionId: hexlify(randomBytes(32)),
    sendingChainId: 1337,
    receivingChainId: 31337,
    ...txOverrides,
  };

  return transaction;
};

describe("prepare", () => {});

describe.only("listenRouterPrepare", () => {
  // TODO: manager mocks failing :(
  let listener: SinonStubbedInstance<TransactionManagerListener>;
  let contract: SinonStubbedInstance<Contract>;
  let userWeb3Provider: SinonStubbedInstance<providers.Web3Provider>;

  beforeEach(async () => {
    userWeb3Provider = createStubInstance(providers.Web3Provider);

    listener = createStubInstance(TransactionManagerListener);

    contract = createStubInstance(Contract);
  });

  afterEach(() => {
    // Restore all mocks
    restore();
  });

  it("should properly handle an emitted event with matching txId", async () => {
    const receivingChainId = 31337;
    const relayerFee = "100";
    const amount = "100000";
    const expiry = (Date.now() + 10_000).toString();
    const blockNumber = 10;
    const user = Wallet.createRandom();
    console.log("user", user);
    console.log("user._isSigner", user._isSigner);
    const txData = getTransactionData({
      receivingChainId,
      user: user.address,
    });

    // Setup mocks
    listener.establishListeners.resolves();
    userWeb3Provider.getNetwork.resolves({ chainId: receivingChainId, name: "test" });
    userWeb3Provider.getSigner.resolves(user);
    listener.waitFor.resolves({ txData, amount, expiry, blockNumber, caller: txData.router });
    contract.fulfill = (...args: any) => new Promise(resolve => resolve({ args, hash: "0xhash" }));

    // Make call
    const response = await listenRouterPrepare({ txData, relayerFee, userWebProvider: userWeb3Provider });
    expect(response).toBeDefined;
  });
});
