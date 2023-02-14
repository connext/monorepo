# Metric Definition

## Table of Content

1. TTR & TTV by Transfers
2. Daily Transfer Metrics
3. Daily Volume Metrics
4. Hourly Transfer Metrics
5. Hourly Volume Metrics
6. TVL by Router

### 1. TTR & TTV by Transfers

#### Endpoint

[http://0.0.0.0:3000/transfers_with_ttr_ttv](http://0.0.0.0:3000/transfers_with_ttr_ttv)

This enpoint is an extention of transfers endpoint with TTR and TTV calculated for each endpoint

- `ttr`: Time between when transfer was XCalled(xcall_timestamp) to transfer got exceuted(execute_timestamp)
- `ttv`: Time between when transfer was XCalled(xcall_timestamp) to transfer got Reconcile(reconcile_timestamp)

#### Sample data returned

```json
{
  "transfer_id": "0x6d48b89d835c7ba021027fb6d6c3b5b5412baac9d0e7e7e1ec5ae56998e56793",
  "nonce": 85,
  "to": "0xdfa2df213f7cfea39c7c55414eb70c4edd754b5c",
  "call_data": "0x",
  "origin_domain": "1111",
  "destination_domain": "3331",
  "recovery": "0x39096a17ba70fe5c1eddb923f940b2e6deae5c3b",
  "force_slow": false,
  "receive_local": false,
  "callback": "0x0000000000000000000000000000000000000000",
  "callback_fee": 0,
  "relayer_fee": 0,
  "origin_chain": "4",
  "origin_transacting_asset": "0x3ffc03f05d1869f493c7dbf913e636c6280e0ff9",
  "origin_transacting_amount": 1000000000000000000,
  "origin_bridged_asset": "0x3ffc03f05d1869f493c7dbf913e636c6280e0ff9",
  "origin_bridged_amount": 1000000000000000000,
  "xcall_caller": "0xdfa2df213f7cfea39c7c55414eb70c4edd754b5c",
  "xcall_transaction_hash": "0x0b5f7df5af9ccd1c9774de4ea18f9e7aad65a591a8db323e62f576880b641732",
  "xcall_timestamp": 1658945676,
  "xcall_gas_price": 20000000000,
  "xcall_gas_limit": 2000000,
  "xcall_block_number": 11099020,
  "destination_chain": null,
  "status": "XCalled",
  "routers": null,
  "destination_transacting_asset": null,
  "destination_transacting_amount": null,
  "destination_local_asset": null,
  "destination_local_amount": null,
  "execute_caller": null,
  "execute_transaction_hash": null,
  "execute_timestamp": null,
  "execute_gas_price": null,
  "execute_gas_limit": null,
  "execute_block_number": null,
  "execute_origin_sender": null,
  "reconcile_caller": null,
  "reconcile_transaction_hash": null,
  "reconcile_timestamp": null,
  "reconcile_gas_price": null,
  "reconcile_gas_limit": null,
  "reconcile_block_number": null,
  "update_time": "2022-08-11T15:04:32.201383",
  "agent": "0x0000000000000000000000000000000000000000",
  "slippage_tol": 0,
  "ttr": null,
  "ttv": null
}
```

### 2. Daily Transfer Metrics

Aggreagte count the distinct transfer for a given trandfer_date.

#### Endpoint

[http://0.0.0.0:3000/daily_transfer_metrics](http://0.0.0.0:3000/daily_transfer_metrics)

- Aggreagtions:
  Each of aggreagtions are grouped by the transfer parameters

  - `transfer_count`: Distinct count of transfer ids in a given day
  - `unique_user_count`: Distinct count of xcall_caller
  - `force_slow_transfer_count`: Distinct count of trasfers ids when path taken in slow
  - `zero_amount_transfer_count`: Distinct count of trasfers ids when amount transfered = 0
  - `xcalled_transfer_count`: Distinct count of trasfers ids in status XCalled
  - `executed_transfer_count`: Distinct count of trasfers ids in status Executed
  - `reconciled_transfer_count`: Distinct count of trasfers ids in status reconciled
  - `completedfast_transfer_count`: Distinct count of trasfers ids with status completedfast
  - `completedslow_transfer_count`: Distinct count of trasfers ids with status completedslow
  - `fastpath_avg_ttv_in_secs`: Average time between when transfer was XCalled(xcall_timestamp) to transfer got exceuted(execute_timestamp), for transfers with status fastpath.
  - `fastpath_avg_ttr_in_secs`: Average time between when transfer was XCalled(xcall_timestamp) to transfer got Reconcile(reconcile_timestamp), for transfers with status fastpath.
  - `slowpath_avg_ttv_in_secs`: Average time between when transfer was XCalled(xcall_timestamp) to transfer got exceuted(execute_timestamp), for transfers with status slowpath.
  - `slowpath_avg_ttr_in_secs`: Average time between when transfer was XCalled(xcall_timestamp) to transfer got Reconcile(reconcile_timestamp), for transfers with status slowpath.

- Transfer parameters:

  - `transfer_date`: Date of Transfer
  - `origin_chain`: ID of orginal chain where transfer is initiated
  - `destination_chain`: ID of destination chain where funds from transfer will land
  - `router`: Address of Router
  - `asset`: Asset getting transfered

#### Sample data returned

```json
{
  "transfer_date": "2022-07-07",
  "origin_chain": "1111",
  "destination_chain": "3331",
  "router": null,
  "asset": "0x3ffc03f05d1869f493c7dbf913e636c6280e0ff9",
  "transfer_count": 8,
  "unique_user_count": 3,
  "force_slow_transfer_count": 11,
  "zero_amount_transfer_count": 1,
  "xcalled_transfer_count": 8,
  "executed_transfer_count": 0,
  "reconciled_transfer_count": 0,
  "completedfast_transfer_count": 0,
  "completedslow_transfer_count": 0,
  "fastpath_avg_ttv_in_secs": null,
  "fastpath_avg_ttr_in_secs": null,
  "slowpath_avg_ttv_in_secs": null,
  "slowpath_avg_ttr_in_secs": null
}
```

#### Aggreagtions on top of this endpoint

Transfer parameters can be used to furter slice the data and do aggreagations on top of it.

- Total count of transfers by date parameter( Month, Quarter, Year)
- Total count of transfers by chain: origin, destination or both
- Total count of specific transfer type by transfer parameters

#### Disclamiers

- Few aggreation can't be reaggreagted based on how the data is returned by the API.
- User metric: `unique_user_count` can't be summed together by transfer parameters to get overall user count.

### 3. Daily Volume Metrics

#### Endpoint

`http://0.0.0.0:3000/daily_transfer_volume`

- Transfer parameters:

  - `status`: Transfer status
  - `transfer_date`: Date of transfer initiation
  - `origin_chain`: Chain Id of the origin domain
  - `destination_chain`: Chain Id of the destination domain
  - `router`: Router address
  - `asset`: Asset getting transfered

- Aggreagtions:

  - `volume`: Total asset transferred for the transfer parameters
  - `force_slow_transfer_volume`: Total asset transferred using the slowpath

#### Sample data returned

```json
{
  "status": "XCalled",
  "transfer_date": "2022-07-27",
  "origin_chain": "1111",
  "destination_chain": "3331",
  "router": null,
  "asset": "0x3ffc03f05d1869f493c7dbf913e636c6280e0ff9",
  "volume": 800000000000000000000,
  "force_slow_transfer_volume": 0
}
```

#### Aggregations on top of this endpoint

- Total volume by a chain: origin, destination or both
- Total volume by router for a given asset
- Total volume till date for a given asset
- Total forced slow volume by router for a given asset
- Total forced slow volume till date for a given asset

### 4. Hourly Transfer metrics

#### Endpoint

[http://0.0.0.0:3000/hourly_transfer_metrics](http://0.0.0.0:3000/hourly_transfer_metrics)

This endpoint is similar as, `http://0.0.0.0:3000/daily_transfer_metrics` in terms on filters with exception of metrics aggregated on hourly basis.

#### Sample data returned

```json
{
  "transfer_hour": "2022-07-07T04:00:00+00:00",
  "origin_chain": "1111",
  "destination_chain": "3331",
  "router": null,
  "asset": "0x3ffc03f05d1869f493c7dbf913e636c6280e0ff9",
  "transfer_count": 1,
  "unique_user_count": 1,
  "force_slow_transfer_count": 0,
  "zero_amount_transfer_count": 0,
  "xcalled_transfer_count": 1,
  "executed_transfer_count": 0,
  "reconciled_transfer_count": 0,
  "completedfast_transfer_count": 0,
  "completedslow_transfer_count": 0,
  "fastpath_avg_ttv_in_secs": null,
  "fastpath_avg_ttr_in_secs": null,
  "slowpath_avg_ttv_in_secs": null,
  "slowpath_avg_ttr_in_secs": null
}
```

#### Aggregations on top of this endpoint

Simmilar to Daily Transfer Metrics.

### 5. Hourly Transfer Volume

#### Endpoint

[http://0.0.0.0:3000/hourly_transfer_volume](http://0.0.0.0:3000/hourly_transfer_volume)

This endpoint is similar as, `http://0.0.0.0:3000/daily_transfer_volume` in terms of filters with exception of metrics aggregated on hourly basis.

#### Sample data returned

```json
{
  "status": "XCalled",
  "transfer_hour": "2022-07-11T19:00:00+00:00",
  "origin_chain": "1111",
  "destination_chain": "3331",
  "router": null,
  "asset": "0x3ffc03f05d1869f493c7dbf913e636c6280e0ff9",
  "volume": 3700000000000000000000,
  "force_slow_transfer_volume": 0
}
```

#### Aggregations on top of this endpoint

Simmilar to Daily Transfer Metrics.

### 6. TVL by Routers

#### Endpoint

[http://0.0.0.0:3000/daily_router_tvl](http://0.0.0.0:3000/daily_router_tvl)

- Aggreagtions:

  - `balance`: TVL aggregated by transfer parameters

- Transfer parameters:
  - `day`
  - `domain`
  - `asset`
  - `router`

#### Sample data returned

```json
{
  "day": "2022-07-27",
  "domain": "1337",
  "asset": "0x3ffc03f05d1869f493c7dbf913e636c6280e0ff9",
  "router": "0x90adf3d746e1cae02d8f9e2b62faabfb1229d9b8",
  "balance": 100000000000000000000000
}
```

#### Aggregations on top of this endpoint

- Total tvl by date
- Total tvl by router
