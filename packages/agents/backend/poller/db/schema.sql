SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: transfer_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.transfer_status AS ENUM (
    'XCalled',
    'Executed',
    'Reconciled',
    'Completed'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asset_balances; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asset_balances (
    asset_canonical_id character(66) NOT NULL,
    asset_domain character varying(255) NOT NULL,
    router_address character(42) NOT NULL,
    balance numeric DEFAULT 0 NOT NULL
);


--
-- Name: assets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assets (
    local character(42) NOT NULL,
    adopted character(42) NOT NULL,
    canonical_id character(66) NOT NULL,
    canonical_domain character varying(255) NOT NULL,
    domain character varying(255) NOT NULL
);


--
-- Name: routers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.routers (
    address character(42) NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: transfers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transfers (
    origin_domain character varying(255) NOT NULL,
    destination_domain character varying(255),
    nonce bigint,
    "to" character(42),
    call_data text,
    idx bigint,
    transfer_id character(66) NOT NULL,
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
    xcall_relayer_fee numeric,
    destination_chain character varying(255),
    status public.transfer_status DEFAULT 'XCalled'::public.transfer_status NOT NULL,
    routers character(42)[],
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

ALTER TABLE ONLY public.asset_balances
    ADD CONSTRAINT asset_balances_pkey PRIMARY KEY (asset_canonical_id, asset_domain, router_address);


--
-- Name: assets assets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (canonical_id, domain);


--
-- Name: routers routers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.routers
    ADD CONSTRAINT routers_pkey PRIMARY KEY (address);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: transfers transfers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transfers
    ADD CONSTRAINT transfers_pkey PRIMARY KEY (transfer_id);


--
-- Name: asset_balances fk_asset; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_balances
    ADD CONSTRAINT fk_asset FOREIGN KEY (asset_canonical_id, asset_domain) REFERENCES public.assets(canonical_id, domain);


--
-- Name: asset_balances fk_router; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_balances
    ADD CONSTRAINT fk_router FOREIGN KEY (router_address) REFERENCES public.routers(address);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20220419085941'),
    ('20220504052525'),
    ('20220505103130');
