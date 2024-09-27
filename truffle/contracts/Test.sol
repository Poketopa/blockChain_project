// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract Test {
    // uint256 private _tokenIds =0;
    
    mapping(string => UserAccount) private userAccounts;

    struct UserAccount{
        address publicKey; 
        bytes32 privateKey;
    }

    // constructor() ERC721("test", "test") {
    // }
    // function mintNFT(address _to, string memory _tokenURI) public returns(uint){
    //     _tokenIds += 1;
    //     _mint(_to, _tokenIds);
    //     _setTokenURI(_tokenIds, _tokenURI);
       
    //     return _tokenIds;
    // }

    function storeUserAccount(string memory userId, bytes32 privateKey, address publicKey) public  {
        userAccounts[userId] = UserAccount(publicKey, privateKey);
    }

    function getUserAccount(string memory userId) public view returns (bytes32 privateKey, address publicKey) {
        UserAccount memory userAccount = userAccounts[userId];
        return (userAccount.privateKey, userAccount.publicKey);
    }
}