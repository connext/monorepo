-- migrate:up
ALTER TABLE public.assets
    ADD COLUMN IF NOT EXISTS adopted_decimal numeric DEFAULT 0;


-- migrate:down
ALTER TABLE assets 
    DROP COLUMN adopted_decimal;
