-- migrate:up

-- 0. Alternate Raw Transfers view -> TTR & TTV per Transfer
CREATE OR REPLACE VIEW public.transfers_with_ttr_ttv AS (
	SELECT 
		tf.*,
		(tf.execute_timestamp - tf.xcall_timestamp)  AS ttr,
		(tf.reconcile_timestamp - tf.xcall_timestamp) AS ttv
	FROM transfers tf
);

GRANT SELECT ON public.transfers_with_ttr_ttv to query;


-- 1. Transfer metrics
CREATE  OR REPLACE VIEW public.daily_transfer_metrics AS (
    SELECT
	-- filters:
	date_trunc('day', to_timestamp(tf.xcall_timestamp))::date AS transfer_date,
	tf.origin_domain AS origin_chain,
	tf.destination_domain AS destination_chain,
	REGEXP_REPLACE(tf.routers::text, '[\{\}]', '', 'g') AS router,
	tf.origin_transacting_asset AS asset,

	-- aggs:
	COUNT(tf.transfer_id) AS transfer_count,
	COUNT(DISTINCT xcall_caller) AS unique_user_count,
	COUNT(
		CASE 
		WHEN tf.force_slow IS True 
		THEN tf.transfer_id 
		END
	) AS force_slow_transfer_count,
	COUNT(
		CASE WHEN tf.origin_bridged_amount = 0 
		THEN tf.transfer_id 
		END
	) AS zero_amount_transfer_count,	
	COUNT(
		CASE 
		WHEN tf.status = 'XCalled' 
		THEN tf.transfer_id 
		END	
	) AS XCalled_transfer_count,
	COUNT(
		CASE 
		WHEN tf.status = 'Executed' 
		THEN tf.transfer_id 
		END	
	) AS Executed_transfer_count,
	COUNT(
		CASE 
		WHEN tf.status = 'Reconciled' 
		THEN tf.transfer_id 
		END	
	) AS Reconciled_transfer_count,
	COUNT(
		CASE 
		WHEN tf.status = 'CompletedFast' 
		THEN tf.transfer_id 
		END	
	) AS CompletedFast_transfer_count,	
	COUNT(
		CASE 
		WHEN tf.status = 'CompletedSlow' 
		THEN tf.transfer_id 
		END	
	) AS CompletedSlow_transfer_count,
	AVG(
		CASE 
		WHEN tf.status = 'CompletedFast'
		THEN tf.execute_timestamp - tf.xcall_timestamp
		END
	) AS FastPath_avg_ttv_in_secs,
	AVG(
		CASE 
		WHEN tf.status = 'CompletedFast'
		THEN tf.reconcile_timestamp - tf.xcall_timestamp 
		END
	) AS FastPath_avg_ttr_in_secs,
	AVG(
		CASE 
		WHEN tf.status = 'CompletedSlow'
		THEN (tf.execute_timestamp - tf.xcall_timestamp) 
		END
	) AS SlowPath_avg_ttv_in_secs,
	AVG(
		CASE 
		WHEN tf.status = 'CompletedSlow'
		THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
		END
	) AS SlowPath_avg_ttr_in_secs

    FROM public.transfers tf
    GROUP BY 1,2,3,4,5
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
DROP VIEW IF EXISTS public.transfers_with_ttr_ttv;