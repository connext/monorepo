// import { BigNumber, constants, Contract, providers, Wallet } from "ethers";
// import { createStubInstance, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
// import {
//   InvariantTransactionData,
//   isValidBytes32,
//   mkAddress,
//   mkBytes32,
//   PrepareParams,
//   recoverFulfilledTransactionPayload,
//   TransactionPreparedEvent,
// } from "@connext/nxtp-utils";
// import { expect } from "chai";
// import pino from "pino";

// import { prepare } from "../src/crossChainTransfer";
// import { createEvts } from "../src/sdk";
// import { IERC20Minimal, TransactionManager } from "../../contracts/typechain";

// const getTransactionData = (txOverrides: Partial<InvariantTransactionData> = {}): InvariantTransactionData => {
//   const transaction: InvariantTransactionData = {
//     user: mkAddress("0xa"),
//     router: mkAddress("0xb"),
//     sendingAssetId: mkAddress("0xc"),
//     receivingAssetId: mkAddress("0xd"),
//     receivingAddress: mkAddress("0xe"),
//     transactionId: mkBytes32("0xa"),
//     callDataHash: mkBytes32("0xb"),
//     callTo: mkAddress("0xf"),
//     sendingChainFallback: mkAddress("0xaa"),
//     sendingChainId: 1337,
//     receivingChainId: 31337,
//     ...txOverrides,
//   };

//   return transaction;
// };

// const logger = pino({ level: "error" });

// describe("prepare", () => {
//   let transactionManager: SinonStubbedInstance<Contract>;
//   let erc20: SinonStubbedInstance<Contract>;
//   let sendingProvider: SinonStubbedInstance<providers.Web3Provider>;
//   let prepareStub: SinonStub;

//   const user = Wallet.createRandom();

//   beforeEach(async () => {
//     sendingProvider = createStubInstance(providers.Web3Provider);
//     transactionManager = createStubInstance(Contract);
//     erc20 = createStubInstance(Contract);

//     prepareStub = stub();
//   });

//   afterEach(() => {
//     // Restore all mocks
//     restore();
//   });

//   const setupMocks = (overrides: Partial<PrepareParams> = {}): PrepareParams => {
//     const params: PrepareParams = {
//       bidSignature: "0x",
//       encodedBid: "0x",
//       expiry: Date.now() + 10_000,
//       amount: "100000",
//       encryptedCallData: "0x",
//       txData: {
//         user: mkAddress("0xa"),
//         router: mkAddress("0xb"),
//         sendingAssetId: mkAddress("0xc"),
//         receivingAssetId: mkAddress("0xd"),
//         receivingAddress: mkAddress("0xe"),
//         callTo: mkAddress("0xf"),
//         sendingChainFallback: mkAddress("0xaa"),
//         transactionId: mkBytes32("0xa"),
//         callDataHash: mkBytes32("0xb"),
//         sendingChainId: 1337,
//         receivingChainId: 31337,
//       },
//       ...overrides,
//     };

//     // Set default values
//     prepareStub.resolves({
//       hash: "success",
//       wait: (_confs: number) => {
//         return { status: 1 };
//       },
//     });
//     transactionManager.connect.returns({ prepare: prepareStub } as any);
//     erc20.connect.returns({
//       allowance: () => Promise.resolve(constants.Zero),
//       approve: () =>
//         Promise.resolve({
//           hash: "success",
//           wait: (_confs: number) => {
//             return { status: 1 };
//           },
//         }),
//     } as any);
//     sendingProvider.getSigner.returns(user as any);
//     sendingProvider.getNetwork.resolves({ name: "test", chainId: params.txData.sendingChainId });
//     return params;
//   };

//   it("should properly call prepare", async () => {
//     const params = setupMocks();
//     params.txData.user = user.address;

