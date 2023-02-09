-- migrate:up
CREATE  OR REPLACE VIEW public.daily_swap_tvl AS ( 
    SELECT 
        e.pool_id,
        e.domain,
        date_trunc('day', to_timestamp(e.timestamp))::date AS day,
        ARRAY(select unnest((array_agg(e.balances ORDER BY e.timestamp DESC))[1:1])) as balances
    FROM ((select pool_id, domain, balances, timestamp from stableswap_pool_events) union all (select pool_id, domain, balances, timestamp from stableswap_exchanges)) e
    GROUP BY 1,2,3
    );
              

GRANT SELECT ON public.daily_swap_tvl to query;
GRANT SELECT ON public.daily_swap_tvl to reader;


-- migrate:down
DROP TABLE IF EXISTS public.daily_swap_tvl;
