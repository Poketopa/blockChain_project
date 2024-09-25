// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC721Token is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    mapping(string => UserAccount) private userAccounts;

    struct UserAccount{
        address publicKey; 
        bytes32 privateKey;
    }

   constructor()
        ERC721("OrigAuth", "ORIG")
  
    {}

    function mintNFT(address _to, string memory _tokenURI) public returns(uint){
        uint _newItemId = _tokenIds.current();
        _mint(_to, _newItemId);
        _setTokenURI(_newItemId, _tokenURI);
        _tokenIds.increment();
        return _newItemId;
    }

    function storeUserAccount(string memory userId, bytes32 privateKey, address publicKey) public  {
        userAccounts[userId] = UserAccount(publicKey, privateKey);
    }

    function getUserAccount(string memory userId) public view returns (bytes32 privateKey, address publicKey) {
        UserAccount memory userAccount = userAccounts[userId];
        return (userAccount.privateKey, userAccount.publicKey);
    }
}