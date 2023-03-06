-- migrate:up
ALTER TABLE transfers
ADD COLUMN updated_slippage NUMERIC;
-- migrate:down
ALTER TABLE transfers DROP COLUMN updated_slippage;