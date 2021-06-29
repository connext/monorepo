import { BigNumber, constants, Contract, providers, Wallet } from "ethers";
import { createStubInstance, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import {
  getRandomBytes32,
  InvariantTransactionData,
  isValidBytes32,
  recoverFulfilledTransactionPayload,
} from "@connext/nxtp-utils";
import { getAddress, hexlify, randomBytes } from "ethers/lib/utils";
import { expect } from "chai";
import pino from "pino";

import { prepare, PrepareParams } from "../src";
import { TransactionPreparedEvent } from "../src/utils";

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

const logger = pino({ level: "error" });

describe("prepare", () => {
  let transactionManager: SinonStubbedInstance<Contract>;
  let sendingProvider: SinonStubbedInstance<providers.Web3Provider>;
  let prepareStub: SinonStub;

  const user = Wallet.createRandom();

  beforeEach(async () => {
    sendingProvider = createStubInstance(providers.Web3Provider);
    transactionManager = createStubInstance(Contract);

    prepareStub = stub();
  });

  afterEach(() => {
    // Restore all mocks
    restore();
  });

  const setupMocks = (overrides: Partial<PrepareParams> = {}): PrepareParams => {
    const params = {
      sendingProvider,
      amount: "100000",
      expiry: (Date.now() + 10_000).toString(),
      sendingAssetId: Wallet.createRandom().address,
      receivingAssetId: Wallet.createRandom().address,
      receivingAddress: Wallet.createRandom().address,
      sendingChainId: 31337,
      receivingChainId: 1337,
      router: Wallet.createRandom().address,
      transactionId: getRandomBytes32(),
      signer: user,
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
    sendingProvider.getSigner.returns(user as any);
    sendingProvider.getNetwork.resolves({ name: "test", chainId: params.sendingChainId });
    return params;
  };

  it("should properly call prepare", async () => {
    const params = setupMocks();

    const result = await prepare(params, (transactionManager as unknown) as Contract, logger);
    expect(result).to.be.ok;
    expect(prepareStub.calledOnce).to.be.true;
    const [txData, amount, expiry, encodedBid, bidSignature, overrides] = prepareStub.firstCall.args;
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
    expect(encodedBid).to.be.eq("0x");
    expect(bidSignature).to.be.eq("0x");
    expect(overrides).to.be.deep.eq(
      params.sendingAssetId === constants.AddressZero ? { value: BigNumber.from(params.amount) } : {},
    );
  });
});

describe("handleReceiverPrepare", () => {
  let contract: SinonStubbedInstance<Contract>;
  let receivingProvider: SinonStubbedInstance<providers.Web3Provider>;
  let fulfillStub: SinonStub;

  beforeEach(async () => {
    receivingProvider = createStubInstance(providers.Web3Provider);

    contract = createStubInstance(Contract);

    fulfillStub = stub();
  });

  afterEach(() => {
    // Restore all mocks
    restore();
  });

  const setupMocks = (
    overrides: Partial<InvariantTransactionData> = {},
    amount = "100000",
    expiry = (Date.now() + 10_000).toString(),
    blockNumber = 10,
    user: Wallet = Wallet.createRandom(),
  ): { event: TransactionPreparedEvent; user: Wallet } => {
    const txData = getTransactionData({
      receivingChainId: 31337,
      user: user.address,
      ...overrides,
    });

    // Setup mocks
    receivingProvider.getNetwork.resolves({ chainId: txData.receivingChainId, name: "test" });

    fulfillStub.resolves({ hash: "success", wait: () => Promise.resolve({ status: 1, transactionHash: "success" }) });
    contract.connect.returns({ fulfill: fulfillStub } as any);

    return {
      event: {
        txData: { ...txData, amount, expiry, blockNumber },
        encodedBid: "0x",
        bidSignature: "0x",
        caller: txData.router,
        chainId: txData.receivingChainId,
      },
      user,
    };
  };

  it.skip("should properly handle an emitted event with matching txId", async () => {
    const relayerFee = "100";
    const { event, user } = setupMocks();

    // Make call
    // const response = await handleReceiverPrepare(
    //   {
    //     txData: event.txData,
    //     relayerFee,
    //     receivingProvider,
    //     signer: user,
    //   },
    //   (contract as unknown) as Contract,
    //   logger,
    // );

    // Verify sig is properly broadcast
    // TODO: update for messaging
    // expect(response).to.be.undefined;
    expect(fulfillStub.calledOnce).to.be.true;
    const [txDataUsed, relayerFeeUsed, sig] = fulfillStub.firstCall.args;
    expect(txDataUsed).to.be.deep.eq(event.txData);
    expect(relayerFeeUsed).to.be.eq(relayerFee);
    const recovered = recoverFulfilledTransactionPayload(event.txData, relayerFee, sig);
    expect(recovered.toLowerCase()).to.be.eq(user.address.toLowerCase());
  });
});
