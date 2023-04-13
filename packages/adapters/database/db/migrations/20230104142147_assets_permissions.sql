-- migrate:up
GRANT SELECT ON public.assets to query;
GRANT SELECT ON public.asset_balances to query;
-- migrate:down

