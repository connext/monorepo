-- migrate:up
create table routers (
  "address" character(42) primary key
);

create table asset_balances (
  "address" character(42) not null,
  domain varchar(255) not null,
  router_address character(42) not null,
  primary key ("address", domain, router_address),
  constraint fk_router foreign key(router_address) references routers("address"),
  balance numeric not null default 0
);
-- migrate:down

drop table asset_balances;
drop table routers;