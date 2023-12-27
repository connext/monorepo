-- migrate:up
ALTER TABLE snapshots
ADD CONSTRAINT snapshots_id_pkey PRIMARY KEY (id);
-- migrate:down
ALTER TABLE snapshots DROP CONSTRAINT snapshots_id_pkey;