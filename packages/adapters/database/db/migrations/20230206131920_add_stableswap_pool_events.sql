-- migrate:up
CREATE TYPE action_type AS ENUM (
  'Add',
  'Remove'
);

CREATE TABLE IF NOT EXISTS public.stableswap_pool_events (
    id character varying(255) NOT NULL UNIQUE,
    pool_id character(66) NOT NULL,
    domain character varying (255) NOT NULL,
    provider character (42) NOT NULL,
    action action_type DEFAULT 'Add'::action_type NOT NULL,
    pooled_tokens text [],
    pool_token_decimals integer [],
    token_amounts numeric [],
    balances numeric [],
    lp_token_amount numeric NOT NULL,
    lp_token_supply numeric NOT NULL,
    block_number integer NOT NULL,
    transaction_hash character(66) NOT NULL,
    timestamp integer NOT NULL,
    PRIMARY KEY(id)
);

GRANT SELECT ON public.stableswap_pool_events to query;
GRANT SELECT ON public.stableswap_pool_events to reader;


-- migrate:down
DROP TABLE IF EXISTS public.stableswap_pool_events;
DROP TYPE action_type;

