-- migrate:up
CREATE TYPE public.snapshot_status AS ENUM (
    'Proposed',
    'Finalized',
    'Propagated'
);


-- TODO: Order criteria Timestamp 

CREATE TABLE public.snapshots (
    id character varying(255) NOT NULL UNIQUE,
    aggregate_root character(66) NOT NULL,
    base_aggregate_root character(66) NOT NULL,
    roots character(66)[] DEFAULT ARRAY[]::character(66)[] NOT NULL,
    domains character varying(255)[] DEFAULT ARRAY[]::character varying(255)[] NOT NULL,
    processed boolean DEFAULT false NOT NULL,
    status public.snapshot_status DEFAULT 'Proposed'::public.snapshot_status NOT NULL,
    propagate_timestamp integer,
    propagate_task_id character(66),
    relayer_type text
);

-- migrate:down

DROP TYPE public.snapshot_status;
DROP TABLE public.snapshots ;