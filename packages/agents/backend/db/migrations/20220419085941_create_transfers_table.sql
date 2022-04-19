-- migrate:up
create type transfer_status as enum ('pending', 'xcalled', 'executed', 'reconciled', 'failed');
create table users (
  -- meta
  transfer_id character(66) primary key,
  origin_domain varchar(255) not null,
  destination_domain varchar(255) not null,
  status transfer_status not null default 'pending',

  -- transfer data
  "to" character(42) not null,
  call_to character(42) not null default "0x0000000000000000000000000000000000000000",
  call_data text,
  idx bigint,
  nonce bigint not null,
  router character(42),

  -- xcall
  xcall_caller character(42),
  transferring_amount numeric,
  local_amount numeric,
  transferring_asset character(42),
  local_asset character(42),
  xcall_transaction_hash character(66),
  xcall_timestamp integer,
  xcall_gas_price numeric,
  xcall_gas_limit numeric,
  block_number integer
);


-- migrate:down

