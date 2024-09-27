// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC721Token is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // 토큰 ID 카운터

    // 사용자 계정을 저장하는 매핑
    mapping(string => UserAccount) private userAccounts;

    // 공개키와 개인키를 저장하는 구조체
    struct UserAccount {
        address publicKey; 
        bytes32 privateKey;
    }

    // ERC721 토큰 초기 설정
    constructor() ERC721("OrigAuth", "ORIG") {}

    // 새로운 NFT를 발행하고 URI 설정
    function mintNFT(address _to, string memory _tokenURI) public returns(uint) {
        uint _newItemId = _tokenIds.current();
        _mint(_to, _newItemId);
        _setTokenURI(_newItemId, _tokenURI);
        _tokenIds.increment();
        return _newItemId;
    }

    // 사용자 계정 정보 저장
    function storeUserAccount(string memory userId, bytes32 privateKey, address publicKey) public {
        userAccounts[userId] = UserAccount(publicKey, privateKey);
    }

    // 사용자 계정 정보 조회
    function getUserAccount(string memory userId) public view returns (bytes32 privateKey, address publicKey) {
        UserAccount memory userAccount = userAccounts[userId];
        return (userAccount.privateKey, userAccount.publicKey);
    }
}
