import { NxtpError } from "@connext/nxtp-utils";

export class SequencerResponseInvalid extends NxtpError {
  cancellable = true;
  constructor(context: any = {}) {
    super("sendBid: POST request returned invalid response", context, SequencerResponseInvalid.name);
  }
}
