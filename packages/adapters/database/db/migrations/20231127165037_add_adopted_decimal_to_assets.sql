-- migrate:up
ALTER TABLE public.assets
    ADD COLUMN IF NOT EXISTS adopted_decimal numeric DEFAULT 0 NOT NULL;


-- migrate:down
ALTER TABLE assets 
    DROP COLUMN adopted_decimal;
