-- migrate:up
CREATE INDEX transfers_xcall_tx_origin_idx ON public.transfers (xcall_tx_origin);
CREATE INDEX transfers_xcall_transaction_hash_idx ON public.transfers (xcall_transaction_hash);

-- migrate:down
DROP INDEX IF EXISTS transfers_xcall_tx_origin_idx;
DROP INDEX IF EXISTS transfers_xcall_transaction_hash_idx;
