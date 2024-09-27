// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OrigAuthToken is ERC721URIStorage {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenId;

    //ID 존재 여부 확인
    mapping(string => bool) private _accountExists;

    //계정 관리
    mapping(string => Account) private _account;

    //퍼블릭/프라이빗 키 관리하는 구조체
    struct Account {
        address publickey;
        bytes32 privatekey;
    }
    
    //민팅시 token id돌려주는 이벤트
    event minting (address _to, uint _tokenId);

    constructor() ERC721("OrigAuth", "ORIG") {
    }

    //NFT 민팅
    function mintNFT(address _to, string memory _tokenURI) public{
        _tokenId.increment();
        uint256 newTokenId = _tokenId.current();
        _mint(_to, newTokenId);        
        //metadata가 저장된 ipfs값
        _setTokenURI(newTokenId, _tokenURI);
        emit minting(_to, newTokenId);
    }

    //계정 존재 여부 확인하는 함수
    function isExist(string memory userId) public view returns(bool){
        return _accountExists[userId];
    }

    //user 계정 생성
    function createAccount(string memory userId, address _publickey, bytes32 _privatekey) public {
        //계정 존재 여부 체크
        require(!_accountExists[userId], "Account already exists");
        //없으면 계정 생성 
        _account[userId] = Account({publickey: _publickey, privatekey:_privatekey});
        
        _accountExists[userId] = true;
        

    }

    
    //user계정 조회: userId => publickey or privatekey
    function getAccount(string memory userId) public view returns(Account memory){
        return _account[userId];
    }

}