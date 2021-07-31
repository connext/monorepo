// import { BigNumber, Signer, Wallet } from "ethers";
// import { restore, reset, createStubInstance, SinonStubbedInstance } from "sinon";
// import { expect } from "chai";
// import pino from "pino";
// import { ok } from "neverthrow";

// import { ChainRpcProvider } from "../src/provider";
// import { Transaction } from "../src/transaction";
// import { ChainConfig, DEFAULT_CONFIG } from "../src/config";
// import { TEST_SENDER_CHAIN_ID } from "./constants";

// // TODO: main tests:
// // - isReady
// // - sendTransaction
// // - readTransaction
// // - getGasPrice
// // - getBalance
// // - estimateGas

// // TODO: Error cases to handle here (i.e. make sure ChainRpcProvider handles correctly):
// // - rpc failure
// // - provider stops responding
// // - no providers are in sync
// // - bad data ?

// const logger = pino({ level: process.env.LOG_LEVEL ?? "silent", name: "TransactionServiceTest" });

// let signer: SinonStubbedInstance<Wallet>;
// let chainProvider: ChainRpcProvider;

// describe("ChainRpcProvider", () => {
//   beforeEach(async () => {
//     const signer = createStubInstance(Wallet);
//     const chainId = TEST_SENDER_CHAIN_ID;
//     const chainConfig: ChainConfig = {
//       providers: [
//         {
//           url: "https://-------------",
//         }
//       ],
//       confirmations: 1,
//       confirmationTimeout: 10_000,
//     };
//     chainProvider = new ChainRpcProvider(
//       logger,
//       signer,
//       chainId,
//       chainConfig,
//       DEFAULT_CONFIG,
//     );
//   });

//   afterEach(() => {
//     restore();
//     reset();
//   });

//   describe("sendTransaction", () => {
//     it("happy: should send the transaction", async () => {
//       const tx = await Transaction.create(logger, chainProvider as unknown as ChainRpcProvider, tx, DEFAULT_CONFIG);
//       expect(tx.hash).to.be.a("string");
//       expect(tx.hash).to.have.length.gt(0);
//     });

//     it("should throw an error if the transaction is invalid", async () => {
      
//     });


//   });

//   describe("readTransaction", () => {

//   });

//   describe("confirmTransaction", () => {
//     it("happy: should confirm the transaction", async () => {
//       const tx = await Transaction.create(logger, chainProvider as unknown as ChainRpcProvider, tx, DEFAULT_CONFIG);
//       await chainProvider.confirmTransaction(tx.hash);
//     });

//     it("should throw an error if the transaction is invalid", async () => {
      
//     });
//   });

//   describe("getGasPrice", () => {});

//   describe("getBalance", () => {});

//   describe("estimateGas", () => {});


// });