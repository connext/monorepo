-- migrate:up
ALTER TABLE transfers
ADD COLUMN xcall_tx_origin character(42),
  ADD COLUMN execute_tx_origin character(42),
  ADD COLUMN reconcile_tx_origin character(42);
-- migrate:down
ALTER TABLE transfers DROP COLUMN xcall_tx_origin,
  DROP COLUMN execute_tx_origin,
  DROP COLUMN reconcile_tx_origin;