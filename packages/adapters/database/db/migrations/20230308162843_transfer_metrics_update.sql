-- migrate:up
DROP VIEW IF EXISTS public.hourly_transfer_metrics;
DROP VIEW IF EXISTS public.daily_transfer_metrics;
CREATE VIEW public.hourly_transfer_metrics AS (
    SELECT (
            date_trunc(
                'hour'::text,
                to_timestamp((tf.xcall_timestamp)::double precision)
            )
        )::date AS transfer_date,
        tf.origin_domain AS origin_chain,
        tf.destination_domain AS destination_chain,
        count(tf.transfer_id) AS transfer_count,
        count(DISTINCT tf.xcall_caller) AS unique_user_count,
        count(
            CASE
                WHEN (tf.origin_bridged_amount = '0'::character) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS zero_amount_transfer_count,
        count(
            CASE
                WHEN (tf.status = 'XCalled'::public.transfer_status) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS xcalled_transfer_count,
        count(
            CASE
                WHEN (tf.status = 'Executed'::public.transfer_status) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS executed_transfer_count,
        count(
            CASE
                WHEN (tf.status = 'Reconciled'::public.transfer_status) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS reconciled_transfer_count,
        count(
            CASE
                WHEN (
                    tf.status = 'CompletedFast'::public.transfer_status
                ) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS completedfast_transfer_count,
        count(
            CASE
                WHEN (
                    tf.status = 'CompletedSlow'::public.transfer_status
                ) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS completedslow_transfer_count,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedFast'::public.transfer_status
                ) THEN (tf.execute_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS fastpath_avg_ttv_in_secs,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedFast'::public.transfer_status
                ) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS fastpath_avg_ttr_in_secs,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedSlow'::public.transfer_status
                ) THEN (tf.execute_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS slowpath_avg_ttv_in_secs,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedSlow'::public.transfer_status
                ) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS slowpath_avg_ttr_in_secs
    FROM public.transfers tf
    GROUP BY 1,
        2,
        3
    ORDER BY 1
);
CREATE VIEW public.daily_transfer_metrics AS (
    SELECT (
            date_trunc(
                'day'::text,
                to_timestamp((tf.xcall_timestamp)::double precision)
            )
        )::date AS transfer_date,
        tf.origin_domain AS origin_chain,
        tf.destination_domain AS destination_chain,
        count(tf.transfer_id) AS transfer_count,
        count(DISTINCT tf.xcall_caller) AS unique_user_count,
        count(
            CASE
                WHEN (tf.origin_bridged_amount = '0'::character) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS zero_amount_transfer_count,
        count(
            CASE
                WHEN (
                    tf.status = 'CompletedFast'::public.transfer_status
                ) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS completedfast_transfer_count,
        count(
            CASE
                WHEN (
                    tf.status = 'CompletedSlow'::public.transfer_status
                ) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS completedslow_transfer_count,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedFast'::public.transfer_status
                ) THEN (tf.execute_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS fastpath_avg_ttv_in_secs,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedFast'::public.transfer_status
                ) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS fastpath_avg_ttr_in_secs,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedSlow'::public.transfer_status
                ) THEN (tf.execute_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS slowpath_avg_ttv_in_secs,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedSlow'::public.transfer_status
                ) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS slowpath_avg_ttr_in_secs
    FROM public.transfers tf
    GROUP BY 1,
        2,
        3
    ORDER BY 1
);
CREATE VIEW public.weekly_transfer_metrics AS (
    SELECT (
            date_trunc(
                'week'::text,
                to_timestamp((tf.xcall_timestamp)::double precision)
            )
        )::date AS transfer_date,
        tf.origin_domain AS origin_chain,
        tf.destination_domain AS destination_chain,
        count(tf.transfer_id) AS transfer_count,
        count(DISTINCT tf.xcall_caller) AS unique_user_count,
        count(
            CASE
                WHEN (tf.origin_bridged_amount = '0'::character) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS zero_amount_transfer_count,
        count(
            CASE
                WHEN (
                    tf.status = 'CompletedFast'::public.transfer_status
                ) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS completedfast_transfer_count,
        count(
            CASE
                WHEN (
                    tf.status = 'CompletedSlow'::public.transfer_status
                ) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS completedslow_transfer_count,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedFast'::public.transfer_status
                ) THEN (tf.execute_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS fastpath_avg_ttv_in_secs,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedFast'::public.transfer_status
                ) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS fastpath_avg_ttr_in_secs,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedSlow'::public.transfer_status
                ) THEN (tf.execute_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS slowpath_avg_ttv_in_secs,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedSlow'::public.transfer_status
                ) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS slowpath_avg_ttr_in_secs
    FROM public.transfers tf
    GROUP BY 1,
        2,
        3
    ORDER BY 1
);
CREATE VIEW public.weekly_connext_metrics AS (
    SELECT (
            date_trunc(
                'day'::text,
                to_timestamp((tf.xcall_timestamp)::double precision)
            )
        )::date AS transfer_date,
        count(tf.transfer_id) AS transfer_count,
        count(DISTINCT tf.xcall_caller) AS unique_user_count,
        count(
            CASE
                WHEN (tf.origin_bridged_amount = '0'::character) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS zero_amount_transfer_count,
        count(
            CASE
                WHEN (
                    tf.status = 'CompletedFast'::public.transfer_status
                ) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS completedfast_transfer_count,
        count(
            CASE
                WHEN (
                    tf.status = 'CompletedSlow'::public.transfer_status
                ) THEN tf.transfer_id
                ELSE NULL::bpchar
            END
        ) AS completedslow_transfer_count,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedFast'::public.transfer_status
                ) THEN (tf.execute_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS fastpath_avg_ttv_in_secs,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedFast'::public.transfer_status
                ) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS fastpath_avg_ttr_in_secs,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedSlow'::public.transfer_status
                ) THEN (tf.execute_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS slowpath_avg_ttv_in_secs,
        avg(
            CASE
                WHEN (
                    tf.status = 'CompletedSlow'::public.transfer_status
                ) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
                ELSE NULL::integer
            END
        ) AS slowpath_avg_ttr_in_secs
    FROM public.transfers tf
    GROUP BY 1
    ORDER BY 1
);
GRANT SELECT ON public.hourly_transfer_metrics to query;
GRANT SELECT ON public.hourly_transfer_metrics to reader;
GRANT SELECT ON public.daily_transfer_metrics to query;
GRANT SELECT ON public.daily_transfer_metrics to reader;
GRANT SELECT ON public.weekly_transfer_metrics to query;
GRANT SELECT ON public.weekly_transfer_metrics to reader;
GRANT SELECT ON public.weekly_connext_metrics to query;
GRANT SELECT ON public.weekly_connext_metrics to reader;
-- migrate:down
DROP VIEW IF EXISTS public.hourly_transfer_metrics;
DROP VIEW IF EXISTS public.daily_transfer_metrics;
DROP VIEW IF EXISTS public.weekly_transfer_metrics;
DROP VIEW IF EXISTS public.weekly_connext_metrics;