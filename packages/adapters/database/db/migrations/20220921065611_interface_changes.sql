-- migrate:up

-- 
-- Add new interface params
-- 
ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS message_hash character(66);

ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS canonical_domain character varying(255);

ALTER TABLE public.transfers
RENAME COLUMN agent TO delegate;

ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS slippage numeric;

ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS origin_sender character(42);

ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS bridged_amt numeric;

ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS normalized_in numeric;

ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS canonical_id character(42);

-- 
-- cleanup interface params
-- 
ALTER TABLE public.transfers
DROP COLUMN IF EXISTS destination_min_out cascade;
-- migrate:down