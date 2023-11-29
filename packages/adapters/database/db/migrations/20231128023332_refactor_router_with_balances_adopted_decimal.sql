-- migrate:up
DROP VIEW IF EXISTS public.router_tvl;
DROP VIEW IF EXISTS public.router_liquidity;
DROP VIEW IF EXISTS public.routers_with_balances;

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
        assets.adopted_decimal,
        COALESCE (asset_prices.price,0) AS asset_usd_price,
        (asset_prices.price * (asset_balances.balance::numeric / 10 ^ assets.decimal)) AS balance_usd,
        (asset_prices.price * (asset_balances.fees_earned::numeric / 10 ^ assets.decimal)) AS fee_earned_usd,
        (asset_prices.price * (asset_balances.locked::numeric / 10 ^ assets.decimal)) AS locked_usd,
        (asset_prices.price * (asset_balances.supplied::numeric / 10 ^ assets.decimal)) AS supplied_usd,
        (asset_prices.price * (asset_balances.removed::numeric / 10 ^ assets.decimal)) AS removed_usd
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
        AVG(r.asset_usd_price) As avg_usd_price,
        SUM((r.asset_usd_price * (r.balance::numeric / 10 ^ r.decimal))) As total_balance_usd,
        SUM((r.asset_usd_price * (r.locked::numeric / 10 ^ r.decimal))) As total_locked_usd,
        SUM((r.asset_usd_price * (r.supplied::numeric / 10 ^ r.decimal))) As total_supplied_usd,
        SUM((r.asset_usd_price * (r.removed::numeric / 10 ^ r.decimal))) As total_removed_usd
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
    router_tvl.price,
    router_tvl.tvl_usd
   FROM (( SELECT rb.local AS asset,
            sum(rb.balance) AS tvl,
            avg(rb.asset_usd_price) AS price,
            sum(rb.asset_usd_price * (rb.balance::numeric / 10 ^ rb.decimal)) AS tvl_usd
           FROM public.routers_with_balances rb
          GROUP BY rb.local) router_tvl
     CROSS JOIN ( SELECT max((date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date) AS latest_transfer_day
           FROM public.transfers tf) latest_transfer);


-- migrate:down

