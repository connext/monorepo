import { CrossChainTxStatus } from "@connext/nxtp-utils";

import { TransactionsCache } from "./index";


export async function main(){
  const subscriptions = new Map();
  const transactions = new TransactionsCache({ url: "redis://localhost:6379/2", subscriptions: subscriptions });
  console.log(`Testing Storing Status`);

  const fakeTxId = `0xdeadbdeefdeadbeefdeadbeefdeadbeefdeadbeef ${Math.floor(Math.random() * Infinity)}`;
  const storeStatus = await transactions.storeStatus(CrossChainTxStatus.Prepared, fakeTxId);
  if (storeStatus) { console.log("stored a status"); }
  const getStatus = await transactions.getStatus(fakeTxId);


  console.log(`Status store set/get works? ${getStatus === "Prepared"}`);

  // const storeTxn
  // const getTxn
}
main();
