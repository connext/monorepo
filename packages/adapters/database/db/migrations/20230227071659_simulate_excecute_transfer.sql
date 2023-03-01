-- migrate:up
ALTER TABLE transfers
ADD COLUMN execute_simulation_input text;

ALTER TABLE transfers
ADD COLUMN execute_simulation_from character(42);

ALTER TABLE transfers
ADD COLUMN execute_simulation_to character(42);

ALTER TABLE transfers
ADD COLUMN execute_simulation_network character varying(255);

ALTER TABLE transfers
ADD COLUMN error_message character varying(255);

-- migrate:down
ALTER TABLE transfers DROP COLUMN execute_simulation_input;
ALTER TABLE transfers DROP COLUMN execute_simulation_from;
ALTER TABLE transfers DROP COLUMN execute_simulation_to;
ALTER TABLE transfers DROP COLUMN execute_simulation_network;
ALTER TABLE transfers DROP COLUMN error_message;
