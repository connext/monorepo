-- migrate:up
CREATE TABLE IF NOT EXISTS public.merkle_cache (
    domain character varying(255) NOT NULL,
    domain_path character(32) NOT NULL,
    tree_root character(66) NOT NULL,
    PRIMARY KEY(domain, domain_path)
);

GRANT SELECT ON public.merkle_cache to query;
GRANT SELECT ON public.merkle_cache to reader;

-- migrate:down
DROP TABLE IF EXISTS public.merkle_cache;

