-- migrate:up

CREATE  OR REPLACE VIEW public.stableswap_lp_balances AS ( 
    SELECT 
        e.pool_id,
        e.domain,
        e.provider,
        SUM(
        	CASE 
        		WHEN e.action = 'Add' THEN e.lp_token_amount
        		WHEN e.action = 'Remove' THEN -1 * e.lp_token_amount
        	END
        ) As balance,
        SUM(
            CASE WHEN e.action = 'Add' THEN 1 ELSE 0 END
        ) AS add_count,
        SUM(
            CASE WHEN e.action = 'Remove' THEN 1 ELSE 0 END
        ) AS remove_count
    FROM public.stableswap_pool_events e
    GROUP BY 1,2,3
    );

GRANT SELECT ON public.stableswap_lp_balances to query;
GRANT SELECT ON public.stableswap_lp_balances to reader;


-- migrate:down

DROP TABLE IF EXISTS public.stableswap_lp_balances;