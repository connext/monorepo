-- migrate:up
create role query nologin;

grant usage on schema public to query;
grant select on public.transfers to query;

create role reader noinherit login password '3eadooor';
GRANT CONNECT ON DATABASE connext TO reader;
grant usage on schema public to reader;
grant select on public.transfers to reader;

grant query to reader;

-- migrate:down
DROP ROLE IF EXISTS query;
DROP ROLE IF EXISTS reader;
