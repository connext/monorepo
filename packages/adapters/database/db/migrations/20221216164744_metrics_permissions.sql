-- migrate:up
GRANT SELECT ON public.daily_transfer_metrics to reader;
GRANT SELECT ON public.daily_transfer_volume to reader;
GRANT SELECT ON public.hourly_transfer_metrics to reader;
GRANT SELECT ON public.hourly_transfer_volume to reader;
GRANT SELECT ON public.transfers_with_ttr_ttv to reader;
GRANT SELECT ON public.transfer_volume to reader;

GRANT SELECT ON public.daily_transfer_metrics to query;
GRANT SELECT ON public.daily_transfer_volume to query;
GRANT SELECT ON public.hourly_transfer_metrics to query;
GRANT SELECT ON public.hourly_transfer_volume to query;
GRANT SELECT ON public.transfers_with_ttr_ttv to query;
GRANT SELECT ON public.transfer_volume to query;
-- migrate:down