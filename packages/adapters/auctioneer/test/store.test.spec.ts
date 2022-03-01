
import { expect } from "chai";
import { TransactionsCache } from "@connext/nxtp-adapters-cache/src/lib/caches";
import { Subscriptions } from "@connext/nxtp-adapters-cache/src/lib/entities";

describe('Sequencer::Store Test', async () => {
  const subscriptions: Subscriptions = new Map();
  const transactions = new TransactionsCache({ url: "redis://localhost:6379", subscriptions: subscriptions });
  await transactions.storeStatus({nxtpId:"0xdeadbeef", bid:{tprop:"test"}});
})