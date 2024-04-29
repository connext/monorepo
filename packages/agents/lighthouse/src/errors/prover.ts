import { NxtpError, Snapshot } from "@connext/nxtp-utils";

export class NoDestinationDomainForProof extends NxtpError {
  constructor(destinationDomain: string, context: any = {}) {
    super(
      `No destination for proof available for domain ${destinationDomain}`,
      context,
      NoDestinationDomainForProof.name,
    );
  }
}

export class NoOriginDomainConnext extends NxtpError {
  constructor(originDomain: string, context: any = {}) {
    super(`No origin domain Connext available for domain ${originDomain}`, context, NoOriginDomainConnext.name);
  }
}

export class NoDestinationDomainConnext extends NxtpError {
  constructor(destinationDomain: string, context: any = {}) {
    super(`No connext found on destination domain ${destinationDomain}`, context, NoDestinationDomainConnext.name);
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

export class NoFinalizedAggregateRoot extends NxtpError {
  constructor(domain: string | undefined, context: any = {}) {
    super(`No finalized aggregate root in ${domain}`, context, NoFinalizedAggregateRoot.name);
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

export class NoBaseAggregateRootCount extends NxtpError {
  constructor(aggregateRoot: string, context: any = {}) {
    super(`No base aggregate root count found for ${aggregateRoot}`, context, NoBaseAggregateRootCount.name);
  }
}
export class NoBaseAggregateRoot extends NxtpError {
  constructor(context: any = {}) {
    super(`No base aggregate root found`, context, NoBaseAggregateRoot.name);
  }
}

export class NoMessageRoot extends NxtpError {
  constructor(originDomain: string, messageRoot: string, context: any = {}) {
    super(
      `No message with message root ${messageRoot} found in origin domain ${originDomain}`,
      context,
      NoMessageRoot.name,
    );
  }
}

export class NoDomainInSnapshot extends NxtpError {
  constructor(originDomain: string, snapshot: Snapshot, context: any = {}) {
    super(`No domain ${originDomain} found in snapshot ${snapshot}`, context, NoDomainInSnapshot.name);
  }
}

export class AggregateRootDuplicated extends NxtpError {
  constructor(aggregateRoot: string, context: any = {}) {
    super(`Trying to propose same aggregate root for ${aggregateRoot}`, context, AggregateRootDuplicated.name);
  }
}

export class EmptyMessageProofs extends NxtpError {
  constructor(originDomain: string, destinationDomain: string, context: any = {}) {
    super(
      `Empty message proofs for origin: ${originDomain} and destination: ${destinationDomain}`,
      context,
      EmptyMessageProofs.name,
    );
  }
}

export class ExecutionLayerPaused extends NxtpError {
  constructor(connext: string, domain: string, context: any = {}) {
    super(`Execution layer paused, connext: ${connext} and domain: ${domain}`, context, EmptyMessageProofs.name);
  }
}
