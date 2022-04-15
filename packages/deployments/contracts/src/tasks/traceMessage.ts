import { task } from "hardhat/config";
import { NomadContext, NomadStatus, MessageStatus, AnnotatedLifecycleEvent, NomadMessage } from "@nomad-xyz/sdk";
import { BridgeContext } from "@nomad-xyz/sdk-bridge";
import { BigNumber, providers, Wallet } from "ethers";
import * as nomadConfig from "@nomad-xyz/configuration";
import { config as dotEnvConfig } from "dotenv";
import { BytesLike, LogDescription } from "ethers/lib/utils";
import { fetchJson } from "@connext/nxtp-utils";

import config from "../../hardhat.config";
import { getDomainInfoFromChainId } from "../nomad";
import { MAINNET_CHAINS } from "../constants";

dotEnvConfig();

const mnemonic =
  process.env.SUGAR_DADDY ||
  process.env.MNEMONIC ||
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

// in-repo implementation of:
// https://github.com/nomad-xyz/monorepo/blob/main/packages/monitor/src/trace.ts

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
  process?: string;
};

export default task("trace-message", "See the status of a nomad message")
  .addParam(
    "transaction",
    "Transaction hash where there has been a nomad message sent joined by commas (i.e. txHash1,txHash2,..)",
  )
  .addParam("destination", "The destination domain id")
  .addOptionalParam("process", "Whether or not to attempt to process")
  .setAction(
    async ({ transaction, destination: _destination, process: _process }: TaskArgs, { getNamedAccounts, ethers }) => {
      const namedAccounts = await getNamedAccounts();

      const destination = +_destination;
      const shouldProcess = _process === "true" ? true : false;
      console.log("namedAccounts: ", namedAccounts);
      console.log("transaction: ", transaction);
      console.log("destination: ", destination);
      console.log("shouldProcess", shouldProcess);

      // Get the domain + context
      const network = await ethers.provider.getNetwork();
      const { domain: originDomain, name: originName } = getDomainInfoFromChainId(network.chainId);

      const env = MAINNET_CHAINS.includes(network.chainId) ? "production" : "development";
      const s3Url = `https://nomadxyz-${env}-proofs.s3.us-west-2.amazonaws.com/`;

      const context = BridgeContext.fromNomadContext(new NomadContext(nomadConfig.getBuiltin(env)));
      const destinationChainId = context.mustGetDomain(destination).specs.chainId;

      // Register origin provider
      context.registerProvider(originDomain, ethers.provider);

      // Register destination provider
      const [, destHardhatConfig] =
        Object.entries(config.networks ?? {}).find(([, value]) => {
          return destinationChainId === value?.chainId;
        }) ?? [];
      if (!destHardhatConfig || !(destHardhatConfig as any).url) {
        throw new Error(`No provider url found in hardhat.config.ts for chain: ${destination}`);
      }
      const destinationProvider = new providers.JsonRpcProvider((destHardhatConfig as any).url as string);
      context.registerProvider(destination, destinationProvider);

      // Get the receipt
      const receipt = await ethers.provider.getTransactionReceipt(transaction);
      if (!receipt) {
        throw new Error(`Could not find receipt for ${transaction}`);
      }

      const home = context.getCore(originDomain)!.home.interface;
      const [dispatchEvent] = receipt.logs
        .map((l) => {
          try {
            return home.parseLog(l);
          } catch (e: any) {
            return undefined;
          }
        })
        .filter((x) => !!x) as LogDescription[];

      // Trace the message
      const [message] = NomadMessage.baseFromReceipt(context, originDomain, receipt);

      const status = await message.events();
      printStatus(context, status);
      if (status.status === MessageStatus.Relayed && shouldProcess) {
        console.log("============== attempting to process ===========");
        const signer = Wallet.fromMnemonic(mnemonic).connect(destinationProvider);
        const replica = context.mustGetReplicaFor(originDomain, destination).connect(signer);
        if (!(await replica.acceptableRoot(dispatchEvent.args.committedRoot as string))) {
          console.log("cant process on replica, not an acceptable root");
          return;
        }
        console.log("processing on replica", replica.address);
        const msgHash = dispatchEvent.args.messageHash as string;
        const status = await replica.messages(msgHash);
        let processTx;
        if (status === 0) {
          // Must prove and process
          const data = await fetchJson(`${s3Url}${originName}_${dispatchEvent.args.leafIndex.toString()}`);
          processTx = await replica.proveAndProcess(
            data.message as BytesLike,
            // @ts-ignore
            data.proof.path as unknown,
            BigNumber.from(data.proof.index),
          );
        } else if (status === 1) {
          // Must simply process
          processTx = await replica.process(dispatchEvent.args.message as string);
        } else {
          // Message already processed
          console.log("already processed");
          return;
        }
        console.log("process submitted:", processTx.hash);
        const rProcess = await processTx.wait();
        console.log("process mined:", rProcess.transactionHash);
        console.log("processed?", await replica.messages(msgHash));
      }
    },
  );
