-- migrate:up
ALTER TABLE public.transfers
ADD COLUMN IF NOT EXISTS message_hash character(66);

ALTER TABLE public.transfers
ADD CONSTRAINT fk_transfers_messages FOREIGN KEY (message_hash) REFERENCES public.messages (leaf);
-- migrate:down
