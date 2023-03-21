import {ethers, Transaction} from "ethers";
async function main() {
  let transaction = new Transaction(); 
  transaction.type= 2;
  transaction.chainId= 3;
  transaction.nonce= 1;
  transaction.maxPriorityFeePerGas= ethers.parseUnits('5', 'gwei');  // 5000000000 = 0x012a05f200
  transaction.maxFeePerGas= ethers.parseUnits('20', 'gwei'); // 20000000000 = 0x04a817c800
  transaction.gasLimit = '21000'; // 21000 = 0x5208 
  transaction.value = ethers.parseEther('1'); // 1000000000000000000 = 0x0de0b6b3a7640000  
  transaction.to = '0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd';

  let privatekey = 'CE75F1A875F2DB7FB064F5DBD302B0C77FFEAA18CC4C314167A5111A04F79AFA';
  let wallet = new ethers.Wallet(privatekey);   
  let rawTxBytes = await wallet.signTransaction(transaction); // signed transaction
  let txRlpBytes  = "0x" + rawTxBytes.slice(4);
  console.log(txRlpBytes.length/2); // 119
  console.log(txRlpBytes); // 0xf874030185012a05f2008504a817c80082... f8: 247 74: 116 = 119 - 3
  const decoded = ethers.decodeRlp(txRlpBytes);
  console.log(decoded);
  console.log(`Transaction hash: ${ethers.keccak256(rawTxBytes)}`);
}
main();