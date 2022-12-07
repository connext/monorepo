-- migrate:up
ALTER TABLE public.transfers
ALTER COLUMN origin_transacting_amount TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN origin_bridged_amount TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN xcall_gas_price TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN xcall_gas_limit TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN destination_transacting_amount TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN destination_local_amount TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN execute_gas_price TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN execute_gas_limit TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN reconcile_gas_price TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN reconcile_gas_limit TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN bridged_amt TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN normalized_in TYPE character varying (255);

ALTER TABLE public.transfers
ALTER COLUMN router_fee TYPE character varying (255);
-- migrate:down

