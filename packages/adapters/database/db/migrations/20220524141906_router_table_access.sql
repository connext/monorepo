-- migrate:up
grant select on public.routers_with_balances to reader;
grant select on public.routers_with_balances to query;
-- migrate:down