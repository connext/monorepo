-- migrate:up
CREATE TABLE IF NOT EXISTS stableswap_lps (
  key character(66) NOT NULL,
  domain character varying(255) NOT NULL,
  balances text [],
  "provider" character(42) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (key, domain, "provider"),
  FOREIGN KEY (key, domain) REFERENCES stableswap_pools (key, domain)
);
-- migrate:down
DROP TABLE stableswap_lps;