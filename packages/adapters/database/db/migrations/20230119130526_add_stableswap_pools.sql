-- migrate:up
CREATE TABLE IF NOT EXISTS public.stableswap_pools (
    key character(66) NOT NULL,
    domain character varying(255) NOT NULL,
    is_active boolean DEFAULT false,
    lp_token character(42) NOT NULL,
    initial_a integer NOT NULL,
    future_a integer NOT NULL,
    initial_a_time integer NOT NULL,
    future_a_time integer NOT NULL,
    swap_fee character varying (255) NOT NULL,
    admin_fee character varying (255) NOT NULL,
    pooled_tokens text [],
    token_precision_multipliers text [],
    pool_token_decimals integer [],
    balances text [],
    virtual_price character varying (255) NOT NULL,
    invariant character varying (255) NOT NULL,
    lp_token_supply character varying (255) NOT NULL,
    PRIMARY KEY(domain, key)
);

CREATE TABLE IF NOT EXISTS public.stableswap_exchanges (
    id character varying(255) NOT NULL UNIQUE,
    pool_id character(66) NOT NULL,
    domain character varying (255) NOT NULL,
    buyer character (42) NOT NULL,
    bought_id integer NOT NULL,
    sold_id integer NOT NULL,
    tokens_sold numeric NOT NULL,
    tokens_bought numeric NOT NULL,
    block_number integer NOT NULL,
    transaction_hash character(66) NOT NULL,
    timestamp integer NOT NULL,
    PRIMARY KEY(domain, id)
);

CREATE  OR REPLACE VIEW public.hourly_swap_volume AS ( 
    SELECT 
        swap.pool_id,
        swap.domain,
        date_trunc('hour', to_timestamp(swap.timestamp)) AS swap_hour,
        SUM((swap.tokens_sold
         + swap.tokens_bought) / 2) As volume,
        COUNT(
            swap.pool_id
        ) AS swap_count
    FROM public.stableswap_exchanges swap
    GROUP BY 1,2,3
    );

CREATE  OR REPLACE VIEW public.daily_swap_volume AS ( 
    SELECT 
        swap.pool_id,
        swap.domain,
        date_trunc('day', to_timestamp(swap.timestamp))::date AS swap_day,
        SUM((swap.tokens_sold
         + swap.tokens_bought) / 2) As volume,
        COUNT(
            swap.pool_id
        ) AS swap_count
    FROM public.stableswap_exchanges swap
    GROUP BY 1,2,3
    );
              

GRANT SELECT ON public.stableswap_pools to query;
GRANT SELECT ON public.stableswap_pools to reader;
GRANT SELECT ON public.stableswap_exchanges to query;
GRANT SELECT ON public.stableswap_exchanges to reader;
GRANT SELECT ON public.hourly_swap_volume to query;
GRANT SELECT ON public.hourly_swap_volume to reader;
GRANT SELECT ON public.daily_swap_volume to query;
GRANT SELECT ON public.daily_swap_volume to reader;


-- migrate:down
DROP TABLE IF EXISTS public.stableswap_pools;
DROP TABLE IF EXISTS public.stableswap_exchanges;
DROP TABLE IF EXISTS public.hourly_swap_volume;
DROP TABLE IF EXISTS public.daily_swap_volume;