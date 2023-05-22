-- migrate:up
DROP VIEW IF EXISTS public.stableswap_lp_balances;

CREATE TABLE IF NOT EXISTS public.stableswap_lp_transfers (
    id character varying(255) NOT NULL UNIQUE,
    pool_id character(66) NOT NULL,
    domain character varying (255) NOT NULL,
    lp_token character (42) NOT NULL,
    from_address character (42) NOT NULL,
    to_address character (42) NOT NULL,
    pooled_tokens text [],
    amount numeric NOT NULL,
    balances numeric [],
    block_number integer NOT NULL,
    transaction_hash character(66) NOT NULL,
    timestamp integer NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE IF NOT EXISTS public.stableswap_lp_balances (
    pool_id character(66) NOT NULL,
    domain character varying (255) NOT NULL,
    provider character (42) NOT NULL,
    lp_token character (42) NOT NULL,
    balance numeric NOT NULL,
    last_timestamp integer NOT NULL,
    PRIMARY KEY(pool_id, domain, provider)
);

GRANT SELECT ON public.stableswap_lp_transfers to query;
GRANT SELECT ON public.stableswap_lp_transfers to reader;

-- migrate:down
DROP TABLE IF EXISTS public.stableswap_lp_transfers;
DROP TABLE IF EXISTS public.stableswap_lp_balances;
