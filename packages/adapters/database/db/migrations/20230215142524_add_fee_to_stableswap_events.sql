-- migrate:up
ALTER TABLE public.stableswap_exchanges
ADD COLUMN IF NOT EXISTS fee numeric DEFAULT 0 NOT NULL;

ALTER TABLE public.stableswap_pool_events
ADD COLUMN IF NOT EXISTS fees numeric[] DEFAULT array[]::numeric[] NOT NULL;


-- migrate:down
ALTER TABLE public.stableswap_exchanges DROP COLUMN fee;
ALTER TABLE public.stableswap_pool_events DROP COLUMN fees;
