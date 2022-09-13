import { NxtpError } from "@connext/nxtp-utils";

export class NoDestinationDomainForProof extends NxtpError {
  constructor(destinationDomain: string, context: any = {}) {
    super(
      `No destination for proof available for domain ${destinationDomain}`,
      context,
      NoDestinationDomainForProof.name,
    );
  }
}
