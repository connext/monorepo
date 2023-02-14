-- migrate:up
DROP VIEW IF EXISTS public.daily_router_tvl;

CREATE TABLE IF NOT EXISTS public.daily_router_tvl (
    id character varying(255) NOT NULL UNIQUE,
    domain character varying (255) NOT NULL,
    asset character(42) NOT NULL,
    router character(42) NOT NULL,
    day date NOT NULL,
    balance character varying (255) NOT NULL,
    PRIMARY KEY(id)
);

GRANT SELECT ON public.daily_router_tvl to query;
GRANT SELECT ON public.daily_router_tvl to reader;

-- migrate:down
DROP TABLE IF EXISTS public.daily_router_tvl;