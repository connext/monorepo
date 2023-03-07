-- migrate:up
ALTER TABLE assets
ADD COLUMN decimal numeric DEFAULT 0;
-- migrate:down
ALTER TABLE assets DROP COLUMN decimal;