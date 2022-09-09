-- migrate:up
CREATE TABLE IF NOT EXISTS public.messages (
    leaf character(66) NOT NULL PRIMARY KEY,
    origin_domain character varying(255) NOT NULL,
    destination_domain character varying(255),
    index numeric,
    root character(66),
    message varchar,
    processed boolean DEFAULT false,
    return_data character varying(255)
);

-- migrate:down
DROP TABLE IF EXISTS public.messages;

