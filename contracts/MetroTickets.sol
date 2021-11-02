// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

// A commuter can buy tickets using this smart contract. The owner (commuting company) can scan/remove the passage.

contract MetroTickets {
  mapping(address => uint256) private users;
  uint256 private ticketCost;
  address private owner;

  modifier ownerOnly() {
    require(msg.sender == owner);
    _;
  }

  constructor(uint256 _ticketCost) {
    ticketCost = _ticketCost;
    owner = msg.sender;
  }

  function getTicketCost() external view returns (uint256) {
    return ticketCost;
  }

  function balanceOf(address _user) external view returns (uint256) {
    return users[_user];
  }

  function buyTicket() external payable {
    users[msg.sender] += msg.value / ticketCost;
  }

  function spendTicket(address _user) external ownerOnly {
    users[_user]--;
  }

  function withdraw() external ownerOnly {
    payable(msg.sender).transfer(address(this).balance);
  }
}
