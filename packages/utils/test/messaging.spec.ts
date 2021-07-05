// import { RouterNxtpNatsMessagingService, UserNxtpNatsMessagingService } from "@connext/nxtp-utils";
// import { Wallet } from "ethers";

// describe("publish / subscribe", () => {
//   let messagingA: UserNxtpNatsMessagingService;
//   const signerA = Wallet.createRandom();

//   let messagingB: RouterNxtpNatsMessagingService;
//   const signerB = Wallet.createRandom();

//   beforeEach(async () => {
//     messagingA = new UserNxtpNatsMessagingService({ signer: signerA });
//     await messagingA.connect();

//     messagingB = new RouterNxtpNatsMessagingService({ signer: signerB });
//     await messagingB.connect();
//   });

//   afterEach(async () => {
//     await messagingA.disconnect();
//     await messagingB.disconnect();
//   });
// });
