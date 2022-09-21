import { NxtpError } from "@connext/nxtp-utils";

export class MerleRootInvalid extends NxtpError {
  constructor(context: any = {}) {
    super(`Bad root or leaves`, context, MerleRootInvalid.name);
  }
}

export class MerleProofVerificationFailed extends NxtpError {
  constructor(context: any = {}) {
    super(`Merkle Proof verification failed`, context, MerleProofVerificationFailed.name);
  }
}
