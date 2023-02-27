-- migrate:up
CREATE  OR REPLACE VIEW public.daily_swap_tvl AS ( 
     SELECT 
        *, 
        (SELECT SUM(b) FROM unnest(balances) b) as total_tvl 
        FROM (SELECT 
                e.pool_id,
                e.domain,
                date_trunc('day', to_timestamp(e.timestamp))::date AS day,       
                ARRAY(SELECT unnest((array_agg(e.balances ORDER BY e.timestamp DESC))[1:1])) as balances,
                SUM(fee) as total_fee,
                SUM(e.vol) as total_vol
            FROM ((SELECT pool_id, domain, balances, (SELECT SUM(f) FROM unnest(fees) f) as fee, 0 as vol, timestamp FROM stableswap_pool_events) 
                UNION ALL (SELECT pool_id, domain, balances, fee, (tokens_sold + tokens_bought) / 2 as vol, timestamp FROM stableswap_exchanges)) e
            GROUP BY 1,2,3
            ORDER BY 3) as r
    );
              

GRANT SELECT ON public.daily_swap_tvl to query;
GRANT SELECT ON public.daily_swap_tvl to reader;


-- migrate:down
DROP TABLE IF EXISTS public.daily_swap_tvl;
