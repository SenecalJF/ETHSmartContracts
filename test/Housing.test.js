const Housing = artifacts.require('Housing');

contract('Housing', (accounts) => {
  let id;

  it('should create a new lease', async () => {
    let instance = await Housing.deployed();
    id = await instance.newLease.call(accounts[1], 'TESTHASH', 5000);
    await instance.newLease(accounts[1], 'TESTHASH', 5000, { from: accounts[1] });
  });

  it('owner should be set correctly', async () => {
    let instance = await Housing.deployed();
    let owner = await instance.owner('0');
    assert.equal(owner, accounts[1]);
  });

  it('lease hash should be set correctly', async () => {
    let instance = await Housing.deployed();
    let hash = await instance.leaseHash(id);
    assert.deepEqual(hash, 'TESTHASH');
  });

  it('rent should be set correctly', async () => {
    let instance = await Housing.deployed();
    let rent = await instance.rent(id);
    assert.deepEqual(rent.toString(), '5000');
  });

  it('invalid ID should revert', async () => {
    let instance = await Housing.deployed();
    try {
      await instance.rent('10');
      assert.fail('The transaction should have thrown an error');
    } catch (err) {
      assert.include(err.message, 'revert', "The error message should contain 'revert'");
    }
  });

  it('rent should be paid correctly', async () => {
    let instance = await Housing.deployed();
    const balanceBefore = await web3.eth.getBalance(accounts[1]);
    await instance.payRent(id, { value: 5000, from: accounts[2] });
    const balanceAfter = await web3.eth.getBalance(accounts[1]);
    const expectedBalance = web3.utils.toBN(balanceBefore).add(web3.utils.toBN('5000'));
    assert.deepEqual(expectedBalance.toString(), balanceAfter.toString());
  });
});
