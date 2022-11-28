-- migrate:up

-- Daily Transfer Metrics
CREATE OR REPLACE VIEW public.daily_transfer_metrics AS (
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

  FROM transfers tf
  GROUP BY 1,2,3,4,5
);
	
GRANT SELECT ON public.daily_transfer_metrics to query;

-- Daily Transfer Volume
CREATE OR REPLACE VIEW public.daily_transfer_volume AS ( 
  SELECT 
    tf.status,
    date_trunc('day', to_timestamp(tf.xcall_timestamp))::date AS transfer_date,
    tf.origin_domain AS origin_chain,
		tf.destination_domain AS destination_chain,
    REGEXP_REPLACE(tf.routers::text, '[\{\}]', '', 'g') AS router,
		tf.origin_transacting_asset AS asset,
    SUM(tf.origin_transacting_amount) As volume
  FROM public.transfers tf
  GROUP BY 1,2,3,4,5,6
);
              
GRANT SELECT ON public.daily_transfer_volume to query;

-- Hourly Transfer Metrics
CREATE  OR REPLACE VIEW public.hourly_transfer_metrics AS (
  SELECT
    -- filters:
    date_trunc('hour', to_timestamp(tf.xcall_timestamp)) AS transfer_hour,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    REGEXP_REPLACE(tf.routers::text, '[\{\}]', '', 'g') AS router,
    tf.origin_transacting_asset AS asset,

    -- aggs:
    COUNT(tf.transfer_id) AS transfer_count,
    COUNT(DISTINCT xcall_caller) AS unique_user_count,
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

GRANT SELECT ON public.hourly_transfer_metrics to query;

-- Hourly Transfer Volume
CREATE OR REPLACE VIEW public.hourly_transfer_volume AS ( 
  SELECT 
    tf.status,
    date_trunc('hour', to_timestamp(tf.xcall_timestamp)) AS transfer_hour,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    REGEXP_REPLACE(tf.routers::text, '[\{\}]', '', 'g') AS router,
    tf.origin_transacting_asset AS asset,
    SUM(tf.origin_transacting_amount) As volume
  FROM public.transfers tf
  GROUP BY 1,2,3,4,5,6
  );
              
GRANT SELECT ON public.hourly_transfer_volume to query;

-- Transfers with TTR and TTV
CREATE OR REPLACE VIEW public.transfers_with_ttr_ttv AS (
	SELECT 
		tf.*,
		(tf.execute_timestamp - tf.xcall_timestamp) AS ttr,
		(tf.reconcile_timestamp - tf.xcall_timestamp) AS ttv
	FROM public.transfers tf
);

GRANT SELECT ON public.transfers_with_ttr_ttv to query;

-- migrate:down
DROP VIEW IF EXISTS public.daily_transfer_metrics;
DROP VIEW IF EXISTS public.daily_transfer_volume;
DROP VIEW IF EXISTS public.hourly_transfer_metrics;
DROP VIEW IF EXISTS public.hourly_transfer_volume;
DROP VIEW IF EXISTS public.transfers_with_ttr_ttv;
