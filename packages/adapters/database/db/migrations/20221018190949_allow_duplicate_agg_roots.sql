-- migrate:up


ALTER TABLE ONLY public.aggregated_roots
    DROP CONSTRAINT aggregated_roots_id_key;

ALTER TABLE ONLY public.aggregated_roots
    DROP CONSTRAINT IF EXISTS aggregated_roots_received_root_key;


-- migrate:down


ALTER TABLE ONLY public.aggregated_roots
    ADD CONSTRAINT aggregated_roots_id_key UNIQUE (id);

ALTER TABLE ONLY public.aggregated_roots
    ADD CONSTRAINT aggregated_roots_received_root_key UNIQUE (received_root);

