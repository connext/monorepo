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
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: pg_cron; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA public;


--
-- Name: EXTENSION pg_cron; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_cron IS 'Job scheduler for PostgreSQL';


--
-- Name: action_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.action_type AS ENUM (
    'Add',
    'Remove'
);


--
-- Name: event_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.event_type AS ENUM (
    'Add',
    'Remove'
);


--
-- Name: snapshot_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.snapshot_status AS ENUM (
    'Proposed',
    'Finalized',
    'Propagated'
);


--
-- Name: spoke_root_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.spoke_root_status AS ENUM (
    'Submitted',
    'Proposed',
    'Finalized'
);


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
-- Name: isnumeric(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.isnumeric(text) RETURNS boolean
    LANGUAGE sql
    AS $_$
SELECT $1 ~ '^[0-9]+$'
$_$;


--
-- Name: trigger_set_timestamp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.update_time = NOW();
  RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: aggregated_roots; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.aggregated_roots (
    id text NOT NULL,
    domain character varying(255) NOT NULL,
    received_root character(66) NOT NULL,
    domain_index numeric NOT NULL
);


--
-- Name: asset_balances; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asset_balances (
    asset_canonical_id character(66) NOT NULL,
    asset_domain character varying(255) NOT NULL,
    router_address character(42) NOT NULL,
    balance numeric DEFAULT 0 NOT NULL,
    fees_earned numeric DEFAULT 0 NOT NULL,
    supplied numeric DEFAULT 0 NOT NULL,
    removed numeric DEFAULT 0 NOT NULL,
    locked numeric DEFAULT 0 NOT NULL
);


--
-- Name: asset_prices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asset_prices (
    id integer NOT NULL,
    canonical_id character(66) NOT NULL,
    canonical_domain character varying(255) NOT NULL,
    "timestamp" integer,
    price numeric
);


--
-- Name: asset_prices_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.asset_prices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: asset_prices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.asset_prices_id_seq OWNED BY public.asset_prices.id;


--
-- Name: assets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assets (
    local character(42) NOT NULL,
    adopted character(42) NOT NULL,
    canonical_id character(66) NOT NULL,
    canonical_domain character varying(255) NOT NULL,
    domain character varying(255) NOT NULL,
    key character(66),
    id character(42),
    "decimal" numeric DEFAULT 0,
    adopted_decimal numeric DEFAULT 0
);


--
-- Name: checkpoints; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.checkpoints (
    check_name character varying(255) NOT NULL,
    check_point numeric DEFAULT 0 NOT NULL
);


--
-- Name: daily_router_tvl; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.daily_router_tvl (
    id character varying(255) NOT NULL,
    domain character varying(255) NOT NULL,
    asset character(42) NOT NULL,
    router character(42) NOT NULL,
    day date NOT NULL,
    balance character varying(255) NOT NULL
);


--
-- Name: stableswap_exchanges; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stableswap_exchanges (
    id character varying(255) NOT NULL,
    pool_id character(66) NOT NULL,
    domain character varying(255) NOT NULL,
    buyer character(42) NOT NULL,
    bought_id integer NOT NULL,
    sold_id integer NOT NULL,
    tokens_sold numeric NOT NULL,
    tokens_bought numeric NOT NULL,
    block_number integer NOT NULL,
    transaction_hash character(66) NOT NULL,
    "timestamp" integer NOT NULL,
    balances numeric[] DEFAULT ARRAY[]::numeric[] NOT NULL,
    fee numeric DEFAULT 0 NOT NULL,
    nonce numeric DEFAULT 0 NOT NULL
);


--
-- Name: stableswap_pool_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stableswap_pool_events (
    id character varying(255) NOT NULL,
    pool_id character(66) NOT NULL,
    domain character varying(255) NOT NULL,
    provider character(42) NOT NULL,
    action public.action_type DEFAULT 'Add'::public.action_type NOT NULL,
    pooled_tokens text[],
    pool_token_decimals integer[],
    token_amounts numeric[],
    balances numeric[],
    lp_token_amount numeric NOT NULL,
    lp_token_supply numeric NOT NULL,
    block_number integer NOT NULL,
    transaction_hash character(66) NOT NULL,
    "timestamp" integer NOT NULL,
    fees numeric[] DEFAULT ARRAY[]::numeric[] NOT NULL,
    nonce numeric DEFAULT 0 NOT NULL
);


--
-- Name: daily_swap_tvl; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.daily_swap_tvl AS
 SELECT r.pool_id,
    r.domain,
    r.day,
    r.balances,
    r.total_fee,
    r.total_vol,
    ( SELECT sum(b.b) AS sum
           FROM unnest(r.balances) b(b)) AS total_tvl
   FROM ( SELECT e.pool_id,
            e.domain,
            (date_trunc('day'::text, to_timestamp((e."timestamp")::double precision)))::date AS day,
            ARRAY( SELECT unnest((array_agg(e.balances ORDER BY e."timestamp" DESC))[1:1]) AS unnest) AS balances,
            sum(e.fee) AS total_fee,
            sum(e.vol) AS total_vol
           FROM ( SELECT stableswap_pool_events.pool_id,
                    stableswap_pool_events.domain,
                    stableswap_pool_events.balances,
                    ( SELECT sum(f.f) AS sum
                           FROM unnest(stableswap_pool_events.fees) f(f)) AS fee,
                    0 AS vol,
                    stableswap_pool_events."timestamp"
                   FROM public.stableswap_pool_events
                UNION ALL
                 SELECT stableswap_exchanges.pool_id,
                    stableswap_exchanges.domain,
                    stableswap_exchanges.balances,
                    stableswap_exchanges.fee,
                    ((stableswap_exchanges.tokens_sold + stableswap_exchanges.tokens_bought) / (2)::numeric) AS vol,
                    stableswap_exchanges."timestamp"
                   FROM public.stableswap_exchanges) e
          GROUP BY e.pool_id, e.domain, ((date_trunc('day'::text, to_timestamp((e."timestamp")::double precision)))::date)
          ORDER BY ((date_trunc('day'::text, to_timestamp((e."timestamp")::double precision)))::date)) r;


--
-- Name: daily_swap_volume; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.daily_swap_volume AS
 SELECT swap.pool_id,
    swap.domain,
    (date_trunc('day'::text, to_timestamp((swap."timestamp")::double precision)))::date AS swap_day,
    sum(((swap.tokens_sold + swap.tokens_bought) / (2)::numeric)) AS volume,
    count(swap.pool_id) AS swap_count
   FROM public.stableswap_exchanges swap
  GROUP BY swap.pool_id, swap.domain, ((date_trunc('day'::text, to_timestamp((swap."timestamp")::double precision)))::date);


--
-- Name: transfers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transfers (
    transfer_id character(66) NOT NULL,
    nonce bigint,
    "to" character(42),
    call_data text,
    origin_domain character varying(255) NOT NULL,
    destination_domain character varying(255),
    receive_local boolean,
    origin_chain character varying(255),
    origin_transacting_asset character(42),
    origin_transacting_amount character varying(255),
    origin_bridged_asset character(42),
    origin_bridged_amount character varying(255),
    xcall_caller character(42),
    xcall_transaction_hash character(66),
    xcall_timestamp integer,
    xcall_gas_price character varying(255),
    xcall_gas_limit character varying(255),
    xcall_block_number integer,
    destination_chain character varying(255),
    status public.transfer_status DEFAULT 'XCalled'::public.transfer_status NOT NULL,
    routers character(42)[],
    destination_transacting_asset character(42),
    destination_transacting_amount character varying(255),
    destination_local_asset character(42),
    destination_local_amount character varying(255),
    execute_caller character(42),
    execute_transaction_hash character(66),
    execute_timestamp integer,
    execute_gas_price character varying(255),
    execute_gas_limit character varying(255),
    execute_block_number integer,
    execute_origin_sender character(42),
    reconcile_caller character(42),
    reconcile_transaction_hash character(66),
    reconcile_timestamp integer,
    reconcile_gas_price character varying(255),
    reconcile_gas_limit character varying(255),
    reconcile_block_number integer,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    delegate character(42),
    message_hash character(66),
    canonical_domain character varying(255),
    slippage numeric,
    origin_sender character(42),
    bridged_amt character varying(255),
    normalized_in character varying(255),
    canonical_id character(66),
    router_fee character varying(255),
    xcall_tx_origin character(42),
    execute_tx_origin character(42),
    reconcile_tx_origin character(42),
    error_status character varying(255),
    backoff integer DEFAULT 32 NOT NULL,
    next_execution_timestamp integer DEFAULT 0 NOT NULL,
    updated_slippage numeric,
    execute_simulation_input text,
    execute_simulation_from character(42),
    execute_simulation_to character(42),
    execute_simulation_network character varying(255),
    error_message character varying(255),
    message_status character varying(255),
    relayer_fees jsonb,
    execute_tx_nonce numeric DEFAULT 0 NOT NULL,
    reconcile_tx_nonce numeric DEFAULT 0 NOT NULL
);


--
-- Name: daily_transfer_metrics; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.daily_transfer_metrics AS
 SELECT (date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date AS transfer_date,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    count(tf.transfer_id) AS transfer_count,
    count(DISTINCT tf.xcall_caller) AS unique_user_count,
    count(
        CASE
            WHEN ((tf.origin_bridged_amount)::bpchar = '0'::character(1)) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS zero_amount_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS completedfast_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS completedslow_transfer_count,
    avg(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS fastpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS fastpath_avg_ttr_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS slowpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS slowpath_avg_ttr_in_secs
   FROM public.transfers tf
  GROUP BY ((date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date), tf.origin_domain, tf.destination_domain
  ORDER BY ((date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date);


--
-- Name: transfers_with_price; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.transfers_with_price AS
 SELECT t.transfer_id,
    t.nonce,
    t."to",
    t.call_data,
    t.origin_domain,
    t.destination_domain,
    t.receive_local,
    t.origin_chain,
    t.origin_transacting_asset,
    t.origin_transacting_amount,
    t.origin_bridged_asset,
    t.origin_bridged_amount,
    t.xcall_caller,
    t.xcall_transaction_hash,
    t.xcall_timestamp,
    t.xcall_gas_price,
    t.xcall_gas_limit,
    t.xcall_block_number,
    t.destination_chain,
    t.status,
    t.routers,
    t.destination_transacting_asset,
    t.destination_transacting_amount,
    t.destination_local_asset,
    t.destination_local_amount,
    t.execute_caller,
    t.execute_transaction_hash,
    t.execute_timestamp,
    t.execute_gas_price,
    t.execute_gas_limit,
    t.execute_block_number,
    t.execute_origin_sender,
    t.reconcile_caller,
    t.reconcile_transaction_hash,
    t.reconcile_timestamp,
    t.reconcile_gas_price,
    t.reconcile_gas_limit,
    t.reconcile_block_number,
    t.update_time,
    t.delegate,
    t.message_hash,
    t.canonical_domain,
    t.slippage,
    t.origin_sender,
    t.bridged_amt,
    t.normalized_in,
    t.canonical_id,
    t.router_fee,
    t.xcall_tx_origin,
    t.execute_tx_origin,
    t.reconcile_tx_origin,
    t.error_status,
    t.backoff,
    t.next_execution_timestamp,
    t.updated_slippage,
    t.execute_simulation_input,
    t.execute_simulation_from,
    t.execute_simulation_to,
    t.execute_simulation_network,
    t.error_message,
    t.message_status,
    t.relayer_fees,
    p.asset_usd_price,
    p.decimals,
    (p.asset_usd_price * ((t.bridged_amt)::numeric / ((10)::numeric ^ p.decimals))) AS usd_amount
   FROM (public.transfers t
     LEFT JOIN ( SELECT t_1.transfer_id,
            t_1.xcall_timestamp,
            COALESCE(p_1.price, (0)::numeric) AS asset_usd_price,
            ( SELECT a."decimal"
                   FROM public.assets a
                  WHERE (a.canonical_id = t_1.canonical_id)
                 LIMIT 1) AS decimals
           FROM (public.transfers t_1
             LEFT JOIN public.asset_prices p_1 ON (((p_1.canonical_id = t_1.canonical_id) AND (p_1."timestamp" = ( SELECT max(asset_prices."timestamp") AS max
                   FROM public.asset_prices
                  WHERE ((asset_prices.canonical_id = t_1.canonical_id) AND (asset_prices."timestamp" <= t_1.xcall_timestamp)))))))) p ON ((t.transfer_id = p.transfer_id)));


--
-- Name: daily_transfer_volume; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW public.daily_transfer_volume AS
 SELECT tf.status,
    (date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date AS transfer_date,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text) AS router,
    tf.origin_transacting_asset AS asset,
    sum((tf.origin_transacting_amount)::numeric) AS volume,
    avg(tf.asset_usd_price) AS avg_price,
    sum(tf.usd_amount) AS usd_volume,
    row_number() OVER () AS id
   FROM public.transfers_with_price tf
  GROUP BY tf.status, ((date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date), tf.origin_domain, tf.destination_domain, (regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text)), tf.origin_transacting_asset
  WITH NO DATA;


--
-- Name: hourly_swap_volume; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.hourly_swap_volume AS
 SELECT swap.pool_id,
    swap.domain,
    date_trunc('hour'::text, to_timestamp((swap."timestamp")::double precision)) AS swap_hour,
    sum(((swap.tokens_sold + swap.tokens_bought) / (2)::numeric)) AS volume,
    count(swap.pool_id) AS swap_count
   FROM public.stableswap_exchanges swap
  GROUP BY swap.pool_id, swap.domain, (date_trunc('hour'::text, to_timestamp((swap."timestamp")::double precision)));


--
-- Name: hourly_transfer_metrics; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.hourly_transfer_metrics AS
 SELECT (date_trunc('hour'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date AS transfer_date,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    count(tf.transfer_id) AS transfer_count,
    count(DISTINCT tf.xcall_caller) AS unique_user_count,
    count(
        CASE
            WHEN ((tf.origin_bridged_amount)::bpchar = '0'::character(1)) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS zero_amount_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'XCalled'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS xcalled_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'Executed'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS executed_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'Reconciled'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS reconciled_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS completedfast_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS completedslow_transfer_count,
    avg(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS fastpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS fastpath_avg_ttr_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS slowpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS slowpath_avg_ttr_in_secs
   FROM public.transfers tf
  GROUP BY ((date_trunc('hour'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date), tf.origin_domain, tf.destination_domain
  ORDER BY ((date_trunc('hour'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date);


--
-- Name: hourly_transfer_volume; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW public.hourly_transfer_volume AS
 SELECT tf.status,
    date_trunc('hour'::text, to_timestamp((tf.xcall_timestamp)::double precision)) AS transfer_hour,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text) AS router,
    tf.origin_transacting_asset AS asset,
    sum((tf.origin_transacting_amount)::numeric) AS volume,
    avg(tf.asset_usd_price) AS avg_price,
    sum(tf.usd_amount) AS usd_volume,
    row_number() OVER () AS id
   FROM public.transfers_with_price tf
  GROUP BY tf.status, (date_trunc('hour'::text, to_timestamp((tf.xcall_timestamp)::double precision))), tf.origin_domain, tf.destination_domain, (regexp_replace((tf.routers)::text, '[\{\}]'::text, ''::text, 'g'::text)), tf.origin_transacting_asset
  WITH NO DATA;


--
-- Name: merkle_cache; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.merkle_cache (
    domain character varying(255) NOT NULL,
    domain_path character(32) NOT NULL,
    tree_root character(66) NOT NULL
);


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    leaf character(66) NOT NULL,
    origin_domain character varying(255) NOT NULL,
    destination_domain character varying(255),
    index numeric NOT NULL,
    root character(66),
    message character varying,
    processed boolean DEFAULT false,
    return_data character varying(255),
    transfer_id character(66)
);


--
-- Name: propagated_roots; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.propagated_roots (
    id character(66) NOT NULL,
    aggregate_root character(66) NOT NULL,
    leaf_count numeric NOT NULL,
    domains_hash text
);


--
-- Name: received_aggregate_roots; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.received_aggregate_roots (
    id character(66) NOT NULL,
    domain character varying(255) NOT NULL,
    root character(66) NOT NULL,
    block_number integer NOT NULL
);


--
-- Name: root_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.root_messages (
    id text NOT NULL,
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
    processed_transaction_hash character(66),
    leaf_count numeric,
    sent_timestamp_secs integer,
    sent_task_id character(66),
    relayer_type text
);


--
-- Name: routers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.routers (
    address character(42) NOT NULL
);


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
    assets.domain,
    assets.key,
    assets.id,
    asset_balances.fees_earned,
    asset_balances.locked,
    asset_balances.supplied,
    asset_balances.removed,
    assets."decimal",
    assets.adopted_decimal,
    COALESCE(asset_prices.price, (0)::numeric) AS asset_usd_price,
    (asset_prices.price * (asset_balances.balance / ((10)::numeric ^ assets."decimal"))) AS balance_usd,
    (asset_prices.price * (asset_balances.fees_earned / ((10)::numeric ^ assets."decimal"))) AS fee_earned_usd,
    (asset_prices.price * (asset_balances.locked / ((10)::numeric ^ assets."decimal"))) AS locked_usd,
    (asset_prices.price * (asset_balances.supplied / ((10)::numeric ^ assets."decimal"))) AS supplied_usd,
    (asset_prices.price * (asset_balances.removed / ((10)::numeric ^ assets."decimal"))) AS removed_usd
   FROM (((public.routers
     LEFT JOIN public.asset_balances ON ((routers.address = asset_balances.router_address)))
     LEFT JOIN public.assets ON (((asset_balances.asset_canonical_id = assets.canonical_id) AND ((asset_balances.asset_domain)::text = (assets.domain)::text))))
     LEFT JOIN public.asset_prices ON (((assets.canonical_id = asset_prices.canonical_id) AND (asset_prices."timestamp" = ( SELECT max(asset_prices_1."timestamp") AS max
           FROM public.asset_prices asset_prices_1)))));


--
-- Name: router_liquidity; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.router_liquidity AS
 SELECT r.domain,
    r.local,
    r.adopted,
    sum(r.balance) AS total_balance,
    sum(r.locked) AS total_locked,
    sum(r.supplied) AS total_supplied,
    sum(r.removed) AS total_removed,
    avg(r.asset_usd_price) AS avg_usd_price,
    sum((r.asset_usd_price * (r.balance / ((10)::numeric ^ r."decimal")))) AS total_balance_usd,
    sum((r.asset_usd_price * (r.locked / ((10)::numeric ^ r."decimal")))) AS total_locked_usd,
    sum((r.asset_usd_price * (r.supplied / ((10)::numeric ^ r."decimal")))) AS total_supplied_usd,
    sum((r.asset_usd_price * (r.removed / ((10)::numeric ^ r."decimal")))) AS total_removed_usd
   FROM public.routers_with_balances r
  GROUP BY r.domain, r.local, r.adopted
  ORDER BY r.domain;


--
-- Name: router_liquidity_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.router_liquidity_events (
    id character varying(255) NOT NULL,
    domain character varying(255) NOT NULL,
    router character(42) NOT NULL,
    event public.event_type DEFAULT 'Add'::public.event_type NOT NULL,
    asset character(42) NOT NULL,
    amount numeric DEFAULT 0,
    balance numeric DEFAULT 0,
    block_number integer NOT NULL,
    transaction_hash character(66) NOT NULL,
    "timestamp" integer NOT NULL,
    nonce numeric DEFAULT 0 NOT NULL
);


--
-- Name: router_tvl; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.router_tvl AS
 SELECT latest_transfer.latest_transfer_day,
    router_tvl.asset,
    router_tvl.tvl,
    router_tvl.price,
    router_tvl.tvl_usd
   FROM (( SELECT rb.local AS asset,
            sum(rb.balance) AS tvl,
            avg(rb.asset_usd_price) AS price,
            sum((rb.asset_usd_price * (rb.balance / ((10)::numeric ^ rb."decimal")))) AS tvl_usd
           FROM public.routers_with_balances rb
          GROUP BY rb.local) router_tvl
     CROSS JOIN ( SELECT max((date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date) AS latest_transfer_day
           FROM public.transfers tf) latest_transfer);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(128) NOT NULL
);


--
-- Name: snapshot_roots; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.snapshot_roots (
    id character varying(255) NOT NULL,
    spoke_domain integer NOT NULL,
    root character(66) NOT NULL,
    count integer NOT NULL,
    processed boolean DEFAULT false NOT NULL,
    "timestamp" integer NOT NULL
);


--
-- Name: snapshots; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.snapshots (
    id character varying(255) NOT NULL,
    aggregate_root character(66) NOT NULL,
    base_aggregate_root character(66) NOT NULL,
    roots character(66)[] DEFAULT (ARRAY[]::bpchar[])::character(66)[] NOT NULL,
    domains character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[] NOT NULL,
    end_of_dispute integer NOT NULL,
    processed boolean DEFAULT false NOT NULL,
    status public.snapshot_status DEFAULT 'Proposed'::public.snapshot_status NOT NULL,
    propagate_timestamp integer,
    propagate_task_id character(66),
    relayer_type text,
    proposed_timestamp integer,
    finalized_timestamp integer
);


--
-- Name: spoke_optimistic_roots; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.spoke_optimistic_roots (
    id character varying(255) NOT NULL,
    root character(66) NOT NULL,
    domain character varying(255) NOT NULL,
    end_of_dispute integer NOT NULL,
    root_timestamp integer NOT NULL,
    status public.spoke_root_status DEFAULT 'Proposed'::public.spoke_root_status NOT NULL,
    processed boolean DEFAULT false NOT NULL,
    propose_timestamp integer,
    propose_task_id character varying(255),
    relayer_type text
);


--
-- Name: stableswap_lp_balances; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stableswap_lp_balances (
    pool_id character(66) NOT NULL,
    domain character varying(255) NOT NULL,
    provider character(42) NOT NULL,
    lp_token character(42) NOT NULL,
    balance numeric NOT NULL,
    last_timestamp integer NOT NULL
);


--
-- Name: stableswap_lp_transfers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stableswap_lp_transfers (
    id character varying(255) NOT NULL,
    pool_id character(66) NOT NULL,
    domain character varying(255) NOT NULL,
    lp_token character(42) NOT NULL,
    from_address character(42) NOT NULL,
    to_address character(42) NOT NULL,
    pooled_tokens text[],
    amount numeric NOT NULL,
    balances numeric[],
    block_number integer NOT NULL,
    transaction_hash character(66) NOT NULL,
    "timestamp" integer NOT NULL,
    nonce numeric DEFAULT 0 NOT NULL
);


--
-- Name: stableswap_pools; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stableswap_pools (
    key character(66) NOT NULL,
    domain character varying(255) NOT NULL,
    is_active boolean DEFAULT false,
    lp_token character(42) NOT NULL,
    initial_a integer NOT NULL,
    future_a integer NOT NULL,
    initial_a_time integer NOT NULL,
    future_a_time integer NOT NULL,
    swap_fee character varying(255) NOT NULL,
    admin_fee character varying(255) NOT NULL,
    pooled_tokens text[],
    token_precision_multipliers text[],
    pool_token_decimals integer[],
    balances text[],
    virtual_price character varying(255) NOT NULL,
    invariant character varying(255) NOT NULL,
    lp_token_supply character varying(255) NOT NULL
);


--
-- Name: transfer_count; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.transfer_count AS
 SELECT tf.status,
    (date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date AS transfer_day,
    tf.origin_domain AS origin_chain,
    tf.origin_transacting_asset AS asset,
    count(tf.transfer_id) AS transfer_count
   FROM public.transfers tf
  GROUP BY tf.status, ((date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date), tf.origin_domain, tf.origin_transacting_asset;


--
-- Name: transfers_with_numeric_id; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.transfers_with_numeric_id AS
 SELECT tf.transfer_id,
    tf.nonce,
    tf."to",
    tf.call_data,
    tf.origin_domain,
    tf.destination_domain,
    tf.receive_local,
    tf.origin_chain,
    tf.origin_transacting_asset,
    tf.origin_transacting_amount,
    tf.origin_bridged_asset,
    tf.origin_bridged_amount,
    tf.xcall_caller,
    tf.xcall_transaction_hash,
    tf.xcall_timestamp,
    tf.xcall_gas_price,
    tf.xcall_gas_limit,
    tf.xcall_block_number,
    tf.destination_chain,
    tf.status,
    tf.routers,
    tf.destination_transacting_asset,
    tf.destination_transacting_amount,
    tf.destination_local_asset,
    tf.destination_local_amount,
    tf.execute_caller,
    tf.execute_transaction_hash,
    tf.execute_timestamp,
    tf.execute_gas_price,
    tf.execute_gas_limit,
    tf.execute_block_number,
    tf.execute_origin_sender,
    tf.reconcile_caller,
    tf.reconcile_transaction_hash,
    tf.reconcile_timestamp,
    tf.reconcile_gas_price,
    tf.reconcile_gas_limit,
    tf.reconcile_block_number,
    tf.update_time,
    tf.delegate,
    tf.message_hash,
    tf.canonical_domain,
    tf.slippage,
    tf.origin_sender,
    tf.bridged_amt,
    tf.normalized_in,
    tf.canonical_id,
    tf.router_fee,
    tf.xcall_tx_origin,
    tf.execute_tx_origin,
    tf.reconcile_tx_origin,
    tf.error_status,
    tf.backoff,
    tf.next_execution_timestamp,
    tf.updated_slippage,
    tf.execute_simulation_input,
    tf.execute_simulation_from,
    tf.execute_simulation_to,
    tf.execute_simulation_network,
    tf.error_message,
    tf.message_status,
    tf.relayer_fees,
    (tf.execute_timestamp - tf.xcall_timestamp) AS ttv,
    (tf.reconcile_timestamp - tf.xcall_timestamp) AS ttr,
    ((('x'::text || lpad("substring"((tf.transfer_id)::text, 3, 64), 64, '0'::text)))::bit(64))::bigint AS numeric_id
   FROM public.transfers tf;


--
-- Name: transfers_with_price_ttr_ttv; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.transfers_with_price_ttr_ttv AS
 SELECT tf.transfer_id,
    tf.nonce,
    tf."to",
    tf.call_data,
    tf.origin_domain,
    tf.destination_domain,
    tf.receive_local,
    tf.origin_chain,
    tf.origin_transacting_asset,
    tf.origin_transacting_amount,
    tf.origin_bridged_asset,
    tf.origin_bridged_amount,
    tf.xcall_caller,
    tf.xcall_transaction_hash,
    tf.xcall_timestamp,
    tf.xcall_gas_price,
    tf.xcall_gas_limit,
    tf.xcall_block_number,
    tf.destination_chain,
    tf.status,
    tf.routers,
    tf.destination_transacting_asset,
    tf.destination_transacting_amount,
    tf.destination_local_asset,
    tf.destination_local_amount,
    tf.execute_caller,
    tf.execute_transaction_hash,
    tf.execute_timestamp,
    tf.execute_gas_price,
    tf.execute_gas_limit,
    tf.execute_block_number,
    tf.execute_origin_sender,
    tf.reconcile_caller,
    tf.reconcile_transaction_hash,
    tf.reconcile_timestamp,
    tf.reconcile_gas_price,
    tf.reconcile_gas_limit,
    tf.reconcile_block_number,
    tf.update_time,
    tf.delegate,
    tf.message_hash,
    tf.canonical_domain,
    tf.slippage,
    tf.origin_sender,
    tf.bridged_amt,
    tf.normalized_in,
    tf.canonical_id,
    tf.router_fee,
    tf.xcall_tx_origin,
    tf.execute_tx_origin,
    tf.reconcile_tx_origin,
    tf.error_status,
    tf.backoff,
    tf.next_execution_timestamp,
    tf.updated_slippage,
    tf.execute_simulation_input,
    tf.execute_simulation_from,
    tf.execute_simulation_to,
    tf.execute_simulation_network,
    tf.error_message,
    tf.message_status,
    tf.relayer_fees,
    tf.asset_usd_price,
    tf.decimals,
    tf.usd_amount,
    (tf.execute_timestamp - tf.xcall_timestamp) AS ttv,
    (tf.reconcile_timestamp - tf.xcall_timestamp) AS ttr,
    row_number() OVER (ORDER BY tf.xcall_timestamp, tf.transfer_id) AS id
   FROM public.transfers_with_price tf;


--
-- Name: transfers_with_ttr_ttv; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.transfers_with_ttr_ttv AS
 SELECT tf.transfer_id,
    tf.nonce,
    tf."to",
    tf.call_data,
    tf.origin_domain,
    tf.destination_domain,
    tf.receive_local,
    tf.origin_chain,
    tf.origin_transacting_asset,
    tf.origin_transacting_amount,
    tf.origin_bridged_asset,
    tf.origin_bridged_amount,
    tf.xcall_caller,
    tf.xcall_transaction_hash,
    tf.xcall_timestamp,
    tf.xcall_gas_price,
    tf.xcall_gas_limit,
    tf.xcall_block_number,
    tf.destination_chain,
    tf.status,
    tf.routers,
    tf.destination_transacting_asset,
    tf.destination_transacting_amount,
    tf.destination_local_asset,
    tf.destination_local_amount,
    tf.execute_caller,
    tf.execute_transaction_hash,
    tf.execute_timestamp,
    tf.execute_gas_price,
    tf.execute_gas_limit,
    tf.execute_block_number,
    tf.execute_origin_sender,
    tf.reconcile_caller,
    tf.reconcile_transaction_hash,
    tf.reconcile_timestamp,
    tf.reconcile_gas_price,
    tf.reconcile_gas_limit,
    tf.reconcile_block_number,
    tf.update_time,
    tf.delegate,
    tf.message_hash,
    tf.canonical_domain,
    tf.slippage,
    tf.origin_sender,
    tf.bridged_amt,
    tf.normalized_in,
    tf.canonical_id,
    tf.router_fee,
    tf.xcall_tx_origin,
    tf.execute_tx_origin,
    tf.reconcile_tx_origin,
    tf.relayer_fees,
    tf.error_status,
    tf.backoff,
    tf.next_execution_timestamp,
    (tf.execute_timestamp - tf.xcall_timestamp) AS ttv,
    (tf.reconcile_timestamp - tf.xcall_timestamp) AS ttr
   FROM public.transfers tf;


--
-- Name: weekly_connext_metrics; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.weekly_connext_metrics AS
 SELECT (date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date AS transfer_date,
    count(tf.transfer_id) AS transfer_count,
    count(DISTINCT tf.xcall_caller) AS unique_user_count,
    count(
        CASE
            WHEN ((tf.origin_bridged_amount)::bpchar = '0'::character(1)) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS zero_amount_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS completedfast_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS completedslow_transfer_count,
    avg(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS fastpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS fastpath_avg_ttr_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS slowpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS slowpath_avg_ttr_in_secs
   FROM public.transfers tf
  GROUP BY ((date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date)
  ORDER BY ((date_trunc('day'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date);


--
-- Name: weekly_transfer_metrics; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.weekly_transfer_metrics AS
 SELECT (date_trunc('week'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date AS transfer_date,
    tf.origin_domain AS origin_chain,
    tf.destination_domain AS destination_chain,
    count(tf.transfer_id) AS transfer_count,
    count(DISTINCT tf.xcall_caller) AS unique_user_count,
    count(
        CASE
            WHEN ((tf.origin_bridged_amount)::bpchar = '0'::character(1)) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS zero_amount_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS completedfast_transfer_count,
    count(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN tf.transfer_id
            ELSE NULL::bpchar
        END) AS completedslow_transfer_count,
    avg(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS fastpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedFast'::public.transfer_status) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS fastpath_avg_ttr_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN (tf.execute_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS slowpath_avg_ttv_in_secs,
    avg(
        CASE
            WHEN (tf.status = 'CompletedSlow'::public.transfer_status) THEN (tf.reconcile_timestamp - tf.xcall_timestamp)
            ELSE NULL::integer
        END) AS slowpath_avg_ttr_in_secs
   FROM public.transfers tf
  GROUP BY ((date_trunc('week'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date), tf.origin_domain, tf.destination_domain
  ORDER BY ((date_trunc('week'::text, to_timestamp((tf.xcall_timestamp)::double precision)))::date);


--
-- Name: asset_prices id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_prices ALTER COLUMN id SET DEFAULT nextval('public.asset_prices_id_seq'::regclass);


--
-- Name: aggregated_roots aggregated_roots_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.aggregated_roots
    ADD CONSTRAINT aggregated_roots_pkey PRIMARY KEY (domain_index, domain);


--
-- Name: asset_balances asset_balances_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_balances
    ADD CONSTRAINT asset_balances_pkey PRIMARY KEY (asset_canonical_id, asset_domain, router_address);


--
-- Name: asset_prices asset_prices_canonical_id_canonical_domain_timestamp_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_prices
    ADD CONSTRAINT asset_prices_canonical_id_canonical_domain_timestamp_key UNIQUE (canonical_id, canonical_domain, "timestamp");


--
-- Name: asset_prices asset_prices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_prices
    ADD CONSTRAINT asset_prices_pkey PRIMARY KEY (id);


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
-- Name: daily_router_tvl daily_router_tvl_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.daily_router_tvl
    ADD CONSTRAINT daily_router_tvl_pkey PRIMARY KEY (id);


--
-- Name: merkle_cache merkle_cache_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.merkle_cache
    ADD CONSTRAINT merkle_cache_pkey PRIMARY KEY (domain, domain_path);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (origin_domain, index);


--
-- Name: propagated_roots propagated_roots_aggregate_root_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.propagated_roots
    ADD CONSTRAINT propagated_roots_aggregate_root_key UNIQUE (aggregate_root);


--
-- Name: propagated_roots propagated_roots_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.propagated_roots
    ADD CONSTRAINT propagated_roots_pkey PRIMARY KEY (id);


--
-- Name: received_aggregate_roots received_aggregate_roots_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.received_aggregate_roots
    ADD CONSTRAINT received_aggregate_roots_pkey PRIMARY KEY (root, domain);


--
-- Name: root_messages root_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.root_messages
    ADD CONSTRAINT root_messages_pkey PRIMARY KEY (id);


--
-- Name: router_liquidity_events router_liquidity_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.router_liquidity_events
    ADD CONSTRAINT router_liquidity_events_pkey PRIMARY KEY (id);


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
-- Name: snapshot_roots snapshot_roots_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.snapshot_roots
    ADD CONSTRAINT snapshot_roots_pkey PRIMARY KEY (spoke_domain, root);


--
-- Name: snapshots snapshots_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.snapshots
    ADD CONSTRAINT snapshots_id_key UNIQUE (id);


--
-- Name: snapshots snapshots_id_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.snapshots
    ADD CONSTRAINT snapshots_id_pkey PRIMARY KEY (id);


--
-- Name: spoke_optimistic_roots spoke_optimistic_roots_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.spoke_optimistic_roots
    ADD CONSTRAINT spoke_optimistic_roots_id_key UNIQUE (id);


--
-- Name: spoke_optimistic_roots spoke_optimistic_roots_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.spoke_optimistic_roots
    ADD CONSTRAINT spoke_optimistic_roots_pkey PRIMARY KEY (id);


--
-- Name: stableswap_exchanges stableswap_exchanges_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stableswap_exchanges
    ADD CONSTRAINT stableswap_exchanges_id_key UNIQUE (id);


--
-- Name: stableswap_exchanges stableswap_exchanges_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stableswap_exchanges
    ADD CONSTRAINT stableswap_exchanges_pkey PRIMARY KEY (domain, id);


--
-- Name: stableswap_lp_balances stableswap_lp_balances_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stableswap_lp_balances
    ADD CONSTRAINT stableswap_lp_balances_pkey PRIMARY KEY (pool_id, domain, provider);


--
-- Name: stableswap_lp_transfers stableswap_lp_transfers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stableswap_lp_transfers
    ADD CONSTRAINT stableswap_lp_transfers_pkey PRIMARY KEY (id);


--
-- Name: stableswap_pool_events stableswap_pool_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stableswap_pool_events
    ADD CONSTRAINT stableswap_pool_events_pkey PRIMARY KEY (id);


--
-- Name: stableswap_pools stableswap_pools_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stableswap_pools
    ADD CONSTRAINT stableswap_pools_pkey PRIMARY KEY (domain, key);


--
-- Name: transfers transfers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transfers
    ADD CONSTRAINT transfers_pkey PRIMARY KEY (transfer_id);


--
-- Name: asset_prices_timestamp; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX asset_prices_timestamp ON public.asset_prices USING btree ("timestamp");


--
-- Name: daily_transfer_volume_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX daily_transfer_volume_id_idx ON public.daily_transfer_volume USING btree (id);


--
-- Name: hourly_transfer_volume_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX hourly_transfer_volume_id_idx ON public.hourly_transfer_volume USING btree (id);


--
-- Name: idx_daily_transfer_volume_transfer_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_daily_transfer_volume_transfer_date ON public.daily_transfer_volume USING btree (transfer_date);


--
-- Name: idx_hourly_transfer_volume_transfer_hour; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_hourly_transfer_volume_transfer_hour ON public.hourly_transfer_volume USING btree (transfer_hour);


--
-- Name: messages_domain_leaf_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_domain_leaf_idx ON public.messages USING btree (origin_domain, leaf);


--
-- Name: messages_processed_index_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_processed_index_idx ON public.messages USING btree (processed, index);


--
-- Name: snapshot_roots_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX snapshot_roots_idx ON public.snapshot_roots USING btree (id);


--
-- Name: snapshot_roots_root_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX snapshot_roots_root_idx ON public.snapshot_roots USING btree (root);


--
-- Name: snapshot_roots_spoke_domain_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX snapshot_roots_spoke_domain_idx ON public.snapshot_roots USING btree (spoke_domain);


--
-- Name: snapshots_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX snapshots_idx ON public.snapshots USING btree (id);


--
-- Name: spoke_optimistic_roots_domain_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX spoke_optimistic_roots_domain_idx ON public.spoke_optimistic_roots USING btree (domain);


--
-- Name: spoke_optimistic_roots_domain_root_propose_timestamp_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX spoke_optimistic_roots_domain_root_propose_timestamp_idx ON public.spoke_optimistic_roots USING btree (domain, root, propose_timestamp);


--
-- Name: spoke_optimistic_roots_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX spoke_optimistic_roots_idx ON public.spoke_optimistic_roots USING btree (id);


--
-- Name: spoke_optimistic_roots_root_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX spoke_optimistic_roots_root_idx ON public.spoke_optimistic_roots USING btree (root);


--
-- Name: transfers_destination_domain_update_time_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transfers_destination_domain_update_time_idx ON public.transfers USING btree (destination_domain, update_time);


--
-- Name: transfers_origin_domain_nonce_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transfers_origin_domain_nonce_idx ON public.transfers USING btree (origin_domain, nonce);


--
-- Name: transfers_origin_domain_xcall_timestamp_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transfers_origin_domain_xcall_timestamp_idx ON public.transfers USING btree (origin_domain, xcall_timestamp);


--
-- Name: transfers_status_xcall_timestamp_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transfers_status_xcall_timestamp_idx ON public.transfers USING btree (status, xcall_timestamp);


--
-- Name: transfers_xcall_timestamp; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transfers_xcall_timestamp ON public.transfers USING btree (xcall_timestamp);


--
-- Name: transfers_xcall_transaction_hash_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transfers_xcall_transaction_hash_idx ON public.transfers USING btree (xcall_transaction_hash);


--
-- Name: transfers_xcall_tx_origin_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transfers_xcall_tx_origin_idx ON public.transfers USING btree (xcall_tx_origin);


--
-- Name: transfers update_time_on_transfers; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_time_on_transfers BEFORE UPDATE ON public.transfers FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


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
-- Name: job cron_job_policy; Type: POLICY; Schema: cron; Owner: -
--

CREATE POLICY cron_job_policy ON cron.job USING ((username = CURRENT_USER));


--
-- Name: job_run_details cron_job_run_details_policy; Type: POLICY; Schema: cron; Owner: -
--

CREATE POLICY cron_job_run_details_policy ON cron.job_run_details USING ((username = CURRENT_USER));


--
-- Name: job; Type: ROW SECURITY; Schema: cron; Owner: -
--

ALTER TABLE cron.job ENABLE ROW LEVEL SECURITY;

--
-- Name: job_run_details; Type: ROW SECURITY; Schema: cron; Owner: -
--

ALTER TABLE cron.job_run_details ENABLE ROW LEVEL SECURITY;

--
-- Name: bigq; Type: PUBLICATION; Schema: -; Owner: -
--

CREATE PUBLICATION bigq FOR ALL TABLES WITH (publish = 'insert, update, delete, truncate');


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20220520150644'),
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
    ('20221006193142'),
    ('20221009051415'),
    ('20221010233716'),
    ('20221011065150'),
    ('20221018124227'),
    ('20221018190949'),
    ('20221019094510'),
    ('20221025060119'),
    ('20221026084236'),
    ('20221027123722'),
    ('20221118203009'),
    ('20221122235058'),
    ('20221130222017'),
    ('20221207151852'),
    ('20221216164744'),
    ('20230104142147'),
    ('20230105105045'),
    ('20230105152814'),
    ('20230113140119'),
    ('20230119130526'),
    ('20230127195903'),
    ('20230130081731'),
    ('20230201004755'),
    ('20230206131920'),
    ('20230207104528'),
    ('20230209013027'),
    ('20230209043516'),
    ('20230213052113'),
    ('20230213141356'),
    ('20230214014310'),
    ('20230215142524'),
    ('20230215172901'),
    ('20230227071659'),
    ('20230307011812'),
    ('20230307090110'),
    ('20230307092333'),
    ('20230307171914'),
    ('20230308083252'),
    ('20230308162843'),
    ('20230310035445'),
    ('20230405050248'),
    ('20230405091124'),
    ('20230412003613'),
    ('20230412084403'),
    ('20230412090505'),
    ('20230414101408'),
    ('20230420031450'),
    ('20230420035031'),
    ('20230508151158'),
    ('20230509112648'),
    ('20230509123037'),
    ('20230509165732'),
    ('20230510210620'),
    ('20230519155643'),
    ('20230523134345'),
    ('20230530074124'),
    ('20230608135754'),
    ('20230608174759'),
    ('20230613125451'),
    ('20231012233640'),
    ('20231020201556'),
    ('20231031081722'),
    ('20231031145848'),
    ('20231102213156'),
    ('20231127165037'),
    ('20231127165223'),
    ('20231128023332'),
    ('20231130084431'),
    ('20231219013906'),
    ('20231219072355'),
    ('20231219231640'),
    ('20240212031628');
