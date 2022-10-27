-- migrate:up
ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS router_fee numeric;

ALTER TABLE public.asset_balances
ADD COLUMN IF NOT EXISTS fees_earned numeric DEFAULT 0 NOT NULL;

-- migrate:down

