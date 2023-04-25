-- migrate:up
CREATE OR REPLACE VIEW public.transfers_with_price AS ( 
    SELECT t.*, COALESCE (p.price,0) AS asset_usd_price
    FROM public.transfers t
    LEFT JOIN (
        SELECT t.transfer_id, t.xcall_timestamp, p.price
        FROM public.transfers t
            JOIN public.asset_prices p 
                ON p.timestamp = (SELECT MAX(timestamp) FROM public.asset_prices WHERE canonical_id = t.canonical_id AND timestamp <= t.xcall_timestamp)
        ) p ON t.transfer_id = p.transfer_id
    );

-- migrate:down
DROP VIEW IF EXISTS public.transfers_with_price;

