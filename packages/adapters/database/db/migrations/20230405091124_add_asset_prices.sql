-- migrate:up
CREATE TABLE IF NOT EXISTS public.asset_prices (
    id SERIAL PRIMARY KEY,
    canonical_id character(66) NOT NULL,
    canonical_domain character varying(255) NOT NULL,
    timestamp integer,
    price numeric,
    UNIQUE (canonical_id, canonical_domain, timestamp)
);

GRANT SELECT ON public.asset_prices to query;
GRANT SELECT ON public.asset_prices to reader;


ALTER TABLE transfers ADD column asset_usd_price numeric DEFAULT 0;

-- migrate:down
DROP TABLE IF EXISTS public.asset_prices;