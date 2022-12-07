-- migrate:up
DROP VIEW IF EXISTS public.daily_transfer_metrics;
DROP VIEW IF EXISTS public.daily_transfer_volume;
DROP VIEW IF EXISTS public.hourly_transfer_metrics;
DROP VIEW IF EXISTS public.hourly_transfer_volume;
DROP VIEW IF EXISTS public.transfers_with_ttr_ttv;
DROP VIEW IF EXISTS public.transfer_volume;

ALTER TABLE public.transfers
ALTER COLUMN origin_transacting_amount TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN origin_bridged_amount TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN xcall_gas_price TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN xcall_gas_limit TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN destination_transacting_amount TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN destination_local_amount TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN execute_gas_price TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN execute_gas_limit TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN reconcile_gas_price TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN reconcile_gas_limit TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN bridged_amt TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN normalized_in TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN router_fee TYPE character varying (255);

CREATE VIEW public.daily_transfer_metrics AS
 SELECT (date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date AS transfer_date,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text) AS router,
    tf.origin_transacting_asset AS asset,
    count(tf.transfer_id) AS transfer_count,
    count(DISTINCT tf.xcall_caller) AS unique_user_count,
    count(
        CASE
            WHEN (tf.origin_bridged_amount = '0'::character) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS zero_amount_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'XCalled'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS xcalled_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'Executed'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS executed_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'Reconciled'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS reconciled_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS completedfast_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS completedslow_transfer_count,
    avg(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS fastpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS fastpath_avg_ttr_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS slowpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS slowpath_avg_ttr_in_secs
   FROM public.transfers tf
  GROUP BY ((date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date), tf.origin_domain, tf.destination_domain, (regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text)), tf.origin_transacting_asset;

CREATE VIEW public.daily_transfer_volume AS
 SELECT tf.status,
    (date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date AS transfer_date,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text) AS router,
    tf.origin_transacting_asset AS asset,
    sum(tf.origin_transacting_amount::numeric) AS volume
   FROM public.transfers tf
  GROUP BY tf.status, ((date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date), tf.origin_domain, tf.destination_domain, (regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text)), tf.origin_transacting_asset;

CREATE VIEW public.hourly_transfer_metrics AS
 SELECT date_trunc('hour'::text, to_timestamp((tf.xcall_timestamp)::double precision)) AS transfer_hour,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text) AS router,
    tf.origin_transacting_asset AS asset,
    count(tf.transfer_id) AS transfer_count,
    count(DISTINCT tf.xcall_caller) AS unique_user_count,
    count(
        CASE
            WHEN (tf.origin_bridged_amount = '0'::character) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS zero_amount_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'XCalled'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS xcalled_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'Executed'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS executed_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'Reconciled'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS reconciled_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS completedfast_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS completedslow_transfer_count,
    avg(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS fastpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS fastpath_avg_ttr_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS slowpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS slowpath_avg_ttr_in_secs
   FROM public.transfers tf
  GROUP BY (date_trunc('hour'::text, to_timestamp((tf.xcall_timestamp)::double precision))), tf.origin_domain, tf.destination_domain, (regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text)), tf.origin_transacting_asset;

CREATE VIEW public.hourly_transfer_volume AS
 SELECT tf.status,
    date_trunc('hour'::text, to_timestamp((tf.xcall_timestamp)::double precision)) AS transfer_hour,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text) AS router,
    tf.origin_transacting_asset AS asset,
    sum(tf.origin_transacting_amount::numeric) AS volume
   FROM public.transfers tf
  GROUP BY tf.status, (date_trunc('hour'::text, to_timestamp((tf.xcall_timestamp)::double precision))), tf.origin_domain, tf.destination_domain, (regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text)), tf.origin_transacting_asset;

CREATE VIEW public.transfers_with_ttr_ttv AS
 SELECT tf.transfer_id,
    tf.nonce,
    tf."to",
    tf.call_data,
    tf.origin_domain,
    tf.destination_domain,
    tf.receive_local,
    tf.origin_chain,
    tf.origin_transacting_asset,
    tf.origin_transacting_amount,
    tf.origin_bridged_asset,
    tf.origin_bridged_amount,
    tf.xcall_caller,
    tf.xcall_transaction_hash,
    tf.xcall_timestamp,
    tf.xcall_gas_price,
    tf.xcall_gas_limit,
    tf.xcall_block_number,
    tf.destination_chain,
    tf.status,
    tf.routers,
    tf.destination_transacting_asset,
    tf.destination_transacting_amount,
    tf.destination_local_asset,
    tf.destination_local_amount,
    tf.execute_caller,
    tf.execute_transaction_hash,
    tf.execute_timestamp,
    tf.execute_gas_price,
    tf.execute_gas_limit,
    tf.execute_block_number,
    tf.execute_origin_sender,
    tf.reconcile_caller,
    tf.reconcile_transaction_hash,
    tf.reconcile_timestamp,
    tf.reconcile_gas_price,
    tf.reconcile_gas_limit,
    tf.reconcile_block_number,
    tf.update_time,
    tf.delegate,
    tf.message_hash,
    tf.canonical_domain,
    tf.slippage,
    tf.origin_sender,
    tf.bridged_amt,
    tf.normalized_in,
    tf.canonical_id,
    tf.router_fee,
    (tf.execute_timestamp - tf.xcall_timestamp) AS ttr,
    (tf.reconcile_timestamp - tf.xcall_timestamp) AS ttv
   FROM public.transfers tf;

CREATE VIEW public.transfer_volume AS
 SELECT tf.status,
    (date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date AS transfer_day,
    tf.origin_domain AS origin_chain,
    tf.origin_transacting_asset AS asset,
    sum(tf.origin_transacting_amount::numeric) AS volume
   FROM public.transfers tf
  GROUP BY tf.status, ((date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date), tf.origin_domain, tf.origin_transacting_asset;

-- migrate:down
