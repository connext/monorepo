-- migrate:up
DROP VIEW IF EXISTS public.transfers_with_ttr_ttv;

CREATE OR REPLACE VIEW public.transfers_with_ttr_ttv AS (
	SELECT 
		tf.*,
		(tf.execute_timestamp - tf.xcall_timestamp) AS ttv,
		(tf.reconcile_timestamp - tf.xcall_timestamp) AS ttr
	FROM public.transfers tf
);

-- migrate:down

