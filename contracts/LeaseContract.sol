// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

// Renter: The person who have a building for rent
// Tenant: The person who pays the renter to use the building

// Goal: Remove any third party in processus of a lease and making the leasee immutable.
// Facilitates the payments while keeping an excellent papertrail.

contract LeaseContract {
  uint256 private rent;
  address private renter;
  address private tenant;
  string private ipfsLeaseHash;

  event RentPayed(address);

  modifier ownerOnly() {
    require(msg.sender == renter);
    _;
  }

  constructor(
    uint256 _rent,
    string memory _ipfsLeaseHash,
    address _renter
  ) {
    ipfsLeaseHash = _ipfsLeaseHash;
    rent = _rent;
    renter = _renter;
  }

  function getRent() external view returns (uint256) {
    return rent;
  }

  function getRenter() external view returns (address) {
    return renter;
  }

  function getTenant() external view returns (address) {
    return tenant;
  }

  function getIpfsLeaseHash() external view returns (string memory) {
    return ipfsLeaseHash;
  }

  receive() external payable {
    require(msg.value == rent, 'Rent received is not exact');
    emit RentPayed(msg.sender);
  }

  function withdraw() external ownerOnly {
    payable(msg.sender).transfer(address(this).balance);
  }
}
