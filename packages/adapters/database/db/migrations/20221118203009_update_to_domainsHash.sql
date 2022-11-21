-- migrate:up
ALTER TABLE public.propagated_roots
DROP COLUMN domains;
ALTER TABLE public.propagated_roots
ADD COLUMN IF NOT EXISTS domains_hash text;


-- migrate:down
ALTER TABLE public.propagated_roots
DROP COLUMN domains_hash;
ALTER TABLE public.propagated_roots
ADD COLUMN IF NOT EXISTS domains text[];

