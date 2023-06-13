require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: '0x0123456789012345678901234567890123456789012345678901234567890123',
          balance: '1000000000000000000000' // 1000 ETH
        },
        {
          privateKey: '0x4567890123456789012345678901234567890123456789012345678901230123',
          balance: '2000000000000000000000' // 2000 ETH
        },
        {
          privateKey: '0x7890123456789012345678901234567890123456789012345678901234560123',
          balance: '3000000000000000000000' // 3000 ETH
        }
      ]
    }
  },
  plugins: [
    'hardhat-deploy'
  ]
};
