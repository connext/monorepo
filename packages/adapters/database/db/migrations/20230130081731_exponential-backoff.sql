-- migrate:up
ALTER TABLE "transfers"
ADD COLUMN "backoff" INT NOT NULL DEFAULT 32,
  ADD COLUMN "next_execution_secs" INT NOT NULL DEFAULT 0;
-- migrate:down
ALTER TABLE "transfers" DROP COLUMN "backoff",
  DROP COLUMN "next_execution";