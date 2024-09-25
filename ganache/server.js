const express = require('express');
const Web3 = require('web3');
const bodyParser = require('body-parser');

// Ganache에 연결
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const app = express();
app.use(bodyParser.json());

// 테스트용 계정 (Ganache에서 제공하는 첫 번째 계정 사용)
const account = web3.eth.accounts.privateKeyToAccount('0xYOUR_PRIVATE_KEY');
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

// 스마트 계약 배포 API
app.post('/deploy', async (req, res) => {
    const { abi, bytecode, args } = req.body;  // 프론트엔드에서 ABI, 바이트코드, 인자 전달
    try {
        const contract = new web3.eth.Contract(abi);
        const deployTx = contract.deploy({ data: bytecode, arguments: args });

        const deployedContract = await deployTx.send({
            from: account.address,
            gas: 1500000,
            gasPrice: '30000000000'
        });

        res.send({ contractAddress: deployedContract.options.address });
    } catch (error) {
        res.status(500).send({ error: 'Contract deployment failed', details: error });
    }
});

// 스마트 계약 메서드 호출 API
app.post('/call', async (req, res) => {
    const { contractAddress, abi, methodName, methodArgs } = req.body;
    try {
        const contract = new web3.eth.Contract(abi, contractAddress);
        const result = await contract.methods[methodName](...methodArgs).call();
        res.send({ result });
    } catch (error) {
        res.status(500).send({ error: 'Contract method call failed', details: error });
    }
});

app.listen(3000, () => {
    console.log('API server listening on port 3000');
});

