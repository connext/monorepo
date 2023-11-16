export const testnetProdConfig = `{
    "chains":
    {
        "9991":
        {
            "providers":
            [
                "https://rpc.ankr.com/polygon_mumbai"
            ],
            "deployments":
            {
                "connext": "0x2334937846Ab2A3FCE747b32587e1A1A2f6EEC5a",
                "relayerProxy": "0x2730AC87C162894fa723b4553Ed396C484b80dE2"
            },
            "confirmations": 60,
            "gasStations":
            []
        },
        "1668247156":
        {
            "providers":
            [
                "https://rpc.goerli.linea.build"
            ],
            "deployments":
            {
                "connext": "0xfdb6B853C1945Dbffe78A3091BeBB9A928234fA3",
                "relayerProxy": "0xc4804757EDCB9a4E37dcda48b888FC293d7d9b3F"
            },
            "confirmations": 1,
            "gasStations":
            []
        },
        "1734439522":
        {
            "providers":
            [
                "https://goerli-rollup.arbitrum.io/rpc"
            ],
            "deployments":
            {
                "connext": "0x2075c9E31f973bb53CAE5BAC36a8eeB4B082ADC2",
                "relayerProxy": "0x18F49442bFB1E5280a36a3c6e54A58AB64C9ac55"
            },
            "confirmations": 10,
            "gasStations":
            []
        },
        "1735353714":
        {
            "providers":
            [
                "https://rpc.ankr.com/eth_goerli"
            ],
            "deployments":
            {
                "connext": "0xFCa08024A6D4bCc87275b1E4A1E22B71fAD7f649",
                "relayerProxy": "0xe55162a662Abaf066D0fa6FFb720Dbe8Bc16342a"
            },
            "confirmations": 1,
            "gasStations":
            []
        },
        "1735356532":
        {
            "providers":
            [
                "https://goerli.optimism.io"
            ],
            "deployments":
            {
                "connext": "0x5Ea1bb242326044699C3d81341c5f535d5Af1504",
                "relayerProxy": "0x88348790795a93A533A7F71c926c56012F27f758"
            },
            "confirmations": 10,
            "gasStations":
            []
        }
    },
    "logLevel": "debug",
    "network": "testnet",
    "environment": "production"
}`;
