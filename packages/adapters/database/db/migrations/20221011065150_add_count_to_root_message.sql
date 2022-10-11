-- migrate:up

ALTER TABLE public.root_messages
ADD COLUMN IF NOT EXISTS leaf_count numeric;

-- migrate:down
ALTER TABLE root_messages DROP COLUMN leaf_count;
