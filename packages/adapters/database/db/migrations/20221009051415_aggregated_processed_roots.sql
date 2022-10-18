-- migrate:up
CREATE TABLE IF NOT EXISTS public.aggregated_roots (
    id character(66) NOT NULL UNIQUE,
    domain character varying(255) NOT NULL,
    received_root character(66) NOT NULL UNIQUE,
    domain_index numeric NOT NULL,
    PRIMARY KEY(domain_index, domain)
);

GRANT SELECT ON public.aggregated_roots to query;
GRANT SELECT ON public.aggregated_roots to reader;

CREATE TABLE IF NOT EXISTS public.propagated_roots (
    id character(66) NOT NULL PRIMARY KEY,
    aggregate_root character(66) NOT NULL UNIQUE,
    domains text[] NOT NULL,
    leaf_count numeric NOT NULL
);

GRANT SELECT ON public.propagated_roots to query;
GRANT SELECT ON public.propagated_roots to reader;


-- migrate:down
DROP TABLE IF EXISTS public.aggregated_roots;
DROP TABLE IF EXISTS public.propagated_roots;

