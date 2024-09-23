// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title UserVerification
 * @dev A contract for user authenticity and ownership verification on Sepolia testnet.
 */
contract UserVerification {
    
    // State variables
    address public owner;
    
    // A mapping to store user authenticity status
    mapping(address => bool) public verifiedUsers;
    
    // Events
    event UserVerified(address indexed user);
    event UserRevoked(address indexed user);

    /**
     * @dev Constructor sets the contract owner (the deployer).
     */
    constructor() {
        owner = msg.sender; // Set the contract deployer as the owner
    }

    /**
     * @dev Modifier to restrict access to the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    /**
     * @dev Function to verify a user.
     * @param _user Address of the user to be verified.
     */
    function verifyUser(address _user) public onlyOwner {
        require(!verifiedUsers[_user], "User is already verified");
        verifiedUsers[_user] = true;
        emit UserVerified(_user); // Emit an event when a user is verified
    }

    /**
     * @dev Function to revoke a user's verification.
     * @param _user Address of the user to be revoked.
     */
    function revokeUser(address _user) public onlyOwner {
        require(verifiedUsers[_user], "User is not verified");
        verifiedUsers[_user] = false;
        emit UserRevoked(_user); // Emit an event when a user's verification is revoked
    }

    /**
     * @dev Function to check if a user is verified.
     * @param _user Address of the user to check.
     * @return A boolean value indicating whether the user is verified.
     */
    function isVerified(address _user) public view returns (bool) {
        return verifiedUsers[_user];
    }

}


