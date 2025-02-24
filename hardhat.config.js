require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    vanarTestnet: {
      url: process.env.VANAR_TESTNET_RPC_URL || "https://rpc-vanguard.vanarchain.com",
      accounts: [process.env.PRIVATE_KEY], // your deployer's private key, dca09f11788e7954a8982f421ec3617f7fc9901a51af2dc6cc612a90c15c1b6f
      chainId: 78600,
    },
  },
};
