// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract Housing {
  Lease[] private leases;

  struct Lease {
    address owner;
    string leaseHash;
    uint256 rent;
  }

  event PaidRent(uint256 indexed _leaseId);

  event LeaseCreated(address indexed _owner, uint256 _leaseId);

  modifier validId(uint256 _leaseId) {
    require(_leaseId < leases.length, 'Invalid lease ID');
    _;
  }

  function payRent(uint256 _leaseId) external payable validId(_leaseId) {
    require(msg.value == leases[_leaseId].rent);
    (bool success, ) = payable(leases[_leaseId].owner).call{value: leases[_leaseId].rent}('');
    require(success, 'Transfer failed.');
    emit PaidRent(_leaseId);
  }

  function rent(uint256 _leaseId) external view validId(_leaseId) returns (uint256) {
    return leases[_leaseId].rent;
  }

  function owner(uint256 _leaseId) external view validId(_leaseId) returns (address) {
    return leases[_leaseId].owner;
  }

  function leaseHash(uint256 _leaseId) external view validId(_leaseId) returns (string memory) {
    return leases[_leaseId].leaseHash;
  }

  function newLease(
    address _owner,
    string calldata _leaseHash,
    uint256 _rent
  ) external {
    leases.push(Lease(_owner, _leaseHash, _rent));

    emit LeaseCreated(msg.sender, leases.length - 1);
  }
}
