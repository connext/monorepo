-- migrate:up

CREATE  OR REPLACE VIEW public.daily_transfer_metrics AS
    (
    SELECT

        date_trunc('day', to_timestamp(tf.xcall_timestamp))::date AS transfer_date,
        tf.status AS status,
        tf.origin_domain AS origin_chain,
        tf.destination_domain AS destination_chain,
        REGEXP_REPLACE(tf.routers::text, '[\{\}]', '', 'g') AS router,
        tf.origin_transacting_asset AS asset,
        COUNT(tf.transfer_id) AS transfer_count,
        COUNT(
            CASE WHEN tf.force_slow IS True THEN tf.transfer_id END
        ) AS force_slow_transfer_count,
        COUNT(DISTINCT xcall_caller) AS unique_user_count,
        COUNT(
            CASE WHEN tf.origin_bridged_amount = 0 THEN tf.transfer_id END
        ) AS zero_amount_transfer_count,
        AVG(tf.execute_timestamp - tf.xcall_timestamp) AS avg_ttv_in_secs,
        AVG(tf.reconcile_timestamp - tf.xcall_timestamp) AS avg_ttr_in_secs
        
    FROM public.transfers tf
    GROUP BY 1,2,3,4,5,6
    );
	
GRANT SELECT ON public.daily_transfer_metrics to query;



-- 2. Volume addition of new data
CREATE  OR REPLACE VIEW public.daily_transfer_volume AS ( 
    SELECT 
        tf.status,
        date_trunc('day', to_timestamp(tf.xcall_timestamp))::date AS transfer_date,
        tf.origin_domain AS origin_chain,
		tf.destination_domain AS destination_chain,
        REGEXP_REPLACE(tf.routers::text, '[\{\}]', '', 'g') AS router,
		tf.origin_transacting_asset AS asset,
        SUM(tf.origin_transacting_amount) As volume,
        COUNT(
            CASE WHEN tf.force_slow IS True THEN tf.origin_transacting_amount END
        ) AS force_slow_transfer_volume
    FROM public.transfers tf
    GROUP BY 1,2,3,4,5,6
    );
              
GRANT SELECT ON public.daily_transfer_volume to query;


-- 3. Daily TVL changes:
CREATE  OR REPLACE VIEW public.daily_router_tvl AS ( 
    SELECT 
        latest_transfer.latest_transfer_day,
        router_tvl.asset,
        router_tvl.router_address AS router,	
        router_tvl.tvl
    FROM
        (             
			SELECT 
				rb.local AS asset,
				rb.router_address,
				SUM(rb.balance) AS tvl
			FROM routers_with_balances rb
			GROUP BY 1,2
        ) AS router_tvl
    CROSS JOIN 
        (
            SELECT 
                MAX(date_trunc('day', to_timestamp(tf.xcall_timestamp))::date) AS latest_transfer_day
            FROM public.transfers tf 
        ) AS latest_transfer 
);

GRANT SELECT ON public.daily_router_tvl to query;


-- migrate:down
DROP VIEW IF EXISTS public.daily_transfer_metrics;
DROP VIEW IF EXISTS public.daily_transfer_volume;
DROP VIEW IF EXISTS public.daily_router_tvl;