-- migrate:up
ALTER TABLE "root_messages"
ALTER COLUMN "id" TYPE text;
-- migrate:down
ALTER TABLE "root_messages"
ALTER COLUMN "id" TYPE character(66);