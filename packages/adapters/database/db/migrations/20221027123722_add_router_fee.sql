-- migrate:up
ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS routerFee numeric;

ALTER TABLE public.asset_balances
ADD COLUMN IF NOT EXISTS feesEarned numeric DEFAULT 0 NOT NULL;

-- migrate:down

