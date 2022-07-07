import { BigNumber, constants, Contract, providers, utils } from "ethers";
import { task } from "hardhat/config";
import { CallParams } from "@connext/nxtp-utils";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";
import { canonizeId, getDomainInfoFromChainId } from "../src/nomad";

type TaskArgs = {
  transactingAssetId?: string;
  amount?: string;
  to?: string;
  destinationDomain?: string;
  callData?: string;
  connextAddress?: string;
  env?: Env;
  relayerFee?: string;
  callback?: string;
  callbackFee?: string;
  forceSlow?: string;
  receiveLocal?: string;
  recovery?: string;
};

export default task("xcall", "Prepare a cross-chain tx")
  .addOptionalParam("transactingAssetId", "Transacting asset Id")
  .addOptionalParam("amount", "Amount to transfer")
  .addOptionalParam("to", "To address")
  .addOptionalParam("destinationDomain", "Destination domain")
  .addOptionalParam("callData", "Data for external call")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("relayerFee", "Override relayer fee")
  .addOptionalParam("callback", "Override callback address")
  .addOptionalParam("callbackFee", "Override callback fee")
  .addOptionalParam("forceSlow", "Override for forcing slow path")
  .addOptionalParam("receiveLocal", "Override for receiving local")
  .addOptionalParam("recovery", "Override for recovery address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      {
        transactingAssetId: _transactingAssetId,
        amount: _amount,
        connextAddress: _connextAddress,
        to: _to,
        callData: _callData,
        destinationDomain: _destinationDomain,
        env: _env,
        relayerFee: _relayerFee,
        callback: _callback,
        callbackFee: _callbackFee,
        forceSlow: _forceSlow,
        receiveLocal: _receiveLocal,
        recovery: _recovery,
      }: TaskArgs,
      hre,
    ) => {
      let tx: providers.TransactionResponse;
      const [sender] = await hre.ethers.getSigners();

      const env = mustGetEnv(_env);
      console.log("env:", env);
      console.log("sender: ", sender.address);

      // Get the origin and destination domains.
      const network = await hre.ethers.provider.getNetwork();
      const originDomain = (await getDomainInfoFromChainId(network.chainId, hre)).domain;
      const destinationDomain = +(_destinationDomain ?? process.env.TRANSFER_DESTINATION_DOMAIN ?? "0");
      if (!destinationDomain) {
        throw new Error("Destination domain must be specified as params or from env (TRANSFER_DESTINATION_DOMAIN)");
      }

      // Get the "to" address.
      const to = _to ?? process.env.TRANSFER_TO;
      if (!to) {
        throw new Error("To address must be specified as param or from env (TRANSFER_TO)");
      }

      // Get the call data, if applicable.
      const callData = _callData ?? process.env.TRANSFER_CALL_DATA ?? "0x";

      // Get the amount.
      const amount = _amount ?? process.env.TRANSFER_AMOUNT;
      if (!amount) {
        throw new Error("Amount must be specified as param or from env (TRANSFER_AMOUNT)");
      }

      // Get the relayer fee (defaults to 0)
      const relayerFee = _relayerFee ?? process.env.RELAYER_FEE ?? "0";

      // Get the transacting asset ID.
      let transactingAssetId = _transactingAssetId ?? process.env.TRANSFER_ASSET;
      if (!transactingAssetId) {
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
          transactingAssetId = canonicalAsset;
        } else {
          // Current network's domain is not canonical domain, so we need to get the local asset representation.
          const tokenDeployment = await hre.deployments.get(getDeploymentName("TokenRegistryUpgradeBeaconProxy", env));
          const tokenRegistry = new Contract(
            tokenDeployment.address,
            (await hre.deployments.get(getDeploymentName("TokenRegistry"))).abi,
            sender,
          );
          transactingAssetId = await tokenRegistry.getRepresentationAddress(canonicalDomain, canonicalTokenId);
          if (transactingAssetId === constants.AddressZero) {
            throw new Error("Empty transactingAssetId on registry");
          }
        }
      }
      if (!transactingAssetId) {
        // If the above attempt fails, then we default to telling the user to just specify the transacting asset ID.
        throw new Error("Transfer asset ID must be specified as param or from env (TRANSFER_ASSET)");
      }

      // Get the other params
      const callback = _callback ?? constants.AddressZero;
      const callbackFee = _callbackFee ?? "0";
      const forceSlow = _forceSlow === "true" ? true : false;
      const receiveLocal = _receiveLocal === "true" ? true : false;
      const recovery = _recovery ?? to;

      console.log("originDomain: ", originDomain);
      console.log("destinationDomain: ", destinationDomain);
      console.log("transactingAsset: ", transactingAssetId);
      console.log("amount: ", amount);
      console.log("Transfer to: ", to);
      console.log("callData: ", callData);
      console.log("callback: ", callback);
      console.log("callbackFee: ", callbackFee);
      console.log("forceSlow: ", forceSlow);
      console.log("receiveLocal: ", receiveLocal);
      console.log("recovery: ", recovery);

      const connextName = getDeploymentName("ConnextHandler", env);
      const connextDeployment = await hre.deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      const connext = new Contract(connextAddress, connextDeployment.abi, sender);
      console.log("connextAddress: ", connextAddress);

      // test
      const tokenRegistry = await connext.tokenRegistry();
      if (tokenRegistry === constants.AddressZero) {
        throw new Error(`TokenRegistry not set on connext`);
      }
      console.log("tokenRegistry:", tokenRegistry);

      let balance: BigNumber;
      if (transactingAssetId === constants.AddressZero) {
        balance = await hre.ethers.provider.getBalance(sender.address);
      } else {
        const erc20 = await hre.ethers.getContractAt("IERC20", transactingAssetId, sender);
        const allowance = await erc20.allowance(sender.address, connextAddress);
        if (allowance.lt(amount)) {
          console.log("Approving tokens");
          tx = await erc20.approve(connextAddress, constants.MaxUint256);
          console.log("approval tx sent: ", tx.hash);
          await tx.wait();
          console.log("approval tx mined", tx.hash);
        }
        balance = await erc20.balanceOf(sender.address);
      }
      if (balance.lt(amount)) {
        throw new Error(`Balance ${balance.toString()} is less than amount ${amount}`);
      }

      const params: CallParams = {
        to,
        callData,
        originDomain: `${originDomain}`,
        destinationDomain: `${destinationDomain}`,
        recovery,
        agent: constants.AddressZero,
        callback,
        callbackFee,
        relayerFee: "0",
        forceSlow,
        receiveLocal,
        slippageTol: "0",
      };

      const args = {
        params,
        transactingAssetId,
        amount,
        relayerFee,
      };
      console.log("xcall args", JSON.stringify(args));
      const encoded = connext.interface.encodeFunctionData("xcall", [args]);
      console.log("encoded: ", encoded);
      console.log("to: ", connext.address);
      console.log("from: ", sender.address);
      tx = await connext.functions.xcall(args, { from: sender.address, gasLimit: 1_000_000 });
      console.log("tx sent! ", tx.hash);
      const rec = await tx.wait();
      rec.logs.forEach((log, index) => {
        try {
          const l = connext.interface.parseLog(log);
          console.log(`log at index ${index}: `, l);
        } catch (e: unknown) {}
      });
      console.log("tx mined! ", rec.transactionHash);
    },
  );
