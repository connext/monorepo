import { task } from "hardhat/config";
import { NomadMessage, Annotated, dev, mainnet, NomadContext, NomadStatus } from "@nomad-xyz/sdk";
import { AnnotatedLifecycleEvent, MessageStatus } from "@nomad-xyz/sdk/nomad";
import { providers, Contract } from "ethers";
import { NOMAD_DEPLOYMENTS } from "../constants";

import Home from "../../artifacts/contracts/nomad-core/contracts/Home.sol/Home.json";
import { JsonRpcProvider } from "@ethersproject/providers";
import config from "../../hardhat.config";

// in-repo implementation of:
// https://github.com/nomad-xyz/nomad-monorepo/blob/main/typescript/nomad-monitor/src/trace.ts

const STATUS_TO_STRING = {
  [MessageStatus.Dispatched]: "Dispatched on Home",
  [MessageStatus.Included]: "Included in Home Update",
  [MessageStatus.Relayed]: "Relayed to Replica",
  [MessageStatus.Processed]: "Processed",
};

function quietEvent(context: NomadContext, lifecyleEvent: AnnotatedLifecycleEvent) {
  const { domain, receipt } = lifecyleEvent;
  const domainName = context.resolveDomainName(domain);
  if (!domainName) {
    throw new Error("I have no name");
  }
  return {
    event: lifecyleEvent.eventName!,
    domainName,
    blockNumber: receipt.blockNumber,
    transactionHash: receipt.transactionHash,
  };
}

function printStatus(context: NomadContext, nomadStatus: NomadStatus) {
  const { status, events } = nomadStatus;
  const printable = {
    status: STATUS_TO_STRING[status],
    events: events.map((event: any) => quietEvent(context, event)),
  };
  console.log(JSON.stringify(printable, null, 2));
}

function fromReceipt(
  context: NomadContext,
  domain: number,
  receipt: providers.TransactionReceipt,
  homeAddr: string,
): NomadMessage[] {
  const messages: NomadMessage[] = [];
  const home = new Contract(homeAddr, Home.abi).interface;

  for (const log of receipt.logs) {
    try {
      const parsed = home.parseLog(log);
      if (parsed.name === "Dispatch") {
        const dispatch = parsed as any;
        dispatch.getBlock = () => {
          return context.mustGetProvider(domain).getBlock(log.blockHash);
        };
        dispatch.getTransaction = () => {
          return context.mustGetProvider(domain).getTransaction(log.transactionHash);
        };
        dispatch.getTransactionReceipt = () => {
          return context.mustGetProvider(domain).getTransactionReceipt(log.transactionHash);
        };

        const annotated = new Annotated<any, any>(domain, receipt, dispatch, true);
        annotated.event.blockNumber = annotated.receipt.blockNumber;
        const message = new NomadMessage(context, annotated);
        messages.push(message);
      }
    } catch (e: any) {
      if (!e.message.includes("no matching event")) {
        console.log("An error occured while getting NomadMessage from Receipt", e);
      }
      continue;
    }
  }
  return messages;
}

export default task("trace-message", "See the status of a nomad message")
  .addParam(
    "transaction",
    "Transaction hash where there has been a nomad message sent joined by commas (i.e. txHash1,txHash2,..)",
  )
  .addParam("destination", "The destination domain")
  .addOptionalParam("messageHash", "Identifier of the message on nomad")
  .addOptionalParam("leafIndex", "Index of the message leaf in root")
  .setAction(
    async ({ transaction, messageHash, leafIndex, destination: _destination }, { getNamedAccounts, ethers }) => {
      const namedAccounts = await getNamedAccounts();

      const destination = +_destination;
      console.log("namedAccounts: ", namedAccounts);
      console.log("transaction: ", transaction);
      console.log("destination: ", destination);
      console.log("messageHash", messageHash);
      console.log("leafIndex", leafIndex);

      // Get the domain + context
      const network = await ethers.provider.getNetwork();
      const originConfig = NOMAD_DEPLOYMENTS.get(network.chainId);
      if (!originConfig) {
        throw new Error(`No nomad config for ${network.chainId}`);
      }
      const [destChain, destConfig] =
        [...NOMAD_DEPLOYMENTS].find(([_, nomadConfig]) => {
          return nomadConfig.domain === destination;
        }) ?? [];
      if (!destConfig || typeof destChain === "undefined") {
        throw new Error(`No nomad config for ${destination}`);
      }
      const context = originConfig.isDev ? dev : mainnet;

      // Register origin provider
      context.registerProvider(originConfig.domain, ethers.provider);

      // Register destination provider
      const [_, destHardhatConfig] =
        Object.entries(config.networks ?? {}).find(([_, value]) => {
          return +destChain === value?.chainId;
        }) ?? [];
      if (!(destHardhatConfig as any).url) {
        throw new Error(`No provider url found in hardhat.config.ts for chain: ${destChain}`);
      }
      context.registerProvider(destination, new JsonRpcProvider((destHardhatConfig as any).url));

      // Get the receipt
      const receipt = await ethers.provider.getTransactionReceipt(transaction);
      if (!receipt) {
        throw new Error(`Could not find receipt for ${transaction}`);
      }

      // Trace the message
      const [message] = fromReceipt(context, originConfig.domain, receipt, originConfig.home);
      const status = await message.events();
      printStatus(context, status);
    },
  );
