-- migrate:up
CREATE OR REPLACE VIEW public.transfers_with_price AS ( 
    SELECT t.*, COALESCE (p.price,0) AS asset_usd_price
    FROM public.transfers t
    LEFT JOIN (
        SELECT t.transfer_id, t.xcall_timestamp, p.price
        FROM public.transfers t
            JOIN public.asset_prices p 
                ON p.canonical_id = t.canonical_id AND p.timestamp = (SELECT MAX(timestamp) FROM public.asset_prices WHERE timestamp <= t.xcall_timestamp)
        ) p ON t.transfer_id = p.transfer_id
    );

DROP INDEX IF EXISTS transfers_xcall_timestamp;
DROP INDEX IF EXISTS asset_prices_timestamp;
CREATE INDEX transfers_xcall_timestamp ON public.transfers (xcall_timestamp);
CREATE INDEX asset_prices_timestamp ON public.asset_prices (timestamp);

GRANT SELECT ON public.transfers_with_price to query;
GRANT SELECT ON public.transfers_with_price to reader;

-- migrate:down
DROP VIEW IF EXISTS public.transfers_with_price;
DROP INDEX IF EXISTS transfers_xcall_timestamp;
DROP INDEX IF EXISTS asset_prices_timestamp;
