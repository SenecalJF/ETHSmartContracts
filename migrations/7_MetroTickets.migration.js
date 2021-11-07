const MetroTickets = artifacts.require('MetroTickets');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(MetroTickets, 100000);
};
