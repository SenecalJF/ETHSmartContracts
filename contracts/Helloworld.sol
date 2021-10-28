// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract Helloworld {
  string public message;
  address owner;

  constructor(string memory _message) {
    message = _message;
    owner = msg.sender;
  }

  function hello() public view returns (string memory) {
    return message;
  }

  function setMessage(string memory _message) public payable {
    require(msg.sender == owner);
    message = _message;
  }
}
