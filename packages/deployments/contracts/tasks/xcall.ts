import { BigNumber, constants, Contract, providers, utils } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";
import { canonizeId, chainIdToDomain } from "../src";

type TaskArgs = {
  asset?: string;
  amount?: string;
  to?: string;
  delegate?: string;
  destination?: string;
  slippage?: string;
  callData?: string;
  connextAddress?: string;
  env?: Env;
  relayerFee?: string;
  receiveLocal?: string;
  runs?: number;
  accounts?: number;
  showArgs?: string;
};

export default task("xcall", "Prepare a cross-chain tx")
  .addOptionalParam("asset", "Transacting asset Id")
  .addOptionalParam("amount", "Amount to transfer")
  .addOptionalParam("to", "To address")
  .addOptionalParam("destination", "Destination domain")
  .addOptionalParam("callData", "Data for external call")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("relayerFee", "Override relayer fee")
  .addOptionalParam("receiveLocal", "Override for receiving local")
  .addOptionalParam("delegate", "Override for delegate address")
  .addOptionalParam("slippage", "Override for destination domain tokens out (slippage tolerance)")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("runs", "Number of times to fire the xcall")
  .addOptionalParam("accounts", "Number of accounts to fire xcalls in parallel")
  .addOptionalParam("showArgs", "Verbose logs of xcall args")
  .setAction(
    async (
      {
        asset: _asset,
        amount: _amount,
        connextAddress: _connextAddress,
        to: _to,
        callData: _callData,
        destination: _destination,
        env: _env,
        relayerFee: _relayerFee,
        receiveLocal: _receiveLocal,
        delegate: _delegate,
        slippage: _slippage,
        runs: _runs,
        accounts: _accounts,
        showArgs: _showArgs,
      }: TaskArgs,
      hre,
    ) => {
      let tx: providers.TransactionResponse;

      const showArgs = _showArgs === "true" ? true : false;

      const env = mustGetEnv(_env);
      console.log("env:", env);

      const runs = _runs ?? 1;
      console.log("runs:", runs);

      const accounts = _accounts ?? 1;
      console.log("accounts:", accounts);

      const senders = await hre.ethers.getSigners();
      senders.splice(accounts);
      console.log(
        "senders: ",
        senders.map((s) => s.address),
      );

      // Get the origin and destination domains.
      const network = await hre.ethers.provider.getNetwork();
      const originDomain = chainIdToDomain(network.chainId);
      const destinationDomain = +(_destination ?? process.env.TRANSFER_DESTINATION_DOMAIN ?? "0");
      if (!destinationDomain) {
        throw new Error("Destination domain must be specified as params or from env (TRANSFER_DESTINATION_DOMAIN)");
      }

      // Get the "to" address (defaults to sender address)
      const to = _to ?? process.env.TRANSFER_TO ?? senders[0].address;

      // Get the call data, if applicable.
      const callData = _callData ?? process.env.TRANSFER_CALL_DATA ?? "0x";

      // Get the amount (defaults to 1 TEST)
      const amount = _amount ?? process.env.TRANSFER_AMOUNT ?? "1000000000000000000";

      // Get the relayer fee (defaults to 0)
      const relayerFee = _relayerFee ?? process.env.RELAYER_FEE ?? "0";

      // Load contracts
      const connextName = getDeploymentName("Connext", env);
      const connextDeployment = await hre.deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      const connext = new Contract(connextAddress, connextDeployment.abi);
      console.log("connextAddress: ", connextAddress);

      // Get the transacting asset ID.
      let asset = _asset ?? process.env.TRANSFER_ASSET;
      if (!asset) {
        // Alternatively, try defaulting to using the canonical token from the .env (if present) as the transacting asset ID,
        // deriving the local asset using the token registry if applicable.
        const canonicalDomain = process.env.CANONICAL_DOMAIN;
        const canonicalAsset = process.env.CANONICAL_TOKEN;
        if (!canonicalAsset || !canonicalDomain) {
          throw new Error("No canonical domain or token in env");
        }
        const canonicalTokenId = utils.hexlify(canonizeId(canonicalAsset));

        // Retrieve the local asset from the token registry, if applicable.
        if (+canonicalDomain === originDomain) {
          // Use the canonical asset as the local asset since we're on the canonical network.
          asset = canonicalAsset;
        } else {
          // Current network's domain is not canonical domain, so we need to get the local asset representation.
          asset = await connext.canonicalToRepresentation(canonicalDomain, canonicalTokenId);
          if (asset === constants.AddressZero) {
            throw new Error("Empty asset on registry");
          }
        }
      }
      if (!asset) {
        // If the above attempt fails, then we default to telling the user to just specify the transacting asset ID.
        throw new Error("Transfer asset ID must be specified as param or from env (TRANSFER_ASSET)");
      }
      const domain = await connext.connect(senders[0]).domain();
      if (domain !== originDomain) {
        throw new Error(`Wrong origin domain!. expected: ${domain}, provided: ${originDomain}`);
      }

      if (originDomain === destinationDomain) {
        throw new Error(`origin domain == destination domain!`);
      }

      console.log("domain", domain);

      const remote = await connext.connect(senders[0]).remote(destinationDomain);
      if (remote === "0x0000000000000000000000000000000000000000") {
        throw new Error(`destination domain not supported!`);
      }
      console.log(`remote for domain ${destinationDomain}: ${remote}`);

      // Check balances and allowances
      for (let i = 0; i < senders.length; i++) {
        let balance: BigNumber;
        if (asset === constants.AddressZero) {
          balance = await hre.ethers.provider.getBalance(senders[i].address);
        } else {
          const erc20 = await hre.ethers.getContractAt(
            "@matterlabs/zksync-contracts/l1/contracts/common/interfaces/IERC20.sol:IERC20",
            asset,
            senders[i],
          );
          console.log("erc20: ", erc20.address);
          const allowance = await erc20.allowance(senders[i].address, connextAddress);
          console.log("allowance: ", allowance.toString());
          if (allowance.lt(BigNumber.from(amount).mul(runs))) {
            tx = await erc20.approve(connextAddress, constants.MaxUint256);
            console.log("allowance tx: ", tx.hash);
            const r = await tx.wait();
            console.log("allowance tx mined: ", r.transactionHash);
          }
          balance = await erc20.balanceOf(senders[i].address);
        }
        const balanceNeeded = BigNumber.from(amount).mul(runs);
        if (balance.lt(balanceNeeded)) {
          throw new Error(
            `Account (${
              senders[i].address
            }) has balance (${balance.toString()}), which is less than total needed (${balanceNeeded})`,
          );
        }
      }

      // Get the other params
      const receiveLocal = _receiveLocal === "true" ? true : false;
      const delegate = _delegate ?? to;
      const slippage = _slippage ?? "10000";

      // Run as many times as specified
      for (let i = 1; i <= runs; i++) {
        const receipts = Promise.all(
          senders.map(async (sender) => {
            const to = _to ?? process.env.TRANSFER_TO ?? sender.address;
            const args = [destinationDomain, to, asset, delegate, amount, slippage, callData];
            const encoded = connext.interface.encodeFunctionData("xcall", args);
            if (showArgs) {
              console.log("  destinationDomain: ", destinationDomain);
              console.log("  asset: ", asset);
              console.log("  amount: ", amount);
              console.log("  callData: ", callData);
              console.log("  delegate: ", delegate);
              console.log("  slippage:", slippage);
              console.log("  receiveLocal: ", receiveLocal);
              console.log("xcall args", args);
              console.log("encoded: ", encoded);
              console.log("to: ", connext.address);
            }

            // TODO: For receiveLocal calls, use xcallIntoLocal.
            const tx = await connext
              .connect(sender)
              .functions.xcall(destinationDomain, to, asset, delegate, amount, slippage, callData, {
                from: sender.address,
                gasLimit: 2_000_000,
                value: relayerFee,
              });
            console.log(`Transaction from sender: ${sender.address}`);
            console.log("  Tx: ", tx.hash);

            return tx.wait();
          }),
        );
        await receipts;
        console.log(`--> Transactions mined for run #${i}`);
      }
    },
  );
