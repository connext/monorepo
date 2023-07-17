-- migrate:up
ALTER TABLE public.messages DROP CONSTRAINT messages_pkey;
ALTER TABLE public.messages ADD PRIMARY KEY (origin_domain, index);

CREATE INDEX messages_domain_leaf_idx ON public.messages (origin_domain, leaf);

-- migrate:down
DROP INDEX IF EXISTS messages_domain_leaf_idx;