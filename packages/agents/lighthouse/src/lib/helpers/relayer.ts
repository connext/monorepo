import { ReadTransaction, WriteTransaction } from "@connext/nxtp-txservice";
import { connextRelayerSend as _connextRelayerSend, RequestContext } from "@connext/nxtp-utils";

import { getContext } from "../../lighthouse";

export const connextRelayerSend = _connextRelayerSend;

export const externalRelayerSend = async (
  chainId: number,
  destinationAddress: string,
  encodedData: string,
  _requestContext: RequestContext,
) => {
  const {
    adapters: { relayer },
  } = getContext();

  return relayer.send(chainId, destinationAddress, encodedData, _requestContext);
};

export const getGasEstimateWithRevertCode = async (domainId: number, tx: ReadTransaction | WriteTransaction) => {
  const {
    adapters: { chainreader },
  } = getContext();

  return chainreader.getGasEstimateWithRevertCode(domainId, tx);
};
