-- migrate:up transaction:false
alter type transfer_status
add value 'CompletedSlow';
alter type transfer_status
add value 'CompletedFast';
alter table if exists transfers
add column if not exists callback character(42);
alter table if exists transfers
add column if not exists "recovery" character(42);
alter table if exists transfers
add column if not exists callback_fee numeric;
alter table if exists transfers
add column if not exists execute_relayer_fee numeric;
-- migrate:down
alter table if exists transfers drop column if exists callback;
alter table if exists transfers drop column if exists "recovery";
alter table if exists transfers drop column if exists callback_fee;
alter table if exists transfers drop column if exists execute_relayer_fee;