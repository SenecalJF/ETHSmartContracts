const CinemaTickets = artifacts.require('CinemaTickets');

const ticketCost = 15;

contract('CinemaTickets', (accounts) => {
  it('should let the owner choose the cost of each tickets', async () => {
    let instance = await CinemaTickets.deployed();
    let cost = await instance.getTicketsCost();
    assert.equal(cost, ticketCost);
  });

  it('should buy 10 tickets', async () => {
    let instance = await CinemaTickets.deployed();
    await instance.payTickets(10, { value: ticketCost * 10, from: accounts[1] });
    let ticketBalance = await instance.balanceOf(accounts[1]);
    assert.equal(ticketBalance, 10);
  });

  it('should spend 7 tickets', async () => {
    let instance = await CinemaTickets.deployed();
    await instance.spendTickets(7, { from: accounts[1] });
    let ticketBalance = await instance.balanceOf(accounts[1]);
    assert.equal(ticketBalance, 3);
  });

  it('should let the owner change the cost of each tickets', async () => {
    let instance = await CinemaTickets.deployed();
    const newTicketCost = ticketCost + 5;
    await instance.changeTicketCost(newTicketCost);
    let cost = await instance.getTicketsCost();
    assert.equal(cost, newTicketCost);
  });
});
