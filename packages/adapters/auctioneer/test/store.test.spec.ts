
import { expect } from "chai";
import Redis from "ioredis";

import { TransactionsCache } from "@connext/nxtp-adapters-cache/src/lib/caches";
import { Subscriptions } from "@connext/nxtp-adapters-cache/src/lib/entities";


async function main(){
  const subscriptions: Subscriptions = new Map();
  const transactions = new TransactionsCache({ url: "redis://localhost:6379/2", subscriptions: subscriptions });
  console.log(`Testing Storing txData`);
  // const storeSet = await transactions.storeStatus({ CrossChainStatus, bid: { tprop: "test" } });
  
}
main();