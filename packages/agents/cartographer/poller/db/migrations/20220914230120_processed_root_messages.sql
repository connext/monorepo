-- migrate:up
CREATE TABLE IF NOT EXISTS public.processed_root_messages (
    id character(66) NOT NULL PRIMARY KEY,
    root character(66),
    caller character(42),
    transaction_hash character(66),
    processed_timestamp integer,
    gas_price numeric,
    gas_limit numeric,
    block_number integer
);

GRANT SELECT ON public.processed_root_messages to query;
GRANT SELECT ON public.processed_root_messages to reader;

-- migrate:down
DROP TABLE IF EXISTS public.processed_root_messages;