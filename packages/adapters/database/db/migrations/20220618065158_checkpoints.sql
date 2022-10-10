-- migrate:up
CREATE TABLE IF NOT EXISTS public.checkpoints (
    check_name character varying(255) NOT NULL PRIMARY KEY,
    check_point numeric DEFAULT 0 NOT NULL
);
-- migrate:down
DROP TABLE public.checkpoints;