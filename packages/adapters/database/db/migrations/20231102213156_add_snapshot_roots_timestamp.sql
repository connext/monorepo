-- migrate:up
ALTER TABLE public.snapshot_roots
ADD COLUMN IF NOT EXISTS timestamp integer NOT NULL;
-- migrate:down
ALTER TABLE public.snapshot_roots DROP COLUMN timestamp;