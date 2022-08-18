-- migrate:up
CREATE  OR REPLACE VIEW public.transfer_count AS ( 
    SELECT 
        tf.status,
        date_trunc('day', to_timestamp(tf.xcall_timestamp))::date AS transfer_day,
        tf.origin_domain AS origin_chain,
        tf.origin_transacting_asset AS asset,
        COUNT(tf.transfer_id) AS transfer_count
    FROM public.transfers tf
    GROUP BY 1,2,3,4 
    );
            
GRANT SELECT ON public.transfer_count to query;

--
-- 2. Transfer Volume: aggreagted on daily basis by status, chain, asset
--

CREATE  OR REPLACE VIEW public.transfer_volume AS ( 
    SELECT 
        tf.status,
        date_trunc('day', to_timestamp(tf.xcall_timestamp))::date AS transfer_day,
        tf.origin_domain AS origin_chain,
        tf.origin_transacting_asset AS asset,
        SUM(tf.origin_transacting_amount) As volume
    FROM public.transfers tf
    GROUP BY 1,2,3,4 
    );
              
GRANT SELECT ON public.transfer_volume to query;

-- 3. Router TVL

CREATE  OR REPLACE VIEW public.router_tvl AS ( 
    SELECT 
        latest_transfer.latest_transfer_day,
        router_tvl.asset,
        router_tvl.tvl
    FROM
        (             
            SELECT 
                rb.local AS asset,
                SUM(rb.balance) AS tvl
            FROM routers_with_balances rb
            GROUP BY 1 
        ) AS router_tvl
    CROSS JOIN 
        (
            SELECT 
                MAX(date_trunc('day', to_timestamp(tf.xcall_timestamp))::date) AS latest_transfer_day
            FROM public.transfers tf 
        ) AS latest_transfer 
);

GRANT SELECT ON public.router_tvl to query;



-- migrate:down
-- DROP VIEW IF EXISTS public.transfer_count_volume;
DROP VIEW IF EXISTS public.transfer_count;
DROP VIEW IF EXISTS public.transfer_volume;
DROP VIEW IF EXISTS public.router_tvl;