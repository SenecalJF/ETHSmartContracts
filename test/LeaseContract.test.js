const LeaseContract = artifacts.require('./LeaseContract.sol');

contract('LeaseContract', (accounts) => {
  it('should set the rent amount', async () => {
    const instance = await LeaseContract.deployed();
    const actual = await instance.getRent();
    const expected = '5000';
    assert.deepEqual(actual.toString(), expected);
  });

  it('should set the ipfs hash', async () => {
    const instance = await LeaseContract.deployed();
    const actual = await instance.getIpfsLeaseHash();
    const expected = 'ipfsHashExample';
    assert.deepEqual(actual, expected);
  });

  it('should set the renter', async () => {
    const instance = await LeaseContract.deployed();
    const actual = await instance.getRenter();
    const expected = accounts[0];
    assert.deepEqual(actual.toString(), expected);
  });

  it('should not pay rent if amount is not exact', async () => {
    const instance = await LeaseContract.deployed();
    try {
      await instance.send(5001, { from: accounts[1] });
      assert.fail('The transaction should have thrown an error');
    } catch (err) {
      assert.include(err.message, 'revert', "The error message should contain 'revert'");
    }
  });

  it('should pay rent', async () => {
    const instance = await LeaseContract.deployed();
    let before = await web3.eth.getBalance(instance.address);
    before = web3.utils.toBN(before).add(web3.utils.toBN(5000));
    await instance.send(5000, { from: accounts[1] });
    const after = await web3.eth.getBalance(instance.address);
    assert.deepEqual(before.toString(), after.toString());
  });

  it('should not withdraw if not owner', async () => {
    const instance = await LeaseContract.deployed();
    try {
      await instance.withdraw({ from: accounts[1] });
      assert.fail('The transaction should have thrown an error');
    } catch (err) {
      assert.include(err.message, 'revert', "The error message should contain 'revert'");
    }
  });

  it('should widthdraw', async () => {
    const instance = await LeaseContract.deployed();
    await instance.withdraw({ from: accounts[0] });
    const actual = await web3.eth.getBalance(instance.address);
    const expected = '0';
    assert.deepEqual(actual.toString(), expected);
  });
});
