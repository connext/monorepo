import { createLoggingContext, Logger } from "@connext/nxtp-utils";
import { ConnextInterface } from "@connext/smart-contracts";
import { getErc20Interface, TransactionService } from "@connext/nxtp-txservice";
import { BigNumber } from "ethers";

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

    console.log({ domain, localAsset });

    const allowanceData = getErc20Interface().encodeFunctionData("allowance", [domain.router, domain.Connext]);
    const encoded = await txService.readTx({ domain: +domain.domain, data: allowanceData, to: localAsset });
    const [allowance] = getErc20Interface().decodeFunctionResult("allowance", encoded);

    if (BigNumber.from(allowance.toString()).lt(domain.amount)) {
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
