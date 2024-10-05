import { web3, contractAddress, contract } from './web3Setup.js';
import { PINATA_TOKEN } from './token.js';

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

  //file 업로드 -> 파일 업로드 -> /pinning/pinFileToIPFS로 요청 -> cid 반환
  fileUploadToPinata: async function (filename, uploadFile) {
    filename = filename.split('.', 2)[0];
    let serialnum = $('#serialnum').val();
    console.log(serialnum);
    const form = new FormData();
    form.append('file', uploadFile);
    const options = {
      method: 'POST',
      headers: { Authorization: `Bearer ${PINATA_TOKEN}` },
    };

    options.body = form;
    //ipfs에 파일(이미지) 업로드
    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', options);
      const data = await response.json();
      let fileHash = data.IpfsHash;
      try {
        //메타데이터 업로드
        const options = {
          method: 'POST',
          headers: { Authorization: `Bearer ${PINATA_TOKEN}`, 'Content-Type': 'application/json' },

          // body: JSON.stringify(
          //   `{"pinataMetadata":{"name":"${filename}.json"},"pinataContent":{"name":"${filename}", "image":"${fileHash}","serialnumber":"${serialnum}"}}`
          // ),
          body: JSON.stringify({
            pinataMetadata: { name: `${filename}.json` },
            pinataContent: { name: `${filename}`, image: `${fileHash}`, serialnumber: `${serialnum}` },
          }),
        };

        const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', options);
        const data = await response.json();
        this.metadataCID = data.IpfsHash;

        $('#result').text('업로드 완료. NFT 발행을 눌러주세요.');
        $('#mintButton').show();
      } catch (err) {
        console.error('Error:', err);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  },

  clickMinting: async function (_publickey, _privatekey) {
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        from: _publickey,
        to: contractAddress,
        value: web3.utils.toWei('1', 'ether'),
        gas: 2000000,
        gasPrice: web3.utils.toWei('20', 'gwei'),
        data: contract.methods.mintNFT(_publickey, this.metadataCID).encodeABI(),
      },
      _privatekey
    );

    await web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .on('receipt', receipt => {
        console.log('receipt: ', receipt);
        alert('민팅 완료');
      })
      .on('error', console.error);
  },
};

//페이지 로딩되면
$(function () {
  //로그인 되었는지 확인
  let privatekey = localStorage.getItem('privateKey');
  let publickey = localStorage.getItem('walletAddress');
  if (!App.checkLogin(privatekey, publickey)) {
    alert('로그인 먼저 해주세요');
    location.href = 'login_new.html';
  }

  let filename;
  let uploadFile;
  $('#mintButton').hide();

  //파일명
  $('#upload').on('change', function (e) {
    filename = e.target.files[0]['name'];
    uploadFile = e.target.files[0];
  });

  $('#uploadButton').on('click', function () {
    if (filename && uploadFile) {
      App.fileUploadToPinata(filename, uploadFile);
    } else {
      alert('파일 먼저 업로드해주세요.');
    }
  });

  $('#mintButton').on('click', async function () {
    App.clickMinting(publickey, privatekey);
  });
});
