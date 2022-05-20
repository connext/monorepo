-- migrate:up
DO $do$ BEGIN IF EXISTS (
  SELECT
  FROM pg_catalog.pg_roles
  WHERE rolname = 'query'
) THEN RAISE NOTICE 'Role "query" already exists. Skipping.';
ELSE create role query nologin;
END IF;
END $do$;
grant usage on schema public to query;
grant select on public.transfers to query;
DO $do$ BEGIN IF EXISTS (
  SELECT
  FROM pg_catalog.pg_roles
  WHERE rolname = 'reader'
) THEN RAISE NOTICE 'Role "reader" already exists. Skipping.';
ELSE create role reader noinherit login password '3eadooor';
END IF;
END $do$;
GRANT CONNECT ON DATABASE connext TO reader;
grant usage on schema public to reader;
grant select on public.transfers to reader;
grant query to reader;
-- migrate:down