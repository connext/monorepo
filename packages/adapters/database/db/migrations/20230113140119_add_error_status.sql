-- migrate:up
ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS error_status character varying(255);

-- migrate:down

