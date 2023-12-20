-- migrate:up
ALTER TABLE spoke_optimistic_roots
ADD CONSTRAINT spoke_optimistic_roots_pkey PRIMARY KEY (id);
-- migrate:down
ALTER TABLE spoke_optimistic_roots DROP CONSTRAINT spoke_optimistic_roots_pkey;