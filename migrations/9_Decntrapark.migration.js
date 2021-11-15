const Decentrapark = artifacts.require('Decentrapark');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Decentrapark, 15);
};
