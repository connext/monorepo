-- migrate:up
ALTER TABLE root_messages
ADD COLUMN sent_timestamp_secs integer,
  ADD COLUMN sent_task_id character(66),
  ADD COLUMN relayer_type text;
-- migrate:down
ALTER TABLE root_messages DROP COLUMN sent_time,
  DROP COLUMN sent_task_id,
  DROP COLUMN relayer_type;