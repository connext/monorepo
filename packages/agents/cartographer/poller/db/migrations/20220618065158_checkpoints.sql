-- migrate:up

CREATE TABLE public.checkpoints (
    check_name character varying(255) NOT NULL PRIMARY KEY,
    check_point numeric DEFAULT 0 NOT NULL
);


-- migrate:down

