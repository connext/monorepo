-- migrate:up
DROP VIEW IF EXISTS public.daily_transfer_volume;

CREATE MATERIALIZED VIEW public.daily_transfer_volume AS
    SELECT tf.status,
       (date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date AS transfer_date,
       tf.origin_domain                                                                      AS origin_chain,
       tf.destination_domain                                                                 AS destination_chain,
       regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text)               AS router,
       tf.origin_transacting_asset                                                           AS asset,
       sum((tf.origin_transacting_amount)::numeric)                                          AS volume,
       avg(tf.asset_usd_price)                                                               AS avg_price,
       sum(tf.usd_amount)                                                                    AS usd_volume,
       row_number() over () as id
    FROM public.transfers_with_price tf
    GROUP BY tf.status, ((date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date),
            tf.origin_domain, tf.destination_domain,
            (regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text)), tf.origin_transacting_asset;

CREATE UNIQUE INDEX ON public.daily_transfer_volume (id);
CREATE INDEX idx_daily_transfer_volume_transfer_date ON public.daily_transfer_volume USING btree (transfer_date);

REFRESH MATERIALIZED VIEW CONCURRENTLY public.daily_transfer_volume;

-- migrate:down
DROP MATERIALIZED VIEW IF EXISTS public.daily_transfer_volume;