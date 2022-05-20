-- migrate:up
ALTER TABLE IF EXISTS transfers ADD COLUMN IF NOT EXISTS force_slow boolean DEFAULT NULL;
ALTER TABLE IF EXISTS transfers ADD COLUMN IF NOT EXISTS receive_local boolean DEFAULT NULL;

-- migrate:down
ALTER TABLE IF EXISTS transfers DROP COLUMN IF EXISTS force_slow;
ALTER TABLE IF EXISTS transfers DROP COLUMN IF EXISTS receive_local;

