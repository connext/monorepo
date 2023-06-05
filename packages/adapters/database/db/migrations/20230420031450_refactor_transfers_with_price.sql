-- migrate:up
CREATE OR REPLACE VIEW public.transfers_with_price AS ( 
    SELECT t.*, p.asset_usd_price, p.decimals, (p.asset_usd_price * (t.bridged_amt::numeric / 10 ^ p.decimals)) AS usd_amount
    FROM public.transfers t
    LEFT JOIN (
        SELECT 
            t.transfer_id, 
            t.xcall_timestamp, 
            COALESCE (price,0) AS asset_usd_price, 
            (SELECT a.decimal FROM assets a WHERE a.canonical_id = t.canonical_id limit 1) AS decimals
        FROM public.transfers t
            LEFT JOIN public.asset_prices p 
                ON p.canonical_id = t.canonical_id AND p.timestamp = (SELECT MAX(timestamp) FROM public.asset_prices WHERE canonical_id = t.canonical_id AND timestamp <= t.xcall_timestamp)
        ) p ON t.transfer_id = p.transfer_id
    );

CREATE OR REPLACE VIEW public.transfer_volume AS ( 
    SELECT tf.status,
        date_trunc('day'::text, to_timestamp(tf.xcall_timestamp::double precision))::date AS transfer_day,
        tf.origin_domain AS origin_chain,
        tf.origin_transacting_asset AS asset,
        sum(tf.origin_transacting_amount::numeric) AS volume,
        avg(tf.asset_usd_price) AS avg_price,
        sum(tf.usd_amount::numeric) AS usd_volume
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
        avg(tf.asset_usd_price) AS avg_price,
        sum(tf.usd_amount::numeric) AS usd_volume
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
        avg(tf.asset_usd_price) AS avg_price,
        sum(tf.usd_amount::numeric) AS usd_volume
    FROM transfers_with_price tf
    GROUP BY tf.status, (date_trunc('day'::text, to_timestamp(tf.xcall_timestamp::double precision))::date), tf.origin_domain, tf.destination_domain, (regexp_replace(tf.routers::text, '[\{\}]'::text, ''::text, 'g'::text)), tf.origin_transacting_asset
);


-- migrate:down
DROP VIEW IF EXISTS public.transfers_with_price;

