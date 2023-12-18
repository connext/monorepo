-- migrate:up
CREATE TYPE public.spoke_root_status AS ENUM ('Submitted', 'Proposed', 'Finalized');
CREATE TABLE public.spoke_optimistic_roots (
    id character varying(255) NOT NULL UNIQUE,
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
CREATE INDEX spoke_optimistic_roots_idx ON spoke_optimistic_roots USING btree (id);
CREATE INDEX spoke_optimistic_roots_root_idx ON spoke_optimistic_roots USING btree (root);
CREATE INDEX spoke_optimistic_roots_domain_idx ON spoke_optimistic_roots USING btree (domain);
CREATE UNIQUE INDEX ON public.spoke_optimistic_roots (domain, root);
-- migrate:down
DROP TABLE public.spoke_optimistic_roots;
DROP TYPE public.spoke_root_status;
```