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

  it('should not register player 1 if amount is not exact', async () => {
    let instance = await CoinFlip.deployed();
    try {
      await instance.register({ value: 5001, from: accounts[1] });
      assert.fail('The transaction should have thrown an error');
    } catch (err) {
      assert.include(err.message, 'revert', "The error message should contain 'revert'");
    }
  });
});

contract('CoinFlip', (accounts) => {
  let gasUsed = [0, 0];

  it('should register player 1', async () => {
    let instance = await CoinFlip.deployed();
    let receipt = await instance.register({ value: 5000, from: accounts[1] });
    gasUsed[0] = receipt.receipt.gasUsed;
    players = await instance.getPlayers();
    assert.equal(players[0], accounts[1]);
  });

  it('should register player 2 and reset players addresses', async () => {
    let instance = await CoinFlip.deployed();
    let receipt = await instance.register({ value: 5000, from: accounts[2] });
    gasUsed[1] = receipt.receipt.gasUsed;
    players = await instance.getPlayers();
    assert.deepEqual(players, [
      '0x0000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000',
    ]);
  });

  it('winner should be one of the two players', async () => {
    let instance = await CoinFlip.deployed();
    let winner = await instance.getWinner();
    expect([accounts[1], accounts[2]]).to.include(winner);
  });

  it('should send 2 times the amount to the winner', async () => {
    let instance = await CoinFlip.deployed();
    let winner = await instance.getWinner();
    let winnerBalance = await web3.eth.getBalance(winner);

    assert.equal(
      winnerBalance - 5000,
      web3.utils.toWei('100', 'ether') - gasUsed[accounts.indexOf(winner) - 1] * 2000000000
    );
  });
});
