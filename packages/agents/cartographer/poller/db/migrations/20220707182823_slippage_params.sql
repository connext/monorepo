-- migrate:up
ALTER TABLE transfers DROP COLUMN idx;
ALTER TABLE transfers
  RENAME COLUMN xcall_relayer_fee TO relayer_fee;
ALTER TABLE transfers DROP COLUMN execute_relayer_fee;
ALTER TABLE transfers
ADD COLUMN agent character(42);
ALTER TABLE transfers
ADD COLUMN slippage_tol numeric;
-- migrate:down