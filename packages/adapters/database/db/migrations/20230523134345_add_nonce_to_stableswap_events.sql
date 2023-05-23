-- migrate:up
ALTER TABLE public.stableswap_pool_events
ADD COLUMN IF NOT EXISTS nonce numeric DEFAULT 0 NOT NULL;

ALTER TABLE public.stableswap_exchanges
ADD COLUMN IF NOT EXISTS nonce numeric DEFAULT 0 NOT NULL;

ALTER TABLE public.stableswap_lp_transfers
ADD COLUMN IF NOT EXISTS nonce numeric DEFAULT 0 NOT NULL;

-- migrate:down
ALTER TABLE stableswap_pool_events DROP COLUMN nonce;
ALTER TABLE stableswap_exchanges DROP COLUMN nonce;
ALTER TABLE stableswap_lp_transfers DROP COLUMN nonce;
