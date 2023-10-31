-- migrate:up
ALTER TABLE public.snapshots
    ADD COLUMN IF NOT EXISTS proposed_timestamp integer;
ALTER TABLE public.snapshots
    ADD COLUMN IF NOT EXISTS finalized_timestamp integer;

-- migrate:down
ALTER TABLE public.snapshots 
    DROP COLUMN proposed_timestamp;
ALTER TABLE public.snapshots 
    DROP COLUMN finalized_timestamp;
