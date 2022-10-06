-- migrate:up
CREATE TABLE IF NOT EXISTS public.merkel_messages (
    domain_index numeric NOT NULL,
    domain character varying(255) NOT NULL,
    message_hash character(66) NOT NULL,
    PRIMARY KEY(domain_index, domain)
);

GRANT SELECT ON public.merkel_messages to query;
GRANT SELECT ON public.merkel_messages to reader;

CREATE TABLE IF NOT EXISTS public.merkel_roots (
    id numeric NOT NULL,
    outbound_root character(66) NOT NULL
);

GRANT SELECT ON public.merkel_roots to query;
GRANT SELECT ON public.merkel_roots to reader;

CREATE TABLE IF NOT EXISTS public.merkel_cache (
    domain character varying(255) NOT NULL,
    domain_path character(32) NOT NULL,
    tree_hash character(66) NOT NULL,
    PRIMARY KEY(domain, domain_path)
);

GRANT SELECT ON public.merkel_cache to query;
GRANT SELECT ON public.merkel_cache to reader;


-- migrate:down
DROP TABLE IF EXISTS public.merkel_messages;
DROP TABLE IF EXISTS public.merkel_roots;
DROP TABLE IF EXISTS public.merkel_cache;

