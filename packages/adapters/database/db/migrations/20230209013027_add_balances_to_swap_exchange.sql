-- migrate:up
ALTER TABLE public.stableswap_exchanges
ADD COLUMN IF NOT EXISTS balances numeric [] DEFAULT array[]::numeric[] NOT NULL;

-- migrate:down

