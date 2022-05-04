-- migrate:up
create type transfer_status as enum ('XCalled', 'Executed', 'Reconciled', 'Completed');
create table transfers (
  origin_domain varchar(255) not null,
  destination_domain varchar(255),

  nonce bigint,

  -- xparams
  "to" character(42),
  call_data text,

  -- XTransferCoreSchema
  idx bigint,
  transfer_id character(66) primary key,

  -- origin
  origin_chain varchar(255),
  origin_transacting_asset character(42),
  origin_transacting_amount numeric,
  origin_bridged_asset character(42),
  origin_bridged_amount numeric,
  xcall_caller character(42),
  xcall_transaction_hash character(66),
  xcall_timestamp integer,
  xcall_gas_price numeric,
  xcall_gas_limit numeric,
  xcall_block_number integer,
  xcall_relayer_fee numeric,

  -- destination
  destination_chain varchar(255),
  "status" transfer_status not null default 'XCalled',
  routers character(42)[],
  destination_transacting_asset character(42),
  destination_transacting_amount numeric,
  destination_local_asset character(42),
  destination_local_amount numeric,
  execute_caller character(42),
  execute_transaction_hash character(66),
  execute_timestamp integer,
  execute_gas_price numeric,
  execute_gas_limit numeric,
  execute_block_number integer,
  execute_origin_sender character(42),
  reconcile_caller character(42),
  reconcile_transaction_hash character(66),
  reconcile_timestamp integer,
  reconcile_gas_price numeric,
  reconcile_gas_limit numeric,
  reconcile_block_number integer
);


-- migrate:down
drop table transfers;
drop type transfer_status;