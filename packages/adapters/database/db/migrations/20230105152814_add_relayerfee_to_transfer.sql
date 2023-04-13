-- migrate:up
ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS relayer_fee character varying (255);

-- migrate:down
