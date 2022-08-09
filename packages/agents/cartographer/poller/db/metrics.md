# Metrics

## Metrics Avaiable

- routers_with_balances
- transfers_count
- daily_average_ttv_ttr_in_secs
- average_ttv_ttr_in_secs to query
- agg_volume_transfer_by_period

## How to run the metrics sql to generate the views

At this point, The database should be running locally along with PostgRest API, with the migrations completed. To generate metric views, Run from root directory:

`cat ./packages/agents/cartographer/poller/db/metrics.sql | docker exec -i cartographer-database psql -U postgres -d connext`
