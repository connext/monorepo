-- migrate:up
CREATE INDEX messages_processed_index_idx ON messages (processed, index);
CREATE INDEX transfers_status_xcall_timestamp_idx ON transfers (status, xcall_timestamp);
CREATE INDEX transfers_origin_domain_xcall_timestamp_idx ON transfers (origin_domain, xcall_timestamp);
CREATE INDEX transfers_destination_domain_update_time_idx ON transfers (destination_domain, update_time);

-- migrate:down
DROP INDEX messages_processed_index_idx;
DROP INDEX transfers_status_xcall_timestamp_idx;
DROP INDEX transfers_origin_domain_xcall_timestamp_idx;
DROP INDEX transfers_destination_domain_update_time_idx;
