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

export class NoAggregatedRoot extends NxtpError {
  constructor(context: any = {}) {
    super(`No Aggregated Root found.`, context, NoAggregatedRoot.name);
  }
}

export class NoOutboundRootIndex extends NxtpError {
  constructor(outboundRoot: string, context: any = {}) {
    super(`No index for outbound root ${outboundRoot}`, context, NoOutboundRootIndex.name);
  }
}

export class NoOutboundRootProof extends NxtpError {
  constructor(outboundRootIndex: number, outboundRoot: string, context: any = {}) {
    super(`No index ${outboundRootIndex} for outbound root ${outboundRoot}`, context, NoOutboundRootProof.name);
  }
}

export class NoMessageProof extends NxtpError {
  constructor(index: number, leaf: string, context: any = {}) {
    super(`No index ${index} for message hash ${leaf}`, context, NoMessageProof.name);
  }
}
