-- migrate:up
GRANT SELECT ON public.daily_transfer_volume to query;
GRANT SELECT ON public.daily_transfer_volume to reader;

GRANT SELECT ON public.hourly_transfer_volume to query;
GRANT SELECT ON public.hourly_transfer_volume to reader;

-- migrate:down

