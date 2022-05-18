-- migrate:up
create view routers_with_balances as
select *
from routers
  join asset_balances on routers."address" = asset_balances.router_address
  join assets on asset_balances.asset_canonical_id = assets.canonical_id
  and asset_balances.asset_domain = assets.domain;
grant select on public.routers_with_balances to reader;
grant select on public.routers_with_balances to query;
-- migrate:down
drop view routers_with_balances;