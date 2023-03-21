import {ethers, Transaction} from "ethers"; // ethersjs 6
async function main() {
  let transaction = new Transaction(); 
  transaction.type= 2;
  transaction.chainId= 3;
  transaction.nonce= 1;
  transaction.maxPriorityFeePerGas= ethers.parseUnits('5', 'gwei');  // 5000000000 = 0x012a05f200
  transaction.maxFeePerGas= ethers.parseUnits('20', 'gwei'); // 20000000000 = 0x04a817c800
  transaction.gasLimit = '21000'; // 21000 = 0x5208 
  transaction.to = '0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd';
  transaction.value = ethers.parseEther('1'); // 1000000000000000000 = 0x0de0b6b3a7640000  
  console.log(transaction.toJSON());

  let rawTxBytes = Transaction.from(transaction).unsignedSerialized; // unsigned transaction
  console.log(rawTxBytes); // 0x02f1030185012a05f2008504a817c80082520...
  let txRlpBytes  = "0x"+ rawTxBytes.slice(4); // remove Tx type 0x02
  console.log(txRlpBytes); 
  // 0xf1030185012a05f2008504a817c80082520894a238b6008bc2fbd9e386a5d4784511980ce504cd880de0b6b3a764000080c0
  console.log(txRlpBytes.length/2); // 51 (49 = 51 -2)
  // f1: 241 = 192 + 49       85: 133 = 128 + 5
  const decoded = ethers.decodeRlp(txRlpBytes);
  console.log(decoded);
  /* ['0x03','0x01','0x012a05f200','0x04a817c800','0x5208',
  '0xa238b6008bc2fbd9e386a5d4784511980ce504cd','0x0de0b6b3a7640000','0x',[]] */
}
main();