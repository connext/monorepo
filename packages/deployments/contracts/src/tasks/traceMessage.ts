import { task } from "hardhat/config";
import { NomadMessage, NomadContext, NomadStatus, MessageStatus, AnnotatedLifecycleEvent } from "@nomad-xyz/sdk";
import { BridgeContext } from "@nomad-xyz/sdk-bridge";
import { providers } from "ethers";

import config from "../../hardhat.config";
import { getDomainInfoFromChainId } from "../nomad";
import { MAINNET_CHAINS } from "../constants";

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
    events: events.map((event) => quietEvent(context, event)),
  };
  console.log(JSON.stringify(printable, null, 2));
}

type TaskArgs = {
  transaction: string;
  destination: string;
  messageHash?: string;
  leafIndex?: string;
};

export default task("trace-message", "See the status of a nomad message")
  .addParam(
    "transaction",
    "Transaction hash where there has been a nomad message sent joined by commas (i.e. txHash1,txHash2,..)",
  )
  .addParam("destination", "The destination chain id")
  .addOptionalParam("messageHash", "Identifier of the message on nomad")
  .addOptionalParam("leafIndex", "Index of the message leaf in root")
  .setAction(
    async (
      { transaction, messageHash, leafIndex, destination: _destination }: TaskArgs,
      { getNamedAccounts, ethers },
    ) => {
      const namedAccounts = await getNamedAccounts();

      const destination = +_destination;
      console.log("namedAccounts: ", namedAccounts);
      console.log("transaction: ", transaction);
      console.log("destination: ", destination);
      console.log("messageHash", messageHash);
      console.log("leafIndex", leafIndex);

      // Get the domain + context
      const network = await ethers.provider.getNetwork();
      const { domain: originDomain } = getDomainInfoFromChainId(network.chainId);

      const context = BridgeContext.fromNomadContext(
        MAINNET_CHAINS.includes(network.chainId) ? new NomadContext("development") : new NomadContext("production"),
      );

      // Register origin provider
      context.registerProvider(originDomain, ethers.provider);

      // Register destination provider
      const [, destHardhatConfig] =
        Object.entries(config.networks ?? {}).find(([, value]) => {
          return +destination === value?.chainId;
        }) ?? [];
      if (!(destHardhatConfig as any).url) {
        throw new Error(`No provider url found in hardhat.config.ts for chain: ${destination}`);
      }
      context.registerProvider(destination, new providers.JsonRpcProvider((destHardhatConfig as any).url as string));

      // Get the receipt
      const receipt = await ethers.provider.getTransactionReceipt(transaction);
      if (!receipt) {
        throw new Error(`Could not find receipt for ${transaction}`);
      }

      // Trace the message
      const [message] = NomadMessage.baseFromReceipt(context, destination, receipt);

      const status = await message.events();
      printStatus(context, status);
    },
  );
