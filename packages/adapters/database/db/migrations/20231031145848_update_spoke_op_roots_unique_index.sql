-- migrate:up
DROP INDEX IF EXISTS spoke_optimistic_roots_domain_root_idx;
CREATE UNIQUE INDEX ON public.spoke_optimistic_roots (domain, root, propose_timestamp);
-- migrate:down
