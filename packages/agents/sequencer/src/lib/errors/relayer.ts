import { ConnextError } from "@connext/utils";

export class RelayerSendFailed extends ConnextError {
  constructor(context: any = {}) {
    super(`Relayer Send Failed`, context, RelayerSendFailed.name);
  }
}

export class NotEnoughRelayerFee extends ConnextError {
  constructor(context: any = {}) {
    super(`Relayer fee not enough`, context, NotEnoughRelayerFee.name);
  }
}
