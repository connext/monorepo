-- migrate:up
ALTER TABLE transfers ADD column update_time timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.update_time = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_time_on_transfers
    BEFORE UPDATE
    ON transfers
    FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- migrate:down

