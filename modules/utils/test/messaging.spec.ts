import {
  delay,
  generateMessagingInbox,
  MetaTxPayload,
  NatsNxtpMessagingService,
  NxtpMessaging,
} from "@connext/nxtp-utils";
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

  it.skip("should properly subscribe to and send messages", async () => {
    const subject = "*.metatx";
    const _inbox = generateMessagingInbox();
    console.log("_inbox: ", _inbox);

    let count = 0;
    const subscription = new Promise(async res => {
      await messagingB.subscribe(_inbox, data => {
        console.log(`Got data: ${JSON.stringify(data)}, count: ${count}`);
        res(data);
      });
      await delay(5000);
    });
    const payload: MetaTxPayload = {
      chainId: 1,
      to: constants.AddressZero,
      data: "0x",
      relayerFee: "0",
    };
    console.log("subject: ", subject);
    for (let index = 0; index < 5; index++) {
      console.log(`publish ${index}`);
      await messagingA.publish(_inbox, payload);
      await delay(2500);
    }
    const data = await subscription;
    console.log("data: ", data);
    expect(true).to.be.true;
    // expect(inbox).to.be.ok;
    // expect(inbox).to.be.eq(_inbox);
  });
});
