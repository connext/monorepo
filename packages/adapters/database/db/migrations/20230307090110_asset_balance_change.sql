-- migrate:up
ALTER TABLE asset_balances
ADD COLUMN supplied numeric DEFAULT 0 NOT NULL;
ALTER TABLE asset_balances
ADD COLUMN removed numeric DEFAULT 0 NOT NULL;
ALTER TABLE asset_balances
ADD COLUMN locked numeric DEFAULT 0 NOT NULL;
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
    asset_balances.removed
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
ALTER TABLE asset_balances DROP COLUMN supplied;
ALTER TABLE asset_balances DROP COLUMN removed;
ALTER TABLE asset_balances DROP COLUMN locked;
DROP TABLE IF EXISTS public.routers_with_balances;