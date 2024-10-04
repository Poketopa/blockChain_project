import { abi as contractABI } from '../js/abi/OrigAuthToken.js';

const RPC_URL = 'http://61.32.68.66:80';

export const web3 = new Web3(RPC_URL);

export const contractAddress = '0xea3aa01bb17DB95430C93B3D47FFE7D0B8012CF5';

export const contract = new web3.eth.Contract(contractABI, contractAddress);
