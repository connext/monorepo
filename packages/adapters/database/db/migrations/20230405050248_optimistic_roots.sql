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
    end_of_dispute integer NOT NULL,
    processed boolean DEFAULT false NOT NULL,
    status public.snapshot_status DEFAULT 'Proposed'::public.snapshot_status NOT NULL,
    propagate_timestamp integer,
    propagate_task_id character(66),
    relayer_type text
);
CREATE INDEX snapshots_idx ON snapshots USING btree (id);

CREATE TABLE public.snapshot_roots (
    id character varying(255) NOT NULL UNIQUE,
    spoke_domain integer NOT NULL,
    root character(66) NOT NULL,
    count integer NOT NULL,
    processed boolean DEFAULT false NOT NULL
);
CREATE INDEX snapshot_roots_idx ON snapshot_roots USING btree (id);
CREATE INDEX snapshot_roots_root_idx ON snapshot_roots USING btree (root);
CREATE INDEX snapshot_roots_spoke_domain_idx ON snapshot_roots USING btree (spoke_domain);


-- migrate:down

DROP TABLE public.snapshots ;
DROP TABLE public.snapshot_roots ;
DROP TYPE public.snapshot_status;