-- migrate:up
ALTER TABLE "aggregated_roots"
ALTER COLUMN "id" TYPE text;
-- migrate:down
ALTER TABLE "aggregated_roots"
ALTER COLUMN "id" TYPE character(66);