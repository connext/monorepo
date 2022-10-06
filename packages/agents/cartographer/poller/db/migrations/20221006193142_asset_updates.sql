-- migrate:up

ALTER TABLE public.assets
ADD COLUMN IF NOT EXISTS key character(66);

ALTER TABLE public.assets
ADD COLUMN IF NOT EXISTS id character(42);

-- migrate:down

