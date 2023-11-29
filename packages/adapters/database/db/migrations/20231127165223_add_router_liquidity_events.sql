-- migrate:up
CREATE TYPE event_type AS ENUM (
  'Add',
  'Remove'
);

CREATE TABLE IF NOT EXISTS public.router_liquidity_events (
    id character varying(255) NOT NULL UNIQUE,
    domain character varying (255) NOT NULL,
    router character (42) NOT NULL,
    event event_type DEFAULT 'Add'::event_type NOT NULL,
    asset character (42) NOT NULL,
    amount numeric DEFAULT 0,
    balance numeric DEFAULT 0,
    block_number integer NOT NULL,
    transaction_hash character(66) NOT NULL,
    timestamp integer NOT NULL,
    nonce numeric DEFAULT 0 NOT NULL,
    PRIMARY KEY(id)
);

GRANT SELECT ON public.router_liquidity_events to query;
GRANT SELECT ON public.router_liquidity_events to reader;


-- migrate:down
DROP TABLE IF EXISTS public.router_liquidity_events;
DROP TYPE event_type;