//     const result = await prepare(
//       params,
//       transactionManager as unknown as TransactionManager,
//       user,
//       createEvts(),
//       logger,
//       erc20 as unknown as IERC20Minimal,
//     );
//     expect(result).to.be.ok;
//     expect(prepareStub.calledOnce).to.be.true;
//     const [txData, amount, expiry, encryptedCallData, encodedBid, bidSignature, userSignature, overrides] =
//       prepareStub.firstCall.args;
//     expect(txData).to.deep.contain({
//       user: params.txData.user,
//       router: params.txData.router,
//       sendingAssetId: params.txData.sendingAssetId,
//       receivingAssetId: params.txData.receivingAssetId,
//       receivingAddress: params.txData.receivingAddress,
//       callDataHash: params.txData.callDataHash ?? "0x",
//       sendingChainId: params.txData.sendingChainId,
//       receivingChainId: params.txData.receivingChainId,
//     });
//     expect(isValidBytes32(txData.transactionId)).to.be.true;
//     expect(amount.toString()).to.be.eq(params.amount);
//     expect(expiry).to.be.eq(params.expiry);
//     expect(encodedBid).to.be.eq("0x");
//     expect(bidSignature).to.be.eq("0x");
//     expect(encryptedCallData).to.be.eq("0x");
//     expect(userSignature).to.be.eq("0x");
//     expect(overrides).to.be.deep.eq(
//       params.txData.sendingAssetId === constants.AddressZero ? { value: BigNumber.from(params.amount) } : { value: 0 },
//     );
//   });
// });

// describe("handleReceiverPrepare", () => {
//   let contract: SinonStubbedInstance<Contract>;
//   let receivingProvider: SinonStubbedInstance<providers.Web3Provider>;
//   let fulfillStub: SinonStub;

//   beforeEach(async () => {
//     receivingProvider = createStubInstance(providers.Web3Provider);

//     contract = createStubInstance(Contract);

//     fulfillStub = stub();
//   });

//   afterEach(() => {
//     // Restore all mocks
//     restore();
//   });

//   const setupMocks = (
//     overrides: Partial<InvariantTransactionData> = {},
//     amount = "100000",
//     expiry = Date.now() + 10_000,
//     preparedBlockNumber = 10,
//     encryptedCallData = "0x",
//     user: Wallet = Wallet.createRandom(),
//   ): { event: TransactionPreparedEvent; user: Wallet } => {
//     const txData = getTransactionData({
//       receivingChainId: 31337,
//       user: user.address,
//       ...overrides,
//     });

//     // Setup mocks
//     receivingProvider.getNetwork.resolves({ chainId: txData.receivingChainId, name: "test" });

//     fulfillStub.resolves({ hash: "success", wait: () => Promise.resolve({ status: 1, transactionHash: "success" }) });
//     contract.connect.returns({ fulfill: fulfillStub } as any);

//     return {
//       event: {
//         encryptedCallData,
//         txData: { ...txData, amount, expiry, preparedBlockNumber },
//         encodedBid: "0x",
//         bidSignature: "0x",
//         caller: txData.router,
//       },
//       user,
//     };
//   };

//   it.skip("should properly handle an emitted event with matching txId", async () => {
//     const relayerFee = "100";
//     const { event, user } = setupMocks();

//     // Make call
//     // const response = await handleReceiverPrepare(
//     //   {
//     //     txData: event.txData,
//     //     relayerFee,
//     //     receivingProvider,
//     //     signer: user,
//     //   },
//     //   (contract as unknown) as Contract,
//     //   logger,
//     // );

//     // Verify sig is properly broadcast
//     // TODO: update for messaging
//     // expect(response).to.be.undefined;
//     expect(fulfillStub.calledOnce).to.be.true;
//     const [txDataUsed, relayerFeeUsed, sig] = fulfillStub.firstCall.args;
//     expect(txDataUsed).to.be.deep.eq(event.txData);
//     expect(relayerFeeUsed).to.be.eq(relayerFee);
//     const recovered = recoverFulfilledTransactionPayload(event.txData.transactionId, relayerFee, sig);
//     expect(recovered.toLowerCase()).to.be.eq(user.address.toLowerCase());
//   });
// });
