-- migrate:up

ALTER TABLE public.transfers
ALTER COLUMN canonical_id TYPE character(66);

-- migrate:down

