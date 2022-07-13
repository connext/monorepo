import { task } from "hardhat/config";
import { NomadContext, NomadStatus, MessageStatus, AnnotatedLifecycleEvent, NomadMessage } from "@nomad-xyz/sdk";
import { BigNumber, providers, Wallet, utils } from "ethers";
import { config as dotEnvConfig } from "dotenv";
import { BytesLike, LogDescription } from "ethers/lib/utils";

import config from "../hardhat.config";
import { getDomainInfoFromChainId, getNomadConfig } from "../src/nomad";
import { Env, mustGetEnv } from "../src/utils";

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
  env?: Env;
};

export default task("trace-message", "See the status of a nomad message")
  .addParam(
    "transaction",
    "Transaction hash where there has been a nomad message sent joined by commas (i.e. txHash1,txHash2,..)",
  )
  .addParam("destination", "The destination domain id")
  .addOptionalParam("process", "Whether or not to attempt to process")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ transaction, destination: _destination, process: _process, env: _env }: TaskArgs, hre) => {
    const env = mustGetEnv(_env);
    console.log("env:", env);
    const destination = +_destination;
    const shouldProcess = _process === "true" ? true : false;
    console.log("transaction: ", transaction);
    console.log("destination: ", destination);
    console.log("shouldProcess", shouldProcess);

    // Get the domain + context
    const network = await hre.ethers.provider.getNetwork();
    const nomadConfig = getNomadConfig(network.chainId);
    const { domain: originDomain, name: originName } = await getDomainInfoFromChainId(network.chainId, hre);

    const context = new NomadContext(nomadConfig);
    const destinationChainId = context.mustGetDomain(destination).specs.chainId;

    const s3Url = "https://nomadxyz-staging-proofs.s3.us-west-2.amazonaws.com/";

    // Register origin provider
    context.registerProvider(originDomain, hre.ethers.provider);

    // Register destination provider
    const [, destHardhatConfig] =
      Object.entries(config.networks ?? {}).find(([, value]) => {
        return destinationChainId === (value as any)?.chainId;
      }) ?? [];
    if (!destHardhatConfig || !(destHardhatConfig as any).url) {
      throw new Error(`No provider url found in hardhat.config.ts for chain: ${destination}`);
    }
    const destinationProvider = new providers.JsonRpcProvider((destHardhatConfig as any).url as string);
    context.registerProvider(destination, destinationProvider);

    // Get the receipt
    const receipt = await hre.ethers.provider.getTransactionReceipt(transaction);
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
      const msgHash = dispatchEvent.args.messageHash as string;
      const status = await replica.messages(msgHash);
      const url = `${s3Url}${originName}_${dispatchEvent.args.leafIndex.toString()}`;
      console.log("processing on replica", status, replica.address, url);
      let processTx;
      if (status === "0") {
        // Must prove and process
        const data = await utils.fetchJson(url);
        processTx = await replica.proveAndProcess(
          data.message as BytesLike,
          // @ts-ignore
          data.proof.path as unknown,
          BigNumber.from(data.proof.index),
        );
      } else if (status === "1") {
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
  });
