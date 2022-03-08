import { task } from "hardhat/config";
import { NomadContext, NomadMessage, Annotated } from "@nomad-xyz/sdk";
import { providers, Contract } from "ethers";
import { NOMAD_DEPLOYMENTS } from "../constants";
// import * as contexts from "./registerContext";
// import {printStatus} from "./print";

// in-repo implementation of:
// https://github.com/nomad-xyz/nomad-monorepo/blob/main/typescript/nomad-monitor/src/trace.ts

// interface TraceInput {
//   chain: string;
//   context: NomadContext;
//   transactionHash: string;
//   messageHash?: string;
//   leafIndex?: number;
// }

// async function singleFromTransactionHash(
//   provider: providers.JsonRpcProvider,
//   nameOrDomain: string | number,
//   transactionHash: string,
// ): Promise<NomadMessage> {
//   const receipt = await provider.getTransactionReceipt(transactionHash);
//   if (!receipt) {
//     throw new Error(`No receipt for ${transactionHash} on ${nameOrDomain}`);
//   }
//   return NomadMessage.singleFromReceipt(context, nameOrDomain, receipt);
// }

// function singleFromReceipt(
//   // context: NomadContext,
//   nameOrDomain: string | number,
//   receipt: providers.TransactionReceipt,
// ): NomadMessage {
//   const messages: NomadMessage[] = fromReceipt(context, nameOrDomain, receipt);
//   if (messages.length !== 1) {
//     throw new Error("Expected single Dispatch in transaction");
//   }
//   return messages[0];
// }

function fromReceipt(
  provider: providers.JsonRpcProvider,
  domain: number,
  receipt: providers.TransactionReceipt,
  homeAddr: string,
): NomadMessage[] {
  const messages: NomadMessage[] = [];
  const home = new Contract(homeAddr);

  for (const log of receipt.logs) {
    try {
      const parsed = home.parseLog(log);
      if (parsed.name === "Dispatch") {
        const dispatch = parsed as any;
        // dispatch.getBlock = () => {
        //   return provider.getBlock(log.blockHash);
        // };
        // dispatch.getTransaction = () => {
        //   return provider.getTransaction(log.transactionHash);
        // };
        // dispatch.getTransactionReceipt = () => {
        //   return provider.getTransactionReceipt(log.transactionHash);
        // };

        // const annotated = new Annotated<any, any>(domain, receipt, dispatch, true);
        // annotated.event.blockNumber = annotated.receipt.blockNumber;
        // const message = new NomadMessage(context, annotated);
        messages.push(dispatch);
      }
    } catch (e) {
      console.log("An error occured while getting NomadMessage from Receipt", e);
      continue;
    }
  }
  return messages;
}

// async function traceTransfer(context: NomadContext, origin: string, transactionHash: string) {
//   console.log(`Trace ${transactionHash} on ${origin}`);

//   const message = await NomadMessage.singleFromTransactionHash(context, origin, transactionHash);
//   console.log(`Leaf Index: ${message.leafIndex}`);
//   const status = await message.events();
//   // printStatus(context, status);
// }

export default task("track-messages", "See the status of a nomad message")
  .addParam(
    "transaction",
    "Transaction hash where there has been a nomad message sent joined by commas (i.e. txHash1,txHash2,..)",
  )
  .addOptionalParam("messageHash", "Identifier of the message on nomad")
  .addOptionalParam("leafIndex", "Index of the message leaf in root")
  .setAction(async ({ transaction, messageHash, leafIndex }, { getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("transaction: ", transaction);
    console.log("namedAccounts: ", namedAccounts);
    console.log("messageHash", messageHash);
    console.log("leafIndex", leafIndex);

    // Get the receipt
    const receipt = await ethers.provider.getTransactionReceipt(transaction);
    if (!receipt) {
      throw new Error(`Could not find receipt for ${transaction}`);
    }

    // Get the domain
    const network = await ethers.provider.getNetwork();
    const nomadConfig = NOMAD_DEPLOYMENTS.get(network.chainId);
    if (!nomadConfig) {
      throw new Error(`No nomad config for ${network.chainId}`);
    }

    // Trace the message
    const message = fromReceipt(ethers.provider, nomadConfig.domain, receipt, nomadConfig.home);
    console.log("message", message);
  });
