-- migrate:up
CREATE TYPE transfer_status AS ENUM (
  'XCalled',
  'Executed',
  'Reconciled',
  'CompletedSlow',
  'CompletedFast'
);
CREATE TABLE asset_balances (
  asset_canonical_id character(66) NOT NULL,
  asset_domain character varying(255) NOT NULL,
  router_address character(42) NOT NULL,
  balance numeric DEFAULT 0 NOT NULL
);
CREATE TABLE assets (
  local character(42) NOT NULL,
  adopted character(42) NOT NULL,
  canonical_id character(66) NOT NULL,
  canonical_domain character varying(255) NOT NULL,
  domain character varying(255) NOT NULL
);
CREATE TABLE routers (address character(42) NOT NULL);
CREATE VIEW routers_with_balances AS
SELECT routers.address,
  asset_balances.asset_canonical_id,
  asset_balances.asset_domain,
  asset_balances.router_address,
  asset_balances.balance,
  assets.local,
  assets.adopted,
  assets.canonical_id,
  assets.canonical_domain,
  assets.domain
FROM (
    (
      routers
      JOIN asset_balances ON (
        (routers.address = asset_balances.router_address)
      )
    )
    JOIN assets ON (
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
CREATE TABLE transfers (
  transfer_id character(66) NOT NULL,
  nonce bigint,
  "to" character(42),
  call_data text,
  origin_domain character varying(255) NOT NULL,
  destination_domain character varying(255),
  recovery character(42),
  force_slow boolean,
  receive_local boolean,
  callback character(42),
  callback_fee numeric,
  execute_relayer_fee numeric,
  idx bigint,
  xcall_relayer_fee numeric,
  origin_chain character varying(255),
  origin_transacting_asset character(42),
  origin_transacting_amount numeric,
  origin_bridged_asset character(42),
  origin_bridged_amount numeric,
  xcall_caller character(42),
  xcall_transaction_hash character(66),
  xcall_timestamp integer,
  xcall_gas_price numeric,
  xcall_gas_limit numeric,
  xcall_block_number integer,
  destination_chain character varying(255),
  status transfer_status DEFAULT 'XCalled'::transfer_status NOT NULL,
  routers character(42) [],
  destination_transacting_asset character(42),
  destination_transacting_amount numeric,
  destination_local_asset character(42),
  destination_local_amount numeric,
  execute_caller character(42),
  execute_transaction_hash character(66),
  execute_timestamp integer,
  execute_gas_price numeric,
  execute_gas_limit numeric,
  execute_block_number integer,
  execute_origin_sender character(42),
  reconcile_caller character(42),
  reconcile_transaction_hash character(66),
  reconcile_timestamp integer,
  reconcile_gas_price numeric,
  reconcile_gas_limit numeric,
  reconcile_block_number integer
);
--
-- Name: asset_balances asset_balances_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY asset_balances
ADD CONSTRAINT asset_balances_pkey PRIMARY KEY (asset_canonical_id, asset_domain, router_address);
--
-- Name: assets assets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY assets
ADD CONSTRAINT assets_pkey PRIMARY KEY (canonical_id, domain);
--
-- Name: routers routers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY routers
ADD CONSTRAINT routers_pkey PRIMARY KEY (address);
--
-- Name: transfers transfers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY transfers
ADD CONSTRAINT transfers_pkey PRIMARY KEY (transfer_id);
--
-- Name: asset_balances fk_asset; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY asset_balances
ADD CONSTRAINT fk_asset FOREIGN KEY (asset_canonical_id, asset_domain) REFERENCES assets(canonical_id, domain);
--
-- Name: asset_balances fk_router; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY asset_balances
ADD CONSTRAINT fk_router FOREIGN KEY (router_address) REFERENCES routers(address);
--
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
DROP VIEW routers_with_balances CASCADE;
DROP TABLE routers CASCADE;
DROP TABLE asset_balances CASCADE;
DROP TABLE assets CASCADE;
DROP TABLE transfers CASCADE;
DROP TYPE transfer_status;