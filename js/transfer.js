import { web3, contractAddress, contract } from './web3Setup.js';

const App = {
  metadataCID: '',

  //로그인 체크
  checkLogin: function (privatekey, publickey) {
    if (privatekey === null || publickey === null) {
      // 로그인 x -> alert(로그인 먼저) -> 로그인 페이지로 이동
      return false;
    } else {
      //로그인 o -> 다음 진행
      return true;
    }
  },

  clickTransfer: async function (fromPublickey, fromPrivatekey, toPublickey, tokenId) {
    try {
      const transferEth = await web3.eth.accounts.signTransaction(
        {
          from: '0x5469E28950211404600ca84fFb5Ad34D1aE72BbE',
          to: _publickey,
          value: web3.utils.toWei('1', 'ether'),
          gas: 30000, // 간단한 이더 전송의 기본 가스
          gasPrice: web3.utils.toWei('20', 'gwei'), // 가스 가격 설정
          data: contract.methods.sendEther(_publickey).encodeABI(),
        },
        '0xb50af6bb1c07a3ce02a1557fea55828b29a032df3d8e7cb700b6e527b2b01cd4'
      );
      const transferReceipt = await web3.eth.sendSignedTransaction(transferEth.rawTransaction);
      console.log('이더 전송 완료, receipt: ', transferReceipt);
      console.log('돈 보내기 성공');
      //이더 전송 완료 후 nft 민팅
      const signedTx = await web3.eth.accounts.signTransaction(
        {
          from: _publickey,
          to: contractAddress,
          gas: 2000000,
          gasPrice: web3.utils.toWei('20', 'gwei'),
          data: contract.methods.mintNFT(_publickey, this.metadataCID).encodeABI(),
        },
        _privatekey
      );

      const mintReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log('민팅 완료, receipt: ', mintReceipt);
      alert('민팅 완료');
    } catch (error) {
      console.error('트랜잭션 에러: ', error);
    }
  },
};

//페이지 로딩되면
$(function () {
  //로그인 되었는지 확인
  let privatekey = localStorage.getItem('privateKey');
  let publickey = localStorage.getItem('walletAddress');
  if (!App.checkLogin(privatekey, publickey)) {
    // 로그인 메시지 보여주기
    $('#userMessage').css('display', 'block'); // 메시지를 표시
    return; // 이후 동작은 멈춤
  } else {
    $('#userMessage').css('display', 'none'); // 로그인 성공 시 메시지 숨기기
  }

  $('#transferBtn').on('click', function () {
    const senderAddress = document.getElementById('senderAddress').value();
    const recipientAddress = document.getElementById('recipient').value;
    const nftId = document.getElementById('nftId').value;
    console.log('송신자 주소:', senderAddress);
    console.log('수신자 주소:', recipientAddress);
    console.log('NFT ID:', nftId);
    App.clickTransfer(publickey, privatekey);
  });
});
