import { NxtpError } from "@connext/nxtp-utils";

export class SignerAddressMissing extends NxtpError {
  constructor(context: any = {}) {
    super("Signer Address Missing", context, SignerAddressMissing.name);
  }
}
