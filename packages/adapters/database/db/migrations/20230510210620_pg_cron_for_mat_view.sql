-- migrate:up
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a cron job to refresh the materialized views every 30 mins
SELECT cron.schedule('30 * * * *', $$REFRESH MATERIALIZED VIEW CONCURRENTLY public.daily_transfer_volume$$);
SELECT cron.schedule('30 * * * *', $$REFRESH MATERIALIZED VIEW CONCURRENTLY public.hourly_transfer_volume$$);

-- migrate:down
DROP EXTENSION IF EXISTS pg_cron;
