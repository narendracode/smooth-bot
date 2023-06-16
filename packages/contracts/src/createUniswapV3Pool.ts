import dotenv from 'dotenv';
dotenv.config();

import { ethers } from "hardhat";
import { abi as FACTORY_ABI } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json';

const uniswapV3FactoryAddress = process.env.UNISWAP_V3_FACTORY_ADDRESS as string;
// const sepoliaProvider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL_SEPOLIA as string);
const georliProvider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL_GOERLI as string);

const unfTokenAddress = process.env.UNF_ADDRESS as string;
const usdcTokenAddress = process.env.USDC_ADDRESS as string;

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);
const connectedWallet = wallet.connect(georliProvider);

async function main() {
    const factoryContract = new ethers.Contract(uniswapV3FactoryAddress, FACTORY_ABI, georliProvider);

    // create pool
    const tx = await factoryContract.connect(connectedWallet).createPool(
        unfTokenAddress,
        usdcTokenAddress,
        500, // fee with basis points
    );

    const receipt = await tx.wait(); // 0x5e5c12fa5726b21b62a0552b2731fcd001104bd75913f7a483247666c4c92ccd
    console.log('Receipt', receipt);

    const newPoolAddress = await factoryContract.functions.getPool(
        unfTokenAddress,
        usdcTokenAddress,
        500, // fee with basis points
    )

    console.log('New Pool Address', newPoolAddress);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});