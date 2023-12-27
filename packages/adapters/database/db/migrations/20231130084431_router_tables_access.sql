-- migrate:up
GRANT SELECT ON public.routers_with_balances to query;
GRANT SELECT ON public.routers_with_balances to reader;

GRANT SELECT ON public.router_tvl to query;
GRANT SELECT ON public.router_tvl to reader;

GRANT SELECT ON public.router_liquidity to query;
GRANT SELECT ON public.router_liquidity to reader;

-- migrate:down

