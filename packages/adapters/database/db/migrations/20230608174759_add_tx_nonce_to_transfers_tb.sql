-- migrate:up
ALTER TABLE public.transfers
    ADD COLUMN IF NOT EXISTS execute_tx_nonce numeric DEFAULT 0 NOT NULL,
    ADD COLUMN IF NOT EXISTS reconcile_tx_nonce numeric DEFAULT 0 NOT NULL;


-- migrate:down
ALTER TABLE transfers 
    DROP COLUMN execute_tx_nonce,
    DROP COLUMN reconcile_tx_nonce;
