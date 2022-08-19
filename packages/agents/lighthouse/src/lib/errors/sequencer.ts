import { NxtpError } from "@connext/nxtp-utils";

export class SequencerResponseInvalid extends NxtpError {
  constructor(context: any = {}) {
    super("POST request returned invalid response", context, SequencerResponseInvalid.name);
  }
}

export class SequencerPostFailed extends NxtpError {
  constructor(context: any = {}) {
    super("POST request failed", context, SequencerPostFailed.name);
  }
}
