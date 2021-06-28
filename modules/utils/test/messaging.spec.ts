import { generateMessagingInbox, MetaTxPayload, NatsNxtpMessagingService, NxtpMessaging } from "@connext/nxtp-utils";
import { constants, Wallet } from "ethers";
import { expect } from "chai";

describe("publish / subscribe", () => {
  let messagingA: NxtpMessaging;
  const signerA = Wallet.createRandom();

  let messagingB: NxtpMessaging;
  const signerB = Wallet.createRandom();

  beforeEach(async () => {
    messagingA = new NatsNxtpMessagingService({ signer: signerA });
    await messagingA.connect();

    messagingB = new NatsNxtpMessagingService({ signer: signerB });
    await messagingB.connect();
  });

  afterEach(async () => {
    await messagingA.disconnect();
    await messagingB.disconnect();
  });

  it("should properly subscribe to and send messages", async () => {
    // const subject = "*.metatx";
    const _inbox = generateMessagingInbox();
    const responsePromise = new Promise(async resolve => {
      await messagingB.subscribe(_inbox, data => resolve(data));
    });

    const payload: MetaTxPayload = {
      chainId: 1,
      to: constants.AddressZero,
      data: "0x",
      relayerFee: "0",
    };
    await messagingA.publish(_inbox, payload);
    // expect(inbox).to.be.ok;
    // expect(inbox).to.be.eq(_inbox);

    const result = await responsePromise;
    console.log("result: ", result);
    expect(result).to.be.ok;
  });
});
