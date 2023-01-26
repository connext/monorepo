import { ConnextError } from "@connext/utils";

export class RelayerSendFailed extends ConnextError {
  constructor(context: any = {}) {
    super(`Relayer Send Failed`, context, RelayerSendFailed.name);
  }
}
