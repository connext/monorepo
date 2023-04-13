-- migrate:up
ALTER TABLE assets
ADD COLUMN decimal numeric DEFAULT 0;
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
    assets.decimal
FROM (
        (
            public.routers
            LEFT JOIN public.asset_balances ON (
                (routers.address = asset_balances.router_address)
            )
        )
        LEFT JOIN public.assets ON (
            (
                (
                    asset_balances.asset_canonical_id = assets.canonical_id
                )
                AND (
                    (asset_balances.asset_domain)::text = (assets.domain)::text
                )
            )
        )
    );
-- migrate:down
ALTER TABLE assets DROP COLUMN decimal;
DROP TABLE IF EXISTS public.routers_with_balances;