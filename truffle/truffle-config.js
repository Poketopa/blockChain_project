const HDWalletProvider = require('@truffle/hdwallet-provider');
let hdwalletProvider = new HDWalletProvider(
  '77edc3f34ee85781df3510c1da340474d7c13d71eced8f12bbcb41eb9983feae',
  'http://8545-wooyeongjang-ganache-0ldxpf7wx1r.ws-us116.gitpod.io/'
);

// let hdwalletProvider = new HDWalletProvider('f2f289e3e6e86a1148f419f20e91f2d4ce696323b6079f6d7fac729709f0d5c2', 'HTTP://127.0.0.1:8545');

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a managed Ganache instance for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    development: {
      network_id: '*', // Any network (default: none)
      provider: hdwalletProvider,
      networkCheckTimeout: 1000000,
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.10',
      optimizer: {
        enabled: 'true',
        runs: 200,
      },
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};
