const Lottery = artifacts.require('Lottery');

contract('Lottery', (accounts) => {
  it('constructor should set the amount', async () => {
    let instance = await Lottery.deployed();
    let amount = await instance.amount();
    assert.equal(amount, 5000);
  });

  it('should set owner to the owner address', async () => {
    let instance = await Lottery.deployed();
    let owner = await instance.owner();

    assert.equal(owner, '0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
  });

  it('should register a player', async () => {
    let instance = await Lottery.deployed();
    await instance.registerPlayer({ value: 5000, from: accounts[3] });
    lotteryPlayer = await instance.getPlayers();
    nb_entry = await instance.getNbOfentries();
    assert.equal(lotteryPlayer[nb_entry - 1], accounts[3]);
  });
});

contract('Lottery', (accounts) => {
  it('should not launch the lottery', async () => {
    let instance = await Lottery.deployed();
    await instance.registerPlayer({ value: 5000, from: accounts[1] });

    try {
      await instance.launchLottery();
      assert.fail('The owner cant launch yet');
    } catch (err) {
      assert.include(err.message, 'revert', "The error message should contain 'revert'");
    }
  });

  it('should let the owner launch the lottery', async () => {
    let instance = await Lottery.deployed();
    await instance.registerPlayer({ value: 5000, from: accounts[1] });
    await instance.registerPlayer({ value: 5000, from: accounts[2] });
    await instance.registerPlayer({ value: 5000, from: accounts[3] });
    try {
      await instance.launchLottery();
      assert.equal(0, 0);
    } catch (err) {
      assert.fail(err.message);
    }
  });
});

contract('Lottery', (accounts) => {
  it('should pay the money to the winner the good amount', async () => {
    let instance = await Lottery.deployed();
    let gasUsed = [0, 0, 0];
    let receipt = await instance.registerPlayer({ value: 5000, from: accounts[1] });
    gasUsed[0] = receipt.receipt.gasUsed;
    receipt = await instance.registerPlayer({ value: 5000, from: accounts[2] });
    gasUsed[1] = receipt.receipt.gasUsed;
    receipt = await instance.registerPlayer({ value: 5000, from: accounts[3] });
    gasUsed[2] = receipt.receipt.gasUsed;
    await instance.launchLottery();
    let winner = await instance.winner();
    let winnerBalance = await web3.eth.getBalance(winner);
    let gasMoney = web3.utils.toBN(gasUsed[accounts.indexOf(winner) - 1]).mul(web3.utils.toBN(2000000000));

    let expectedBalance = web3.utils.toBN(web3.utils.toWei('100', 'ether')).add(web3.utils.toBN(10000)).sub(gasMoney);

    assert.equal(winnerBalance.toString(), expectedBalance.toString()); // or use toNumber()
  });
});
