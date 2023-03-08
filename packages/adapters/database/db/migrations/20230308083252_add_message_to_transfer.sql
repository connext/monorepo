-- migrate:up
ALTER TABLE public.messages
ADD COLUMN IF NOT EXISTS message character(66);

-- migrate:down

