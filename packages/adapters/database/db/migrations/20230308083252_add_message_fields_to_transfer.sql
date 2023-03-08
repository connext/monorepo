-- migrate:up
ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS message_status character varying(255);

ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS message character(66);
-- migrate:down

