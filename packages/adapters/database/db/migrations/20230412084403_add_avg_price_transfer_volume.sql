-- migrate:up
CREATE OR REPLACE VIEW public.transfer_volume AS ( 
    SELECT tf.status,
        date_trunc('day'::text, to_timestamp(tf.xcall_timestamp::double precision))::date AS transfer_day,
        tf.origin_domain AS origin_chain,
        tf.origin_transacting_asset AS asset,
        sum(tf.origin_transacting_amount::numeric) AS volume,
        avg(tf.asset_usd_price) AS avg_price
    FROM transfers_with_price tf
    GROUP BY tf.status, (date_trunc('day'::text, to_timestamp(tf.xcall_timestamp::double precision))::date), tf.origin_domain, tf.origin_transacting_asset
);

CREATE OR REPLACE VIEW public.hourly_transfer_volume AS ( 
    SELECT tf.status,
        date_trunc('hour'::text, to_timestamp(tf.xcall_timestamp::double precision)) AS transfer_hour,
        tf.origin_domain AS origin_chain,
        tf.destination_domain AS destination_chain,
        regexp_replace(tf.routers::text, '[\{\}]'::text, ''::text, 'g'::text) AS router,
        tf.origin_transacting_asset AS asset,
        sum(tf.origin_transacting_amount::numeric) AS volume,
        avg(tf.asset_usd_price) AS avg_price
    FROM transfers_with_price tf
    GROUP BY tf.status, (date_trunc('hour'::text, to_timestamp(tf.xcall_timestamp::double precision))), tf.origin_domain, tf.destination_domain, (regexp_replace(tf.routers::text, '[\{\}]'::text, ''::text, 'g'::text)), tf.origin_transacting_asset
);

CREATE OR REPLACE VIEW public.daily_transfer_volume AS ( 
    SELECT tf.status,
        date_trunc('day'::text, to_timestamp(tf.xcall_timestamp::double precision))::date AS transfer_date,
        tf.origin_domain AS origin_chain,
        tf.destination_domain AS destination_chain,
        regexp_replace(tf.routers::text, '[\{\}]'::text, ''::text, 'g'::text) AS router,
        tf.origin_transacting_asset AS asset,
        sum(tf.origin_transacting_amount::numeric) AS volume,
        avg(tf.asset_usd_price) AS avg_price
    FROM transfers_with_price tf
    GROUP BY tf.status, (date_trunc('day'::text, to_timestamp(tf.xcall_timestamp::double precision))::date), tf.origin_domain, tf.destination_domain, (regexp_replace(tf.routers::text, '[\{\}]'::text, ''::text, 'g'::text)), tf.origin_transacting_asset
);

-- migrate:down

