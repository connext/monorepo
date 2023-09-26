import { createLoggingContext, Logger } from "@connext/nxtp-utils";
import { ConnextInterface } from "@connext/smart-contracts";
import { getErc20Interface, TransactionService } from "@connext/nxtp-txservice";
import { BigNumber, utils } from "ethers";

import { DEPLOYER_WALLET } from "../../constants/local";

// Add liquidity for router in `localAsset` on each domain.
export const addLiquidity = async (
  domains: {
    domain: string;
    router: string;
    canonicalId: string;
    canonicalDomain: string;
    amount: string;
    Connext: string;
  }[],
  txService: TransactionService,
  logger: Logger,
) => {
  const { requestContext, methodContext } = createLoggingContext(addLiquidity.name);
  for (const domain of domains) {
    logger.info("addLiquidity", requestContext, methodContext, { domain });
    logger.info("Getting the localAsset from canonicalAsset", requestContext, methodContext, {
      domain: domain.domain,
      canonicalId: domain.canonicalId,
      canonicalDomain: domain.canonicalDomain,
    });
    const localAndAdoptedAssetData = ConnextInterface.encodeFunctionData("getLocalAndAdoptedToken", [
      domain.canonicalId,
      domain.canonicalDomain,
    ]);
    const encodedLocalAndAdoptedAsset = await txService.readTx({
      domain: +domain.domain,
      data: localAndAdoptedAssetData,
      to: domain.Connext,
    });
    const [localAsset] = ConnextInterface.decodeFunctionResult("getLocalAndAdoptedToken", encodedLocalAndAdoptedAsset);

    const allowanceData = getErc20Interface().encodeFunctionData("allowance", [
      DEPLOYER_WALLET.address,
      domain.Connext,
    ]);
    const encoded = await txService.readTx({ domain: +domain.domain, data: allowanceData, to: localAsset });
    const [allowance] = getErc20Interface().decodeFunctionResult("allowance", encoded);

    const _balanceData = getErc20Interface().encodeFunctionData("balanceOf", [DEPLOYER_WALLET.address]);
    const _encodedBalanceData = await txService.readTx({
      domain: +domain.domain,
      data: _balanceData,
      to: localAsset,
    });
    const deployerBalance = getErc20Interface().decodeFunctionResult("balanceOf", _encodedBalanceData);
    console.log({ domain, localAsset, allowance: allowance.toString() });

    if (BigNumber.from(allowance.toString()).lt(domain.amount)) {
      if (BigNumber.from(deployerBalance.toString()).lt(domain.amount)) {
        throw new Error("You don't have enough amount to add liquidity. Please `xcallIntoLocal` first");
      }
      console.log("Sending approval txs...");
      const approveData = getErc20Interface().encodeFunctionData("approve", [domain.Connext, domain.amount]);
      await txService.sendTx({ domain: +domain.domain, to: localAsset, data: approveData, value: 0 }, requestContext);
      console.log("Sending approval txs done!");
    }

    const addLiquidityData = ConnextInterface.encodeFunctionData("addRouterLiquidityFor", [
      domain.amount,
      localAsset,
      domain.router,
    ]);

    await txService.sendTx(
      {
        domain: +domain.domain,
        to: domain.Connext,
        data: addLiquidityData,
        value: 0,
      },
      requestContext,
    );
  }
};
