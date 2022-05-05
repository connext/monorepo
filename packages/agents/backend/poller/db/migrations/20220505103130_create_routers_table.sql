-- migrate:up
create table routers ("address" character(42) primary key);
create table assets (
  "local" character(42) not null,
  adopted character(42) not null,
  canonical_id character(66) not null,
  canonical_domain varchar(255) not null,
  domain varchar(255) not null,
  primary key (canonical_id, domain)
);
create table asset_balances (
  asset_canonical_id character(66) not null,
  asset_domain varchar(255) not null,
  router_address character(42) not null,
  balance numeric not null default 0,
  primary key (asset_canonical_id, asset_domain, router_address),
  constraint fk_router foreign key(router_address) references routers("address"),
  constraint fk_asset foreign key(asset_canonical_id, asset_domain) references assets(canonical_id, domain)
);
-- migrate:down
drop table asset_balances;
drop table routers;