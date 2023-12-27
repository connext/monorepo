-- migrate:up
ALTER TABLE snapshot_roots DROP CONSTRAINT snapshot_roots_pkey;
ALTER TABLE snapshot_roots
ADD CONSTRAINT snapshot_roots_pkey PRIMARY KEY (spoke_domain, root);
-- migrate:down
ALTER TABLE snapshot_roots DROP CONSTRAINT snapshot_roots_pkey;
ALTER TABLE snapshot_roots
ADD CONSTRAINT snapshot_roots_pkey PRIMARY KEY (id, spoke_domain);