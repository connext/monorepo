import { ConnextError } from "@connext/utils";

export class SequencerResponseInvalid extends ConnextError {
  constructor(context: any = {}) {
    super("POST request returned invalid response", context, SequencerResponseInvalid.name);
  }
}

export class SequencerPostFailed extends ConnextError {
  constructor(context: any = {}) {
    super("POST request failed", context, SequencerPostFailed.name);
  }
}
