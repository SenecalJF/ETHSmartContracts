const Helloworld = artifacts.require('Helloworld');

// Mocha + Chai
contract('Helloworld', (accounts) => {
  it('constructor should set the message correctly', async () => {
    let instance = await Helloworld.deployed();
    let message = await instance.message();
    assert.equal(message, 'Hello World Constructor');
  });

  it('owner should be accounts[0]', async () => {
    let instance = await Helloworld.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });
});
