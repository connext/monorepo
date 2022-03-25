import { BigNumber } from "ethers";
import { hexlify } from "ethers/lib/utils";
import { task } from "hardhat/config";
import { canonizeId } from "../nomad";

export default task("preflight", "Ensure correct setup for e2e with specified router")
  .addParam("router", "Router address")
  .addOptionalParam("asset", "Override token address")
  .addOptionalParam("amount", "Override amount (real units)")
  .addOptionalParam("connextAddress", "Override connext address")
  .setAction(
    async (
      { router, connextAddress: _connextAddress, asset: _asset, amount: _amount },
      { deployments, ethers, run, getNamedAccounts, network },
    ) => {
      let connextAddress = _connextAddress;
      if (!connextAddress) {
        const connextDeployment = await deployments.get("Connext");
        connextAddress = connextDeployment.address;
      }

      const asset = _asset ?? (await deployments.get("TestERC20")).address;
      const amount = _amount ?? "2500000000000000000000000";

      const connext = await ethers.getContractAt("Connext", connextAddress);
      // Not needed for testnets.
      // Make sure router's signer address is approved.
      const isRouterApproved = await connext.approvedRouters(router);
      console.log("\nRouter: ", router);
      if (!isRouterApproved) {
        console.log("*** Approving router!");
        await run("add-router", { router, connextAddress });
      }
      console.log("Router approved!");

      // Make sure the asset is approved.
      const canonicalTokenId = hexlify(canonizeId(asset));
      const isAssetApproved = await connext.approvedAssets(canonicalTokenId);
      console.log("\nAsset: ", asset);
      if (!isAssetApproved) {
        console.log("*** Approving asset!");
        const domain = network.name === "rinkeby" ? "2000" : network.name === "kovan" ? "3000" : undefined;
        if (!domain) {
          throw new Error("Unsupported network");
        }
        await run("setup-asset", { canonical: canonicalTokenId, adopted: asset, domain, connextAddress });
      }
      console.log("Asset approved!");

      // Make sure the router's signer address has liquidity by checking the Connext
      // contract in the block explorer and reading the routerBalances mapping, putting in the
      // router signer address and Rinkeby asset ID.
      const liquidity = await connext.routerBalances(router, asset);
      if (liquidity.lt(amount)) {
        if (asset !== ethers.constants.AddressZero) {
          const namedAccounts = await getNamedAccounts();
          const erc20 = await ethers.getContractAt("TestERC20", asset);
          const balance = await erc20.balanceOf(namedAccounts.deployer);
          console.log("\nDeployer Balance: ", balance.toString());
          if (balance.lt(amount)) {
            console.log("*** Minting tokens!");
            await run("mint", { amount, asset, receiver: namedAccounts.deployer });
          }
        } else {
          // TODO: send ETH to txmanager
          throw new Error("Need to support eth");
        }
        console.log("\nLiquidity: ", liquidity.toString());
        console.log("*** Adding liquidity!");
        await run("add-liquidity", { router, asset, amount, connextAddress });
      }
      console.log("Sufficient liquidity added!");

      // Make sure the router's signer address has relayer fees by checking the
      // Connext contract on chain and reading the routerRelayerFees function.
      const relayerFees = await connext.routerRelayerFees(router);
      console.log("\nRelayer Fees: ", relayerFees.toString());
      if (relayerFees.lt(BigNumber.from(amount).mul(10).div(100))) {
        // TODO: add relayer fees
      }
    },
  );
