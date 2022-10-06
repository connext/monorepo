-- migrate:up
ALTER TABLE sent_root_messages
ADD COLUMN IF NOT EXISTS processed boolean NOT NULL DEFAULT false;
UPDATE sent_root_messages
SET sent_root_messages.processed = true
FROM processed_root_messages
WHERE sent_root_messages.message_id = processed_root_messages.message_id;
-- migrate:down