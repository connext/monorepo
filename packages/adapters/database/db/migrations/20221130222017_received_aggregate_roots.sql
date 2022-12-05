-- migrate:up
CREATE TABLE IF NOT EXISTS public.received_aggregate_roots (
    id character(66) NOT NULL,
    domain character varying(255) NOT NULL,
    root character(66) NOT NULL,
    block_number integer NOT NULL,
    PRIMARY KEY(root, domain)
);
GRANT SELECT ON public.received_aggregate_roots to query;
GRANT SELECT ON public.received_aggregate_roots to reader;

-- migrate:down
DROP TABLE IF EXISTS public.received_aggregate_roots;