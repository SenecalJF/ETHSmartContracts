const LeaseContract = artifacts.require('LeaseContract');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(LeaseContract, 5000, 'ipfsHashExample', accounts[0]);
};
