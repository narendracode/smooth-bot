import dotenv from 'dotenv';
dotenv.config();


import Web3 from 'web3';

const web3 = new Web3(process.env.ALCHEMY_URL_SEPOLIA as string);

async function main() {
  console.log('main function called..')
  const publicKey = await web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY as string);
  console.log(`public key : ${JSON.stringify(publicKey)}`);
}

main()
  .then(() => { process.exit(0); })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });