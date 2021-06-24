import { constants, Contract, providers, Wallet } from "ethers";
import { createStubInstance, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { TransactionManagerListener, TransactionPreparedEvent } from "../src/utils";
import { InvariantTransactionData, recoverFulfilledTransactionPayload } from "@connext/nxtp-utils";
import { hexlify, randomBytes } from "ethers/lib/utils";
import { expect } from "chai";
import { listenRouterPrepare } from "../src";

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

describe.only("prepare", () => {});

describe("listenRouterPrepare", () => {
  let listener: SinonStubbedInstance<TransactionManagerListener>;
  let contract: SinonStubbedInstance<Contract>;
  let userWeb3Provider: SinonStubbedInstance<providers.Web3Provider>;
  let fulfillStub: SinonStub;

  beforeEach(async () => {
    userWeb3Provider = createStubInstance(providers.Web3Provider);

    listener = createStubInstance(TransactionManagerListener);

    contract = createStubInstance(Contract);

    fulfillStub = stub();
  });

  afterEach(() => {
    // Restore all mocks
    restore();
  });

  const setupMocks = (
    overrides: Partial<InvariantTransactionData> = {},
    amount: string = "100000",
    expiry = (Date.now() + 10_000).toString(),
    blockNumber: number = 10,
    user: Wallet = Wallet.createRandom(),
  ): { event: TransactionPreparedEvent; user: Wallet } => {
    const txData = getTransactionData({
      receivingChainId: 31337,
      user: user.address,
      ...overrides,
    });

    // Setup mocks
    userWeb3Provider.getNetwork.resolves({ chainId: txData.receivingChainId, name: "test" });
    userWeb3Provider.getSigner.returns(user as any);

    listener.waitFor.resolves({ txData, amount, expiry, blockNumber, caller: txData.router });

    fulfillStub.resolves({ hash: "success", wait: () => Promise.resolve() });
    contract.fulfill = fulfillStub;

    const obj = {
      fulfill: fulfillStub,
    };

    listener.getTransactionManager.returns({
      ...obj,
      connect: (_signer => obj) as any,
    } as any);
    return { event: { txData, amount, expiry, blockNumber, caller: txData.router }, user };
  };

  it("should properly handle an emitted event with matching txId", async () => {
    const relayerFee = "100";
    const { event, user } = setupMocks();

    // Make call
    const response = await listenRouterPrepare(
      { txData: event.txData, relayerFee, userWebProvider: userWeb3Provider },
      (listener as unknown) as TransactionManagerListener,
    );

    // Verify sig is properly broadcast
    // TODO: update for messaging
    expect(response).to.be.undefined;
    expect(fulfillStub.calledOnce).to.be.true;
    const [txDataUsed, relayerFeeUsed, sig] = fulfillStub.firstCall.args;
    expect(txDataUsed).to.be.deep.eq(event.txData);
    expect(relayerFeeUsed).to.be.eq(relayerFee);
    const recovered = recoverFulfilledTransactionPayload(event.txData, relayerFee, sig);
    expect(recovered.toLowerCase()).to.be.eq(user.address.toLowerCase());
  });
});
