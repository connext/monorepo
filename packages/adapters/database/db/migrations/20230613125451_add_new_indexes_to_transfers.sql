-- migrate:up
CREATE INDEX IF NOT EXISTS transfers_origin_domain_nonce_idx ON public.transfers (origin_domain, nonce);

-- migrate:down
DROP INDEX IF EXISTS transfers_origin_domain_nonce_idx;