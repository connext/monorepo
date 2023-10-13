-- migrate:up
ALTER TABLE snapshot_roots DROP CONSTRAINT snapshot_roots_id_key;
ALTER TABLE snapshot_roots
ADD PRIMARY KEY (id, spoke_domain);
-- migrate:down
ALTER TABLE snapshot_roots DROP CONSTRAINT snapshot_roots_pkey;
ALTER TABLE snapshot_roots
ADD CONSTRAINT snapshot_roots_id_key UNIQUE (id);