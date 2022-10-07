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
    'CompletedSlow',
    'CompletedFast'
);
--
-- Name: trigger_set_timestamp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN NEW.update_time = NOW();
RETURN NEW;
END;
$$;
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
    key character(66) NOT NULL,
    id character(42) NOT NULL,
    local character(42) NOT NULL,
    adopted character(42) NOT NULL,
    canonical_id character(66) NOT NULL,
    canonical_domain character varying(255) NOT NULL,
    domain character varying(255) NOT NULL
);
--
-- Name: checkpoints; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.checkpoints (
    check_name character varying(255) NOT NULL,
    check_point numeric DEFAULT 0 NOT NULL
);
--
-- Name: routers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.routers (address character(42) NOT NULL);
--
-- Name: routers_with_balances; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.routers_with_balances AS
SELECT routers.address,
    asset_balances.asset_canonical_id,
    asset_balances.asset_domain,
    asset_balances.router_address,
    asset_balances.balance,
    assets.local,
    assets.adopted,
    assets.canonical_id,
    assets.canonical_domain,
    << << << < HEAD assets.domain
FROM (
        (
            public.routers
            JOIN public.asset_balances ON (
                (routers.address = asset_balances.router_address)
            )
        )
        JOIN public.assets ON (
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
== == == = assets.domain,
assets.key,
assets.id
FROM (
        (
            public.routers
            JOIN public.asset_balances ON (
                (routers.address = asset_balances.router_address)
            )
        )
        JOIN public.assets ON (
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
>> >> >> > main --
-- Name: transfers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transfers (
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
    relayer_fee numeric,
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
    status public.transfer_status DEFAULT 'XCalled'::public.transfer_status NOT NULL,
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
    reconcile_block_number integer,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    delegate character(42),
    transfer_status_update_by_agent character(42),
    transfer_status_message_by_agent character(42),
    message_hash character(66),
    canonical_domain character varying(255),
    slippage numeric,
    origin_sender character(42),
    bridged_amt numeric,
    normalized_in numeric,
    canonical_id character(66)
);
--
-- Name: daily_router_tvl; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.daily_router_tvl AS
SELECT latest_transfer.latest_transfer_day,
    router_tvl.asset,
    router_tvl.router_address AS router,
    router_tvl.tvl
FROM (
        (
            SELECT rb.local AS asset,
                rb.router_address,
                sum(rb.balance) AS tvl
            FROM public.routers_with_balances rb
            GROUP BY rb.local,
                rb.router_address
        ) router_tvl
        CROSS JOIN (
            SELECT max(
                    (
                        date_trunc(
                            'day'::text,
                            to_timestamp((tf.xcall_timestamp)::double precision)
                        )
                    )::date
                ) AS latest_transfer_day
            FROM public.transfers tf
        ) latest_transfer
    );
--
-- Name: daily_transfer_metrics; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.daily_transfer_metrics AS
SELECT (
        date_trunc(
            'day'::text,
            to_timestamp((tf.xcall_timestamp)::double precision)
        )
    )::date AS transfer_date,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    regexp_replace(
        (tf.routers)::text,
        '[\{\}]'::text,
        ''::text,
        'g'::text
    ) AS router,
    tf.origin_transacting_asset AS asset,
    count(tf.transfer_id) AS transfer_count,
    count(DISTINCT tf.xcall_caller) AS unique_user_count,
    count(
        CASE
            WHEN (tf.force_slow IS TRUE) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS force_slow_transfer_count,
    count(
        CASE
            WHEN (tf.origin_bridged_amount = (0)::numeric) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS zero_amount_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'XCalled'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS xcalled_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'Executed'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS executed_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'Reconciled'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS reconciled_transfer_count,
    count(
        CASE
            WHEN (
                tf.status = 'CompletedFast'::public.transfer_status
            ) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS completedfast_transfer_count,
    count(
        CASE
            WHEN (
                tf.status = 'CompletedSlow'::public.transfer_status
            ) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS completedslow_transfer_count,
    avg(
        CASE
            WHEN (
                tf.status = 'CompletedFast'::public.transfer_status
            ) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END
    ) AS fastpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (
                tf.status = 'CompletedFast'::public.transfer_status
            ) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END
    ) AS fastpath_avg_ttr_in_secs,
    avg(
        CASE
            WHEN (
                tf.status = 'CompletedSlow'::public.transfer_status
            ) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END
    ) AS slowpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (
                tf.status = 'CompletedSlow'::public.transfer_status
            ) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END
    ) AS slowpath_avg_ttr_in_secs
FROM public.transfers tf
GROUP BY (
        (
            date_trunc(
                'day'::text,
                to_timestamp((tf.xcall_timestamp)::double precision)
            )
        )::date
    ),
    tf.origin_domain,
    tf.destination_domain,
    (
        regexp_replace(
            (tf.routers)::text,
            '[\{\}]'::text,
            ''::text,
            'g'::text
        )
    ),
    tf.origin_transacting_asset;
--
-- Name: daily_transfer_volume; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.daily_transfer_volume AS
SELECT tf.status,
    (
        date_trunc(
            'day'::text,
            to_timestamp((tf.xcall_timestamp)::double precision)
        )
    )::date AS transfer_date,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    regexp_replace(
        (tf.routers)::text,
        '[\{\}]'::text,
        ''::text,
        'g'::text
    ) AS router,
    tf.origin_transacting_asset AS asset,
    sum(tf.origin_transacting_amount) AS volume,
    count(
        CASE
            WHEN (tf.force_slow IS TRUE) THEN tf.origin_transacting_amount
            ELSE NULL::numeric
        END
    ) AS force_slow_transfer_volume
FROM public.transfers tf
GROUP BY tf.status,
    (
        (
            date_trunc(
                'day'::text,
                to_timestamp((tf.xcall_timestamp)::double precision)
            )
        )::date
    ),
    tf.origin_domain,
    tf.destination_domain,
    (
        regexp_replace(
            (tf.routers)::text,
            '[\{\}]'::text,
            ''::text,
            'g'::text
        )
    ),
    tf.origin_transacting_asset;
--
-- Name: hourly_transfer_metrics; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.hourly_transfer_metrics AS
SELECT date_trunc(
        'hour'::text,
        to_timestamp((tf.xcall_timestamp)::double precision)
    ) AS transfer_hour,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    regexp_replace(
        (tf.routers)::text,
        '[\{\}]'::text,
        ''::text,
        'g'::text
    ) AS router,
    tf.origin_transacting_asset AS asset,
    count(tf.transfer_id) AS transfer_count,
    count(DISTINCT tf.xcall_caller) AS unique_user_count,
    count(
        CASE
            WHEN (tf.force_slow IS TRUE) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS force_slow_transfer_count,
    count(
        CASE
            WHEN (tf.origin_bridged_amount = (0)::numeric) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS zero_amount_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'XCalled'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS xcalled_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'Executed'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS executed_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'Reconciled'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS reconciled_transfer_count,
    count(
        CASE
            WHEN (
                tf.status = 'CompletedFast'::public.transfer_status
            ) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS completedfast_transfer_count,
    count(
        CASE
            WHEN (
                tf.status = 'CompletedSlow'::public.transfer_status
            ) THEN tf.transfer_id
            ELSE NULL::bpchar
        END
    ) AS completedslow_transfer_count,
    avg(
        CASE
            WHEN (
                tf.status = 'CompletedFast'::public.transfer_status
            ) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END
    ) AS fastpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (
                tf.status = 'CompletedFast'::public.transfer_status
            ) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END
    ) AS fastpath_avg_ttr_in_secs,
    avg(
        CASE
            WHEN (
                tf.status = 'CompletedSlow'::public.transfer_status
            ) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END
    ) AS slowpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (
                tf.status = 'CompletedSlow'::public.transfer_status
            ) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END
    ) AS slowpath_avg_ttr_in_secs
FROM public.transfers tf
GROUP BY (
        date_trunc(
            'hour'::text,
            to_timestamp((tf.xcall_timestamp)::double precision)
        )
    ),
    tf.origin_domain,
    tf.destination_domain,
    (
        regexp_replace(
            (tf.routers)::text,
            '[\{\}]'::text,
            ''::text,
            'g'::text
        )
    ),
    tf.origin_transacting_asset;
--
-- Name: hourly_transfer_volume; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.hourly_transfer_volume AS
SELECT tf.status,
    date_trunc(
        'hour'::text,
        to_timestamp((tf.xcall_timestamp)::double precision)
    ) AS transfer_hour,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    regexp_replace(
        (tf.routers)::text,
        '[\{\}]'::text,
        ''::text,
        'g'::text
    ) AS router,
    tf.origin_transacting_asset AS asset,
    sum(tf.origin_transacting_amount) AS volume,
    count(
        CASE
            WHEN (tf.force_slow IS TRUE) THEN tf.origin_transacting_amount
            ELSE NULL::numeric
        END
    ) AS force_slow_transfer_volume
FROM public.transfers tf
GROUP BY tf.status,
    (
        date_trunc(
            'hour'::text,
            to_timestamp((tf.xcall_timestamp)::double precision)
        )
    ),
    tf.origin_domain,
    tf.destination_domain,
    (
        regexp_replace(
            (tf.routers)::text,
            '[\{\}]'::text,
            ''::text,
            'g'::text
        )
    ),
    tf.origin_transacting_asset;
--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    leaf character(66) NOT NULL,
    origin_domain character varying(255) NOT NULL,
    destination_domain character varying(255),
    index numeric,
    root character(66),
    message character varying,
    processed boolean DEFAULT false,
    return_data character varying(255)
);
--
-- Name: root_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.root_messages (
    id character(66) NOT NULL,
    spoke_domain character varying(255),
    hub_domain character varying(255),
    root character(66),
    caller character(42),
    sent_transaction_hash character(66),
    sent_timestamp integer,
    gas_price numeric,
    gas_limit numeric,
    block_number integer,
    processed boolean DEFAULT false NOT NULL,
    processed_transaction_hash character(66)
);
--
-- Name: router_tvl; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.router_tvl AS
SELECT latest_transfer.latest_transfer_day,
    router_tvl.asset,
    router_tvl.tvl
FROM (
        (
            SELECT rb.local AS asset,
                sum(rb.balance) AS tvl
            FROM public.routers_with_balances rb
            GROUP BY rb.local
        ) router_tvl
        CROSS JOIN (
            SELECT max(
                    (
                        date_trunc(
                            'day'::text,
                            to_timestamp((tf.xcall_timestamp)::double precision)
                        )
                    )::date
                ) AS latest_transfer_day
            FROM public.transfers tf
        ) latest_transfer
    );
--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (version character varying(255) NOT NULL);
--
-- Name: transfer_count; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.transfer_count AS
SELECT tf.status,
    (
        date_trunc(
            'day'::text,
            to_timestamp((tf.xcall_timestamp)::double precision)
        )
    )::date AS transfer_day,
    tf.origin_domain AS origin_chain,
    tf.origin_transacting_asset AS asset,
    count(tf.transfer_id) AS transfer_count
FROM public.transfers tf
GROUP BY tf.status,
    (
        (
            date_trunc(
                'day'::text,
                to_timestamp((tf.xcall_timestamp)::double precision)
            )
        )::date
    ),
    tf.origin_domain,
    tf.origin_transacting_asset;
--
-- Name: transfer_volume; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.transfer_volume AS
SELECT tf.status,
    (
        date_trunc(
            'day'::text,
            to_timestamp((tf.xcall_timestamp)::double precision)
        )
    )::date AS transfer_day,
    tf.origin_domain AS origin_chain,
    tf.origin_transacting_asset AS asset,
    sum(tf.origin_transacting_amount) AS volume
FROM public.transfers tf
GROUP BY tf.status,
    (
        (
            date_trunc(
                'day'::text,
                to_timestamp((tf.xcall_timestamp)::double precision)
            )
        )::date
    ),
    tf.origin_domain,
    tf.origin_transacting_asset;
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
-- Name: checkpoints checkpoints_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checkpoints
ADD CONSTRAINT checkpoints_pkey PRIMARY KEY (check_name);
--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
ADD CONSTRAINT messages_pkey PRIMARY KEY (leaf);
--
-- Name: root_messages root_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.root_messages
ADD CONSTRAINT root_messages_pkey PRIMARY KEY (id);
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
-- Name: messages_processed_index_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_processed_index_idx ON public.messages USING btree (processed, index);
--
-- Name: transfers_destination_domain_update_time_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transfers_destination_domain_update_time_idx ON public.transfers USING btree (destination_domain, update_time);
--
-- Name: transfers_origin_domain_xcall_timestamp_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transfers_origin_domain_xcall_timestamp_idx ON public.transfers USING btree (origin_domain, xcall_timestamp);
--
-- Name: transfers_status_xcall_timestamp_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transfers_status_xcall_timestamp_idx ON public.transfers USING btree (status, xcall_timestamp);
--
-- Name: transfers update_time_on_transfers; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_time_on_transfers BEFORE
UPDATE ON public.transfers FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
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

INSERT INTO public.schema_migrations (version)
VALUES ('20220520150644'),
    ('20220524141906'),
    ('20220617215641'),
    ('20220618065158'),
    ('20220707182823'),
    ('20220730013440'),
    ('20220811120125'),
    ('20220816134851'),
    ('20220824094332'),
    ('20220907212007'),
    ('20220914215736'),
    ('20220914230120'),
    ('20220920101730'),
    ('20220921065611'),
    ('20221006051045'),
    ('20221006115622'),
    ('20221006193142');