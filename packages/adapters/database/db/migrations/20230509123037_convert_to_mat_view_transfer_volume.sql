-- migrate:up
DROP VIEW IF EXISTS public.transfer_volume;
DROP VIEW IF EXISTS public.hourly_transfer_volume;

CREATE MATERIALIZED VIEW public.hourly_transfer_volume AS ( 
    SELECT tf.status,
        date_trunc('hour'::text, to_timestamp(tf.xcall_timestamp::double precision)) AS transfer_hour,
        tf.origin_domain AS origin_chain,
        tf.destination_domain AS destination_chain,
        regexp_replace(tf.routers::text, '[\{\}]'::text, ''::text, 'g'::text) AS router,
        tf.origin_transacting_asset AS asset,
        sum(tf.origin_transacting_amount::numeric) AS volume,
        avg(tf.asset_usd_price) AS avg_price,
        sum(tf.usd_amount::numeric) AS usd_volume,
        row_number() over () as id
    FROM transfers_with_price tf
    GROUP BY tf.status, (date_trunc('hour'::text, to_timestamp(tf.xcall_timestamp::double precision))), tf.origin_domain, tf.destination_domain, (regexp_replace(tf.routers::text, '[\{\}]'::text, ''::text, 'g'::text)), tf.origin_transacting_asset
);
CREATE UNIQUE INDEX ON public.hourly_transfer_volume (id);
CREATE INDEX idx_hourly_transfer_volume_transfer_hour ON public.hourly_transfer_volume USING btree (transfer_hour);


REFRESH MATERIALIZED VIEW CONCURRENTLY public.hourly_transfer_volume;


-- migrate:down
DROP MATERIALIZED VIEW IF EXISTS public.hourly_transfer_volume;