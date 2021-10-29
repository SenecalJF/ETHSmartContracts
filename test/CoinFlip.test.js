const CoinFlip = artifacts.require('CoinFlip');

contract('CoinFlip', (accounts) => {
  it('constructor should set the amount', async () => {
    let instance = await CoinFlip.deployed();
    let amount = await instance.getAmount();
    assert.equal(amount, 5000);
  });

  it('should change the amount', async () => {
    let instance = await CoinFlip.deployed();
    let amount = await instance.getAmount();
    newRandomAmount = Math.floor(Math.random() * 10000) + 6000;
    await instance.setAmount(newRandomAmount);
    let newAmount = await instance.getAmount();
    assert.notEqual(amount, newAmount);
  });
});

contract('CoinFlip', (accounts) => {
  it('should register player 1', async () => {
    let instance = await CoinFlip.deployed();
    await instance.register({ value: 5000, from: accounts[1] });
    players = await instance.getPlayers();
    assert.equal(players[0], accounts[1]);
  });

  it('should not register player 2 if amount is not exact', async () => {
    let instance = await CoinFlip.deployed();
    try {
      await instance.register({ value: 5001, from: accounts[2] });
      assert.fail('The transaction should have thrown an error');
    } catch (err) {
      assert.include(err.message, 'revert', "The error message should contain 'revert'");
    }
  });
});
