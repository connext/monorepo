import { BigNumberish, utils } from "ethers";
import { task } from "hardhat/config";

type TaskArgs = {
  router: string;
  asset: string;
  amount: string;
  connextAddress?: string;
  tokenRegistryAddress?: string;
};

export default task("add-liquidity", "Add liquidity for a router")
  .addParam("router", "Router address")
  .addParam("asset", "Local token address")
  .addParam("amount", "Amount (real units)")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("tokenRegistryAddress", "Override token registry address")
  .setAction(
    async (
      {
        asset,
        router,
        connextAddress: _connextAddress,
        amount: _amount,
        tokenRegistryAddress: _tokenRegistryAddress,
      }: TaskArgs,
      { deployments, getNamedAccounts, ethers },
    ) => {
      const namedAccounts = await getNamedAccounts();

      console.log("router: ", router);
      console.log("asset: ", asset);
      console.log("namedAccounts: ", namedAccounts);

      let connextAddress = _connextAddress;
      if (!connextAddress) {
        const connextDeployment = await deployments.get("Connext");
        connextAddress = connextDeployment.address;
      }
      console.log("connextAddress: ", connextAddress);

      const connext = await ethers.getContractAt("Connext", connextAddress);
      let amount;
      if (asset !== ethers.constants.AddressZero) {
        const erc20 = await ethers.getContractAt("TestERC20", asset);
        const balance = await erc20.balanceOf(namedAccounts.deployer);
        amount = utils.parseUnits(_amount, (await erc20.decimals()) as BigNumberish);
        console.log("balance: ", balance.toString());
        if (balance.lt(amount)) {
          throw new Error("Not enough balance");
        }
        const allowance = await erc20.allowance(namedAccounts.deployer, connext.address);
        if (allowance.lt(amount)) {
          const approveTx = await erc20.approve(connext.address, ethers.constants.MaxUint256);
          console.log("approveTx: ", approveTx.hash);
          await approveTx.wait();
          console.log("approveTx mined");
        } else {
          console.log(`Sufficient allowance: ${allowance.toString()}`);
        }
      } else {
        amount = utils.parseEther(_amount);
      }

      const approvedRouter = await connext.approvedRouters(router);
      console.log("approvedRouter: ", approvedRouter);
      if (!approvedRouter) {
        throw new Error("Router not approved");
      }

      let tokenRegistryAddress = _tokenRegistryAddress;
      if (!tokenRegistryAddress) {
        const tokenRegistryDeployment = await deployments.get("TokenRegistryUpgradeBeaconProxy");
        tokenRegistryAddress = tokenRegistryDeployment.address;
      }
      console.log("tokenRegistryAddress: ", tokenRegistryAddress);
      const tokenRegistry = await ethers.getContractAt("TokenRegistry", tokenRegistryAddress);
      const [domain, canonical] = await tokenRegistry.getTokenId(asset);
      console.log("domain: ", domain);
      console.log("canonical: ", canonical);

      const approvedAsset = await connext.approvedAssets(canonical);
      console.log("approvedAsset: ", approvedAsset);
      if (!approvedAsset) {
        throw new Error("Asset not approved");
      }

      console.log("args:", amount, asset, router);
      const tx = await connext.addLiquidityFor(amount, asset, router, {
        from: namedAccounts.deployer,
        value: asset === ethers.constants.AddressZero ? amount : 0,
        // gasLimit: BigNumber.from("10000000"),
      });
      console.log("addLiquidityFor tx: ", tx);
      const receipt = await tx.wait();
      console.log("addLiquidityFor tx mined: ", receipt.transactionHash);
      const liquidity = await connext.routerBalances(router, asset);
      console.log("liquidity: ", liquidity.toString());
    },
  );
