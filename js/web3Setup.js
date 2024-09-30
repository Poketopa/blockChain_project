import { abi as contractABI } from '../js/abi/OrigAuthToken.js';

const RPC_URL = 'http://61.32.68.66:80';

export const web3 = new Web3(RPC_URL);

export const contractAddress = '0x53f40fd4e98d3e70c14dcc4e3d00e2c59b9b567a';

export const contract = new web3.eth.Contract(contractABI, contractAddress);
