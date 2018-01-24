module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      network_id: 2,
      host: "localhost",
      port: 8545,
      gas: 2900000
    }
  }
};