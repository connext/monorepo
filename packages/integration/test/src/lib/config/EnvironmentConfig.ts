import { ChainConfig } from "@connext/nxtp-txservice";
import { ChainData } from "@connext/nxtp-utils";

export type DomainConfig = {
    chainData: ChainData;
    chainConfig: ChainConfig; 
}

export type DomainConfigs = {
    [key:number] : DomainConfig
}

export type UserAgentConfig = {
    mnemonic?: string,
}

export type RouterAgentConfig = { 
    domainCfgs: DomainConfig,
    routerMnemonic?: string,
}

export type SequencerAgentConfig = {
    mnemonic: string,
}

export type AgentConfig = UserAgentConfig | RouterAgentConfig | SequencerAgentConfig ;  

export type EnvironmentConfig = {
    domainCfgs: DomainConfigs,
    agentCfgs: AgentConfig
}
