-- migrate:up
CREATE TABLE IF NOT EXISTS public.asset_prices (
    id SERIAL PRIMARY KEY,
    canonical_id character(66) NOT NULL,
    canonical_domain character varying(255) NOT NULL,
    timestamp integer,
    price numeric
);

GRANT SELECT ON public.asset_prices to query;
GRANT SELECT ON public.asset_prices to reader;


ALTER TABLE transfers ADD column asset_usd_price numeric DEFAULT 0 NOT NULL;

CREATE OR REPLACE FUNCTION trigger_set_asset_price_usd()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE transfers t
  SET asset_usd_price = (
    SELECT price
    FROM public.asset_prices p
    WHERE t.canonical_domain = p.canonical_domain AND t.canonical_id = p.canonical_id AND p.timestamp <= t.xcall_timestamp
    ORDER BY ABS(p.timestamp - t.xcall_timestamp)
    LIMIT 1
  )
  WHERE t.transfer_id = NEW.transfer_id; -- primary key
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_price_on_transfers
    AFTER INSERT OR UPDATE ON transfers
    FOR EACH ROW
EXECUTE PROCEDURE trigger_set_asset_price_usd();

-- migrate:down
DROP TABLE IF EXISTS public.asset_prices;