const CinemaTickets = artifacts.require('CinemaTickets');

contract('CinemaTickets', (accounts) => {
  it('should let the owner pick the cost of each tickets', async () => {
    let instance = await CinemaTickets.deployed();
    let cost = await instance.getTicketsCost();
    assert.equal(cost, 15);
  });
});
