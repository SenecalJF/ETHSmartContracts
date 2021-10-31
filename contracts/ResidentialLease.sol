// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

// Renter: The person who have a building for rent
// Tenant: The person who pays the renter to use the building

// Goal: Remove any third party in processus of a lease and making the leasee immutable.
// Facilitates the payments while keeping an excellent papertrail.

// TODO
// Ajouter Hash du bail avec IPFS dans le constructeur

contract Lease {
  uint256 private rent;
  address private tenant;

  event RentPayed(address, uint256);

  constructor(uint256 _rent) {
    rent = _rent;
  }

  function getRent() external view returns (uint256) {
    return rent;
  }

  receive() external payable {
    require(msg.value == rent, 'Rent received is not exact');
    emit RentPayed(msg.sender, block.timestamp);
  }
}
