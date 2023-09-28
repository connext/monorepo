-- migrate:up
ALTER TABLE public.messages
ADD COLUMN IF NOT EXISTS transfer_id character(66);


-- migrate:down
ALTER TABLE messages DROP COLUMN transfer_id;
