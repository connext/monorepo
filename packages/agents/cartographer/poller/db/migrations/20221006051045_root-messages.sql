-- migrate:up
ALTER TABLE sent_root_messages
ADD COLUMN IF NOT EXISTS processed boolean NOT NULL DEFAULT false;
ALTER TABLE sent_root_messages
ADD COLUMN IF NOT EXISTS processed_transaction_hash character(66);
ALTER TABLE sent_root_messages
  RENAME COLUMN transaction_hash TO sent_transaction_hash;
UPDATE sent_root_messages
SET processed = true,
  processed_transaction_hash = processed_root_messages.transaction_hash
FROM processed_root_messages
WHERE sent_root_messages.id = processed_root_messages.id;
ALTER TABLE sent_root_messages
  RENAME TO root_messages;
DROP TABLE processed_root_messages;
GRANT SELECT ON public.root_messages to reader;
ALTER TABLE root_messages
  RENAME CONSTRAINT sent_root_messages_pkey TO root_messages_pkey;
-- migrate:down
ALTER TABLE root_messages
  RENAME TO sent_root_messages;
ALTER TABLE sent_root_messages DROP COLUMN processed;
ALTER TABLE sent_root_messages DROP COLUMN processed_transaction_hash;
ALTER TABLE sent_root_messages
  RENAME COLUMN sent_transaction_hash TO transaction_hash;
CREATE TABLE IF NOT EXISTS public.processed_root_messages (
  id character(66) NOT NULL PRIMARY KEY,
  spoke_domain character varying(255),
  hub_domain character varying(255),
  root character(66),
  caller character(42),
  transaction_hash character(66),
  processed_timestamp integer,
  gas_price numeric,
  gas_limit numeric,
  block_number integer
);
ALTER TABLE sent_root_messages
  RENAME CONSTRAINT root_messages_pkey TO sent_root_messages_pkey;