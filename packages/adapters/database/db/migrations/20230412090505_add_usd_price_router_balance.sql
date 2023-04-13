-- migrate:up
CREATE OR REPLACE VIEW public.routers_with_balances AS
    SELECT routers.address,
        asset_balances.asset_canonical_id,
        asset_balances.asset_domain,
        asset_balances.router_address,
        asset_balances.balance,
        assets.local,
        assets.adopted,
        assets.canonical_id,
        assets.canonical_domain,
        assets.domain,
        assets.key,
        assets.id,
        asset_balances.fees_earned,
        asset_balances.locked,
        asset_balances.supplied,
        asset_balances.removed,
        assets.decimal,
        COALESCE (asset_prices.price,0) AS asset_usd_price
    FROM (
        routers
        LEFT JOIN asset_balances ON routers.address = asset_balances.router_address
        LEFT JOIN assets ON asset_balances.asset_canonical_id = assets.canonical_id AND asset_balances.asset_domain::text = assets.domain::text
        LEFT JOIN asset_prices ON assets.canonical_id = asset_prices.canonical_id AND asset_prices.timestamp = (SELECT MAX(timestamp) FROM public.asset_prices)
    );

CREATE OR REPLACE VIEW public.router_liquidity AS (
    SELECT r.domain,
        r.local,
        r.adopted,
        SUM(r.balance) As total_balance,
        SUM(r.locked) As total_locked,
        SUM(r.supplied) As total_supplied,
        SUM(r.removed) As total_removed,
        AVG(r.asset_usd_price) As avg_usd_price
    FROM public.routers_with_balances r
    GROUP BY 1,
        2,
        3
    ORDER BY 1
);

CREATE OR REPLACE VIEW public.router_tvl AS
 SELECT latest_transfer.latest_transfer_day,
    router_tvl.asset,
    router_tvl.tvl,
    router_tvl.price
   FROM (( SELECT rb.local AS asset,
            sum(rb.balance) AS tvl,
            avg(rb.asset_usd_price) AS price
           FROM public.routers_with_balances rb
          GROUP BY rb.local) router_tvl
     CROSS JOIN ( SELECT max((date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date) AS latest_transfer_day
           FROM public.transfers tf) latest_transfer);


-- migrate:down

