-- migrate:up
ALTER TABLE transfers DROP COLUMN slippage_tol cascade;
ALTER TABLE transfers
ADD COLUMN destination_min_out numeric;
-- migrate:down