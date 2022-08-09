-- migrate:up
-- 
-- Overall Transfer count
-- 
CREATE  OR REPLACE VIEW public.transfers_count AS (
	SELECT 
		COUNT(DISTINCT transfer_id) AS number_of_transfers
	FROM transfers
	);


CREATE  OR REPLACE VIEW public.average_ttv_ttr_in_secs AS (
    WITH raw_transfers AS (
        SELECT 
            tf.status,
            tf.origin_domain,
            tf.transfer_id,
            coalesce(
                to_timestamp(tf.xcall_timestamp),
                to_timestamp(tf.reconcile_timestamp),
                to_timestamp(tf.execute_timestamp)
            )::date AS transfer_timestamp,
            tf.execute_timestamp - tf.xcall_timestamp AS ttv_diff_sec,
            tf.reconcile_timestamp - tf.execute_timestamp AS ttr_diff_sec

        FROM transfers tf
        -- filter XCalled status
        WHERE tf.status != 'XCalled'
    )

    -- ttv_ttr_stats AS 

    SELECT 
        rt.transfer_timestamp,
        rt.status,
        rt.origin_domain,
        COUNT(transfer_id) AS transfer_count,
        AVG(ttv_diff_sec) AS avg_ttv_in_secs,
        AVG(ttr_diff_sec) AS avg_ttr_in_secs
    FROM raw_transfers rt
    GROUP BY 1,2,3
    ORDER BY 1
);


CREATE  OR REPLACE VIEW public.daily_average_ttv_ttr_in_secs AS (
    WITH raw_transfers AS (
        SELECT 
            tf.status,
            tf.origin_domain,
            tf.transfer_id,
            coalesce(
                to_timestamp(tf.xcall_timestamp),
                to_timestamp(tf.reconcile_timestamp),
                to_timestamp(tf.execute_timestamp)
            )::date AS transfer_timestamp,
            tf.execute_timestamp - tf.xcall_timestamp AS ttv_diff_sec,
            tf.reconcile_timestamp - tf.execute_timestamp AS ttr_diff_sec

        FROM transfers tf
        -- filter XCalled status
        WHERE tf.status != 'XCalled'
    )

    -- ttv_ttr_stats AS 

    SELECT 
        rt.transfer_timestamp,
        rt.status,
        rt.origin_domain,
        COUNT(transfer_id) AS transfer_count,
        AVG(ttv_diff_sec) AS avg_ttv_in_secs,
        AVG(ttr_diff_sec) AS avg_ttr_in_secs
    FROM raw_transfers rt
    GROUP BY 1,2,3
    ORDER BY 1
);


CREATE  OR REPLACE VIEW public.agg_volume_transfer_by_period AS (
    WITH raw_transfers AS (
        SELECT 
            tf.status,
            tf.origin_domain,
            tf.transfer_id,
            coalesce(
                to_timestamp(tf.xcall_timestamp),
                to_timestamp(tf.reconcile_timestamp),
                to_timestamp(tf.execute_timestamp)
            )::date AS transfer_timestamp,
            tf.origin_transacting_asset AS asset,
            tf.origin_transacting_amount AS amount,	
            tf.routers,
            tf.to AS wallet_id
        FROM transfers tf
        -- not to include Reconciled, Not sure about -> 'XCalled'
        WHERE tf.status NOT IN ('Reconciled')
    )


    SELECT period_agg.* FROM (

        -- overall
        SELECT
            'All Time' AS time_period,
            rt.asset AS asset,
            rt.origin_domain AS domain,
            COUNT(rt.transfer_id) AS transfer_count,
            SUM(rt.amount) AS volume,
            min(rt.transfer_timestamp) || ' : ' || max(rt.transfer_timestamp)  AS date
        
        FROM raw_transfers rt
        GROUP BY 1,2,3
        
        UNION ALL
        
        -- last 7 days
        SELECT
            'last 7 days' AS time_period,
            rt.asset AS asset,
            rt.origin_domain AS domain,
            COUNT(rt.transfer_id) AS transfer_count,
            SUM(rt.amount) AS volume,
            min(rt.transfer_timestamp) || ' : ' || max(rt.transfer_timestamp)  AS date
        FROM raw_transfers rt
        WHERE rt.transfer_timestamp > current_date - interval '7 days'
        GROUP BY 1,2,3
        
        UNION ALL

        -- last 30 days
        SELECT
            'last 30 days' AS time_period,
            rt.asset AS asset,
            rt.origin_domain AS domain,
            COUNT(rt.transfer_id) AS transfer_count,
            SUM(rt.amount) AS volume,
            min(rt.transfer_timestamp) || ' : ' || max(rt.transfer_timestamp)  AS date
        FROM raw_transfers rt
        WHERE rt.transfer_timestamp > current_date - interval '30 days'
        GROUP BY 1,2,3
        
        UNION ALL

        -- last 90 days
        SELECT
            'last 90 days' AS time_period,
            rt.asset AS asset,
            rt.origin_domain AS domain,
            COUNT(rt.transfer_id) AS transfer_count,
            SUM(rt.amount) AS volume,
            min(rt.transfer_timestamp) || ' : ' || max(rt.transfer_timestamp)  AS date
        FROM raw_transfers rt
        WHERE rt.transfer_timestamp > current_date - interval '90 days'
        GROUP BY 1,2,3
    ) AS period_agg

);


grant select on public.transfers_count to query;
grant select on public.average_ttv_ttr_in_secs to query;
grant select on public.daily_average_ttv_ttr_in_secs to query;
grant select on public.agg_volume_transfer_by_period to query;

-- migrate:down

