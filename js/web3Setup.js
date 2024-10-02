import { abi as contractABI } from '../js/abi/OrigAuthToken.js';

const RPC_URL = 'http://61.32.68.66:80';

export const web3 = new Web3(RPC_URL);

export const contractAddress = '0xb69909aA2d32023f56fC69B1893cB839B06B5c36';

export const contract = new web3.eth.Contract(contractABI, contractAddress);
