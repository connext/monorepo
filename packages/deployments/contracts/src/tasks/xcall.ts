import { BigNumber, constants, providers, utils } from "ethers";
import { task } from "hardhat/config";

import { canonizeId, getDomainInfoFromChainId } from "../nomad";

type TaskArgs = {
  transactingAssetId?: string;
  amount?: string;
  to?: string;
  destinationDomain?: string;
  callData?: string;
  connextAddress?: string;
};

export default task("xcall", "Prepare a cross-chain tx")
  .addOptionalParam("transactingAssetId", "Transacting asset Id")
  .addOptionalParam("amount", "Amount to transfer")
  .addOptionalParam("to", "To address")
  .addOptionalParam("destinationDomain", "Destination domain")
  .addOptionalParam("callData", "Data for external call")
  .addOptionalParam("connextAddress", "Override connext address")
  .setAction(
    async (
      {
        transactingAssetId: _transactingAssetId,
        amount: _amount,
        connextAddress: _connextAddress,
        to: _to,
        callData: _callData,
        destinationDomain: _destinationDomain,
      }: TaskArgs,
      { deployments, ethers },
    ) => {
      let tx: providers.TransactionResponse;
      const [sender] = await ethers.getSigners();
      console.log("sender: ", sender.address);

      // Get the origin and destination domains.
      const network = await ethers.provider.getNetwork();
      const originDomain = getDomainInfoFromChainId(network.chainId).domain;
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
          const tokenRegistryAddress = (await deployments.get("TokenRegistryUpgradeBeaconProxy")).address;
          const tokenRegistry = await ethers.getContractAt(
            (
              await deployments.getArtifact("TokenRegistry")
            ).abi,
            tokenRegistryAddress,
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

      console.log("originDomain: ", originDomain);
      console.log("destinationDomain: ", destinationDomain);
      console.log("Transacting asset: ", transactingAssetId);
      console.log("Transacting amount: ", amount);
      console.log("Transfer to: ", to);
      console.log("callData: ", callData);

      let connextAddress = _connextAddress;
      if (!connextAddress) {
        const connextDeployment = await deployments.get("Connext");
        connextAddress = connextDeployment.address;
      }
      console.log("connextAddress: ", connextAddress);

      let balance: BigNumber;
      if (transactingAssetId === constants.AddressZero) {
        balance = await ethers.provider.getBalance(sender.address);
      } else {
        const erc20 = await ethers.getContractAt("IERC20Minimal", transactingAssetId, sender);
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

      const connext = await ethers.getContractAt("Connext", connextAddress);
      const args = {
        params: {
          to,
          callData,
          originDomain,
          destinationDomain,
        },
        transactingAssetId,
        amount,
      };
      console.log("xcall args", JSON.stringify(args));
      const encoded = connext.interface.encodeFunctionData("xcall", [args]);
      console.log("encoded: ", encoded);
      console.log("to: ", connext.address);
      console.log("from: ", sender.address);
      tx = await connext.functions.xcall(args, { from: sender.address });
      console.log("tx sent! ", tx.hash);
      await tx.wait();
      console.log("tx mined! ", tx.hash);
    },
  );
