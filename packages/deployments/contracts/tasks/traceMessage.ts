// import { task } from "hardhat/config";
// import { NomadContext, MessageStatus, NomadMessage } from "@nomad-xyz/sdk";
// import { providers, Wallet } from "ethers";
// import { config as dotEnvConfig } from "dotenv";
// import { LogDescription } from "ethers/lib/utils";

// import config from "../hardhat.config";
// import { getDomainInfoFromChainId, getNomadConfig } from "../src";
// import { Env, mustGetEnv } from "../src/utils";

// dotEnvConfig();

// const mnemonic =
//   process.env.SUGAR_DADDY ||
//   process.env.MNEMONIC ||
//   "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

// // in-repo implementation of:
// // https://github.com/nomad-xyz/monorepo/blob/main/packages/monitor/src/trace.ts

// const STATUS_TO_STRING: Record<number, string> = {
//   [MessageStatus.Dispatched]: "Dispatched on Home",
//   [MessageStatus.Included]: "Included in Home Update",
//   [MessageStatus.Relayed]: "Relayed to Replica",
//   [MessageStatus.Received]: "Received",
//   [MessageStatus.Processed]: "Processed",
// };

// function printStatus(message: NomadMessage<NomadContext>, nomadStatus: MessageStatus) {
//   // const { status, events } = nomadStatus;
//   const printable = {
//     status: STATUS_TO_STRING[nomadStatus],
//     txData: {
//       domainName: message.originName,
//       blockNumber: message.receipt.blockNumber,
//       transactionHash: message.transactionHash,
//     },
//   };
//   console.log(JSON.stringify(printable, null, 2));
// }

// type TaskArgs = {
//   transaction: string;
//   destination: string;
//   process?: string;
//   env?: Env;
// };

// export default task("trace-message", "See the status of a nomad message")
//   .addParam(
//     "transaction",
//     "Transaction hash where there has been a nomad message sent joined by commas (i.e. txHash1,txHash2,..)",
//   )
//   .addParam("destination", "The destination domain id")
//   .addOptionalParam("process", "Whether or not to attempt to process")
//   .addOptionalParam("env", "Environment of contracts")
//   .setAction(async ({ transaction, destination: _destination, process: _process, env: _env }: TaskArgs, hre) => {
//     const env = mustGetEnv(_env);
//     console.log("env:", env);
//     const destination = +_destination;
//     const shouldProcess = _process === "true" ? true : false;
//     console.log("transaction: ", transaction);
//     console.log("destination: ", destination);
//     console.log("shouldProcess", shouldProcess);

//     // Get the domain + context
//     const network = await hre.ethers.provider.getNetwork();
//     const nomadConfig = await getNomadConfig(network.chainId);
//     const { domain: originDomain } = await getDomainInfoFromChainId(network.chainId, hre);

//     const context = new NomadContext(nomadConfig);
//     const destinationChainId = context.mustGetDomain(destination).specs.chainId;

//     // Register origin provider
//     context.registerProvider(originDomain, hre.ethers.provider);

//     // Register destination provider
//     const [, destHardhatConfig] =
//       Object.entries(config.networks ?? {}).find(([, value]) => {
//         return destinationChainId === (value as any)?.chainId;
//       }) ?? [];
//     if (!destHardhatConfig || !(destHardhatConfig as any).url) {
//       throw new Error(`No provider url found in hardhat.config.ts for chain: ${destination}`);
//     }
//     const destinationProvider = new providers.JsonRpcProvider((destHardhatConfig as any).url as string);
//     context.registerProvider(destination, destinationProvider);

//     // Get the receipt
//     const receipt = await hre.ethers.provider.getTransactionReceipt(transaction);
//     if (!receipt) {
//       throw new Error(`Could not find receipt for ${transaction}`);
//     }

//     const home = context.getCore(originDomain)!.home.interface;
//     const [dispatchEvent] = receipt.logs
//       .map((l) => {
//         try {
//           return home.parseLog(l);
//         } catch (e: any) {
//           return undefined;
//         }
//       })
//       .filter((x) => !!x) as LogDescription[];

//     // Trace the message
//     const message = await NomadMessage.baseSingleFromReceipt(context, receipt);

//     // check if message has been processed
//     const msgHash = dispatchEvent.args.messageHash as string;
//     const replica = context.mustGetReplicaFor(originDomain, destination);
//     const replicaStatus = await replica.messages(msgHash);
//     if (replicaStatus === "2") {
//       console.log("message already processed");
//       return;
//     }

//     const status = await message.status();
//     if (!status) throw Error("unable to fetch status");
//     const confirmAt = await message.confirmAt();
//     if (!status || !confirmAt) {
//       console.log("error fetching status");
//       // try to process?
//       return;
//     }
//     if (confirmAt === 0) {
//       console.log("not ready to process");
//       return;
//     }
//     printStatus(message, status);
//     const now = Date.now() / 1000; // timestamp in seconds
//     const readyToProcess = now > confirmAt;
//     if (status === MessageStatus.Relayed && shouldProcess && readyToProcess) {
//       console.log("============== attempting to process ===========");
//       // register signer
//       const signer = Wallet.fromMnemonic(mnemonic);
//       context.registerSigner(destination, signer);

//       try {
//         const processed = await message.process();
//         console.log("processed", processed);
//       } catch (e: unknown) {
//         console.error("error processing transaction", e);
//       }
//     }
//   });
