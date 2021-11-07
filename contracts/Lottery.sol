// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

//Goal : Participating in a lottery game with multiple players.
//       At the end of each week, a lucky winner gets to take
//       home the prize.

contract Lottery {
  uint256 public amount;
  address public owner;
  bool public isLotteryLive;
  address[] public lotteryPlayer;
  uint256 public nb_entry;

  constructor(uint256 _amount) {
    amount = _amount;
    owner = msg.sender;
  }

  modifier ownerOnly() {
    if (msg.sender == owner) _;
  }

  //generate a ramdom number
  function randomWinner() private view returns (uint256) {
    return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, lotteryPlayer)));
  }

  //GET nb of entries
  function getNbOfentries() public view returns (uint256) {
    return nb_entry;
  }

  // SET nb of entries to the lottery
  function setNbOfEntries() private {
    nb_entry++;
  }

  function getPlayers() public view returns (address[] memory) {
    return lotteryPlayer;
  }

  //let player participate in the lottery by sending the amount to the contract address
  // function() public payable {
  //   registerPlayer();
  // }

  // register a player to the lottery
  function registerPlayer() external payable {
    require(msg.value >= amount, 'Amount not enough to register'); // every amount above the threashold is consider a tip :)
    lotteryPlayer.push(msg.sender);
    setNbOfEntries();
  }

  //launch the lottery
  function launchLottery() public ownerOnly {
    require(getNbOfentries() > 1, 'Not enough players to launch');
    isLotteryLive = true;
    uint256 index = randomWinner() % lotteryPlayer.length;

    address winner = lotteryPlayer[index];
    payWinner(winner);
  }

  //send the amount to the winner
  function payWinner(address _winner) public payable {
    (bool sent, ) = _winner.call{value: amount * getNbOfentries()}('');
    require(sent, 'Failed to send the amount to the winner of the lottery');
  }
}
