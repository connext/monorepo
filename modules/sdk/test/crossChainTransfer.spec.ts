import { BigNumber, constants, Contract, providers, Wallet } from "ethers";
import { createStubInstance, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { TransactionManagerListener, TransactionPreparedEvent } from "../src/utils";
import { InvariantTransactionData, isValidBytes32, recoverFulfilledTransactionPayload } from "@connext/nxtp-utils";
import { getAddress, hexlify, randomBytes } from "ethers/lib/utils";
import { expect } from "chai";
import { listenRouterPrepare, prepare } from "../src";
import { PrepareParamType } from "../src/types";

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

describe("prepare", () => {
  let transactionManager: SinonStubbedInstance<Contract>;
  let userWeb3Provider: SinonStubbedInstance<providers.Web3Provider>;
  let prepareStub: SinonStub;

  const user = Wallet.createRandom();

  beforeEach(async () => {
    userWeb3Provider = createStubInstance(providers.Web3Provider);

    transactionManager = createStubInstance(Contract);

    prepareStub = stub();
  });

  afterEach(() => {
    // Restore all mocks
    restore();
  });

  const setupMocks = (overrides: Partial<PrepareParamType> = {}): PrepareParamType => {
    const params = {
      userWebProvider: userWeb3Provider,
      amount: "100000",
      expiry: (Date.now() + 10_000).toString(),
      sendingAssetId: Wallet.createRandom().address,
      receivingAssetId: Wallet.createRandom().address,
      receivingAddress: Wallet.createRandom().address,
      sendingChainId: 1337,
      receivingChainId: 31337,
      router: Wallet.createRandom().address,
      ...overrides,
    };

    // Set default values
    prepareStub.resolves({
      hash: "success",
      wait: (_confs: number) => {
        return { status: 1 };
      },
    });
    transactionManager.connect.returns({ prepare: prepareStub } as any);
    userWeb3Provider.getSigner.returns(user as any);
    userWeb3Provider.getNetwork.resolves({ name: "test", chainId: params.sendingChainId });
    return params;
  };

  it("should properly call prepare", async () => {
    const params = setupMocks();

    const result = await prepare(params, (transactionManager as unknown) as Contract);
    expect(result).to.be.undefined;
    expect(prepareStub.calledOnce).to.be.true;
    const [txData, amount, expiry, overrides] = prepareStub.firstCall.args;
    expect(txData).to.containSubset({
      user: user.address,
      router: getAddress(params.router),
      sendingAssetId: getAddress(params.sendingAssetId),
      receivingAssetId: getAddress(params.receivingAssetId),
      receivingAddress: getAddress(params.receivingAddress),
      callData: params.callData ?? "0x",
      sendingChainId: params.sendingChainId,
      receivingChainId: params.receivingChainId,
    });
    expect(isValidBytes32(txData.transactionId)).to.be.true;
    expect(amount.toString()).to.be.eq(params.amount);
    expect(expiry).to.be.eq(params.expiry);
    expect(overrides).to.be.deep.eq(
      params.sendingAssetId === constants.AddressZero ? { value: BigNumber.from(params.amount) } : {},
    );
  });
});

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
