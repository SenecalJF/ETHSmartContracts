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

    assert.equal(owner, accounts[0]);
  });

  it('should register a player', async () => {
    let instance = await Lottery.deployed();
    await instance.registerPlayer({ value: 5000, from: accounts[3] });
    lotteryPlayer = await instance.getPlayers();
    nb_entry = await instance.getNbOfentries();
    assert.equal(lotteryPlayer[nb_entry - 1], accounts[3]);
  });
});
