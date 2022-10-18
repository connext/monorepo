-- migrate:up

-- 
-- Clean up
-- 
ALTER TABLE public.transfers
DROP COLUMN IF EXISTS recovery cascade;

ALTER TABLE public.transfers
DROP COLUMN IF EXISTS force_slow cascade;

ALTER TABLE public.transfers
DROP COLUMN IF EXISTS callback cascade;

ALTER TABLE public.transfers
DROP COLUMN IF EXISTS callback_fee cascade;

ALTER TABLE public.transfers
DROP COLUMN IF EXISTS relayer_fee cascade;

ALTER TABLE public.transfers
DROP COLUMN IF EXISTS transfer_status_update_by_agent cascade;

ALTER TABLE public.transfers
DROP COLUMN IF EXISTS transfer_status_message_by_agent cascade;
-- migrate:down

