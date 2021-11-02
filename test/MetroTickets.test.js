const MetroTickets = artifacts.require('MetroTickets');

contract('MetroTickets', (accounts) => {
  it('constructor should set the ticket cost', async () => {
    let instance = await MetroTickets.deployed();
    let cost = await instance.getTicketCost();
    assert.equal(cost, 100000);
  });

  it('should buy a ticket', async () => {
    let instance = await MetroTickets.deployed();
    await instance.buyTicket({ value: 500000, from: accounts[1] });
    let ticketBalance = await instance.balanceOf(accounts[1]);
    assert.equal(ticketBalance, 5);
  });

  it('should spend ticket', async () => {
    let instance = await MetroTickets.deployed();
    await instance.spendTicket(accounts[1], { from: accounts[0] });
    let ticketBalance = await instance.balanceOf(accounts[1]);
    assert.equal(ticketBalance, 4);
  });
});
