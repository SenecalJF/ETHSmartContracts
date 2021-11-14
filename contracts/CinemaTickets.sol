// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Goal : Create a system that cinema can you use to sell their tickets

contract CinemaTickets {
  uint256 public ticketCost;
  mapping(address => uint256) private user; //address of user, uint is how many tickets user bought
  address public owner;
  event paidTickets(address indexed _sender, uint256 indexed _nbTickets);

  constructor(uint256 _ticketCost) {
    owner = msg.sender;
    ticketCost = _ticketCost;
  }

  modifier ownerOnly() {
    require(msg.sender == owner);
    _;
  }

  function payTickets(uint256 _nbOfTickets) external payable {
    require(msg.value == ticketCost * _nbOfTickets, 'Not enough money to pay for tickets');
    user[msg.sender] = _nbOfTickets;
    (bool success, ) = payable(owner).call{value: _nbOfTickets * ticketCost}('');
    require(success, 'Transfer failed');
    emit paidTickets(msg.sender, _nbOfTickets);
  }

  function balanceOf(address _sender) external view returns (uint256) {
    return user[_sender];
  }

  function getTicketsCost() external view returns (uint256) {
    return ticketCost;
  }

  function changeTicketCost(uint256 _ticketCost) external ownerOnly {
    ticketCost = _ticketCost;
  }

  function spendTickets(uint256 _nbOfTicketsSpent) external {
    require(user[msg.sender] >= _nbOfTicketsSpent, 'User need to buy tickets first');
    user[msg.sender] -= _nbOfTicketsSpent;
  }
}
