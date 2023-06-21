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

export class MessageRootVerificationFailed extends NxtpError {
  constructor(context: any = {}) {
    super(`MessageRoot verification failed.`, context, MessageRootVerificationFailed.name);
  }
}

export class NoAggregatedRoot extends NxtpError {
  constructor(context: any = {}) {
    super(`No Aggregated Root found.`, context, NoAggregatedRoot.name);
  }
}
export class NoAggregateRootCount extends NxtpError {
  constructor(aggregateRoot: string | undefined, context: any = {}) {
    super(`No count for Aggregated Root ${aggregateRoot} found.`, context, NoAggregateRootCount.name);
  }
}

export class NoMessageRootIndex extends NxtpError {
  constructor(domain: string | undefined, messageRoot: string | undefined, context: any = {}) {
    super(`No index for outbound root ${messageRoot} in ${domain}`, context, NoMessageRootIndex.name);
  }
}
export class NoMessageRootCount extends NxtpError {
  constructor(domain: string | undefined, messageRoot: string | undefined, context: any = {}) {
    super(`No count for outbound root ${messageRoot} in ${domain}`, context, NoMessageRootCount.name);
  }
}
export class NoTargetMessageRoot extends NxtpError {
  constructor(domain: string | undefined, context: any = {}) {
    super(`No target outbound root in ${domain}`, context, NoTargetMessageRoot.name);
  }
}
export class NoReceivedAggregateRoot extends NxtpError {
  constructor(domain: string | undefined, context: any = {}) {
    super(`No received aggregate root in ${domain}`, context, NoReceivedAggregateRoot.name);
  }
}

export class NoMessageRootProof extends NxtpError {
  constructor(messageRootIndex: number | undefined, messageRoot: string, context: any = {}) {
    super(`No index ${messageRootIndex} for outbound root ${messageRoot}`, context, NoMessageRootProof.name);
  }
}

export class NoMessageProof extends NxtpError {
  constructor(index: number, leaf: string | undefined, context: any = {}) {
    super(`No index ${index} for message hash ${leaf}`, context, NoMessageProof.name);
  }
}
