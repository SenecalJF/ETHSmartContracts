const CinemaTickets = artifacts.require('CinemaTickets');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(CinemaTickets, 15);
};
