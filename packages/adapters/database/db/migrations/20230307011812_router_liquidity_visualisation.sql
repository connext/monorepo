-- migrate:up
CREATE OR REPLACE VIEW public.router_liquidity AS (
        SELECT r.domain,
            r.local,
            r.adopted,
            SUM(r.balance) As total_balance
        FROM public.routers_with_balances r
        GROUP BY 1,
            2,
            3
        ORDER BY 1
    );
GRANT SELECT ON public.router_liquidity to query;
GRANT SELECT ON public.router_liquidity to reader;
-- migrate:down
DROP TABLE IF EXISTS public.router_liquidity;