import { constants, Contract, providers, Wallet } from "ethers";
import { createStubInstance, restore, SinonStubbedInstance, stub } from "sinon";
import { TransactionManagerListener } from "../src/utils";
import { InvariantTransactionData, recoverFulfilledTransactionPayload } from "@connext/nxtp-utils";
import { hexlify, randomBytes } from "ethers/lib/utils";
import { listenRouterPrepare } from "@connext/nxtp-sdk";
import { expect } from "chai";

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
    const txData = getTransactionData({
      receivingChainId,
      user: user.address,
    });

    // Setup mocks
    userWeb3Provider.getNetwork.resolves({ chainId: receivingChainId, name: "test" });
    userWeb3Provider.getSigner.returns(user as any);

    listener.waitFor.resolves({ txData, amount, expiry, blockNumber, caller: txData.router });

    const fulfillStub = stub().resolves({ hash: "success", wait: () => Promise.resolve() });
    contract.fulfill = fulfillStub;

    const obj = {
      fulfill: fulfillStub,
    };

    listener.getTransactionManager.returns({
      ...obj,
      connect: (_signer => obj) as any,
    } as any);

    // Make call
    const response = await listenRouterPrepare(
      { txData, relayerFee, userWebProvider: userWeb3Provider },
      (listener as unknown) as TransactionManagerListener,
    );
    expect(response).to.be.undefined;
    expect(fulfillStub.calledOnce).to.be.true;
    const [txDataUsed, relayerFeeUsed, sig] = fulfillStub.firstCall.args;
    expect(txDataUsed).to.be.deep.eq(txData);
    expect(relayerFeeUsed).to.be.eq(relayerFee);
    const recovered = recoverFulfilledTransactionPayload(txData, relayerFee, sig);
    expect(recovered.toLowerCase()).to.be.eq(user.address.toLowerCase());
  });
});
