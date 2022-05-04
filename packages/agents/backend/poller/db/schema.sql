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
    'Pending',
    'XCalled',
    'Executed',
    'Reconciled',
    'Failed'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: nonce; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.nonce (
    domain character varying(255) NOT NULL,
    nonce bigint NOT NULL
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
    transfer_id character(66) NOT NULL,
    origin_domain character varying(255) NOT NULL,
    destination_domain character varying(255) NOT NULL,
    status public.transfer_status DEFAULT 'Pending'::public.transfer_status NOT NULL,
    "to" character(42) NOT NULL,
    call_to character(42) DEFAULT '0x0000000000000000000000000000000000000000'::bpchar NOT NULL,
    call_data text,
    idx bigint,
    nonce bigint NOT NULL,
    router character(42),
    xcall_caller character(42),
    xcall_transferring_amount numeric,
    xcall_local_amount numeric,
    xcall_transferring_asset character(42),
    xcall_local_asset character(42),
    xcall_transaction_hash character(66),
    xcall_timestamp integer,
    xcall_gas_price numeric,
    xcall_gas_limit numeric,
    xcall_block_number integer,
    execute_caller character(42),
    execute_transferring_amount numeric,
    execute_local_amount numeric,
    execute_transferring_asset character(42),
    execute_local_asset character(42),
    execute_transaction_hash character(66),
    execute_timestamp integer,
    execute_gas_price numeric,
    execute_gas_limit numeric,
    execute_block_number integer,
    reconcile_caller character(42),
    reconcile_transferring_amount numeric,
    reconcile_local_amount numeric,
    reconcile_transferring_asset character(42),
    reconcile_local_asset character(42),
    reconcile_transaction_hash character(66),
    reconcile_timestamp integer,
    reconcile_gas_price numeric,
    reconcile_gas_limit numeric,
    reconcile_block_number integer
);


--
-- Name: nonce nonce_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nonce
    ADD CONSTRAINT nonce_pkey PRIMARY KEY (domain);


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
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20220419085941'),
    ('20220504052525');
